package com.example.secure_networks.backend.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import com.example.secure_networks.backend.Application;
import com.example.secure_networks.backend.Exceptions.BadRequestException;
import com.example.secure_networks.backend.Exceptions.NotFoundException;
import com.example.secure_networks.backend.Logic.EmailService;
import com.example.secure_networks.backend.Logic.UserService;
import com.example.secure_networks.backend.boundaries.LoginBoundary;
import com.example.secure_networks.backend.boundaries.ResetBoundary;
import com.example.secure_networks.backend.boundaries.UpdateUserBoundary;
import com.example.secure_networks.backend.boundaries.UserBoundary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "https://localhost:3000")
@RestController
public class UserController {

    private UserService service;

    private EmailService emailService;

    private HashMap<String, Integer> remainingAttempts = new HashMap<String, Integer>();

    private HashMap<String, String> resetCodes = new HashMap<String, String>();

    @Autowired
    public UserController(UserService service, EmailService emailService) {
        this.service = service;
        this.emailService = emailService;
    }

    @RequestMapping(path = "/users", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserBoundary createUser(@RequestBody UserBoundary userBoundary) {
        return this.service.createUser(userBoundary);
    }

    @RequestMapping(path = "/users/login", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserBoundary login(@RequestBody LoginBoundary loginBoundry) {
        UserBoundary boundary = this.service.retriveUserDetails(loginBoundry.getUsername());
        if (boundary.getPassword().equals(loginBoundry.getPassword()))
            return boundary;
        else {
            if (this.remainingAttempts.containsKey(boundary.getUsername())) {
                int attempts = this.remainingAttempts.get(boundary.getUsername());
                if (attempts == 0) {
                    throw new BadRequestException("Too many login attempts");
                } else {
                    this.remainingAttempts.put(boundary.getUsername(), attempts - 1);
                }
            } else {
                remainingAttempts.put(boundary.getUsername(), Application.passwordConfig.getLoginAttempts() - 1);
            }
            return null;
        }
    }

    @RequestMapping(path = "/users/update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateUser(@RequestBody UpdateUserBoundary body) {
        LoginBoundary user = body.getUser();
        UserBoundary update = body.getUpdate();
        this.service.updateUser(user, update);
    }

    @RequestMapping(path = "/users/forgotpassword/{email}", method = RequestMethod.GET)
    public String sendEmailTo(@PathVariable("email") String email) throws NoSuchAlgorithmException, NotFoundException {
        // Check user exsits and get hash algorithm
        String username = this.service.getUsernameByEmail(email);
        MessageDigest md = MessageDigest.getInstance("SHA-1");

        // Generate code
        byte[] messageDigest = md.digest((email + System.currentTimeMillis()).getBytes());
        String finalCode = new String(messageDigest).substring(0, 5);

        // Turn code to human readable
        StringBuilder builder = new StringBuilder();
        for (char c : finalCode.toCharArray()) {
            double temp = (c / 127.0 + 1.0) / 2.0;
            builder.append((char) Math.floor(temp * 25 + 65));
        }
        finalCode = builder.toString();

        // Send code
        resetCodes.put(email, finalCode);
        this.emailService.sendMail(email, "Forgot Password Verification Code", finalCode);
        
        return username;
    }

    @RequestMapping(path = "/users/resetpassword", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void resetUser(@RequestBody ResetBoundary body) {
        String email = body.getEmail();
        String code = body.getResetCode();
        if (!code.equals(resetCodes.get(email))) {
            throw new BadRequestException("Wrong reset code");
        }
        this.service.resetPassword(email, body.getPassword());
    }

}
