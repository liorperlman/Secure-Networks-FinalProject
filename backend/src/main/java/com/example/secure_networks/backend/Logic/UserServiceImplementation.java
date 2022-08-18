package com.example.secure_networks.backend.Logic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import com.example.secure_networks.backend.Exceptions.BadRequestException;
import com.example.secure_networks.backend.Exceptions.NotFoundException;
import com.example.secure_networks.backend.boundaries.LoginBoundary;
import com.example.secure_networks.backend.boundaries.UserBoundary;
import com.example.secure_networks.backend.dao.PasswordDao;
import com.example.secure_networks.backend.dao.UserDao;
import com.example.secure_networks.backend.data.UserEntity;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordDao passwordDao;

    // Utillity methods
    public UserEntity createBoundaryFromEntity(UserBoundary boundary) {
        UserEntity entity = new UserEntity();
        entity.setUsername(boundary.getUsername());
        entity.setPassword(boundary.getPassword());
        entity.setEmail(boundary.getEmail());
        return entity;
    }

    // Controller methods
    @PostConstruct
    public void Init() {
    }

    @Transactional
    public UserBoundary createUser(UserBoundary userBoundary) {
        if (userBoundary.getUsername() == null || userBoundary.getUsername().length() == 0)
            throw new RuntimeException("Username Attribute Must Not Be Null!");

        if (userBoundary.getPassword() == null || userBoundary.getPassword().length() == 0)
            throw new RuntimeException("Password Attribute Must Not Be Null!");

        if (userBoundary.getEmail() == null || userBoundary.getEmail().length() == 0)
            throw new RuntimeException("Email Attribute Must Not Be Null!");

        UserEntity entity = this.createBoundaryFromEntity(userBoundary);
        this.userDao.save(entity);

        return new UserBoundary(entity.getUsername(), entity.getPassword(), entity.getEmail());
    }

    @Transactional(readOnly = true)
    public UserBoundary retriveUserDetails(String username) {
        Optional<UserEntity> oEntity = this.userDao.findById(username);
        if (oEntity.isPresent()) {
            UserEntity entity = oEntity.get();
            return new UserBoundary(entity.getUsername(), entity.getPassword(), entity.getEmail());
        } else
            throw new NotFoundException("User Could Not Be Found");
    }

    @Transactional
    public UserBoundary updateUser(LoginBoundary user, UserBoundary update) {
        Optional<UserEntity> oEntity = this.userDao.findById(user.getUsername());
        if (oEntity.isPresent()) {
            // Check user identity
            UserEntity targetEntity = oEntity.get();
            String uPassword = user.getPassword();

            if (!targetEntity.getPassword().equals(uPassword))
                return null;

            // Update entity
            if (targetEntity.containsPassword(update.getPassword())) {
                throw new BadRequestException("Password is needs to be different than last 3 passwords");

            }

            targetEntity.setEmail(update.getEmail());
            targetEntity.setPassword(update.getPassword());

            if (!targetEntity.getPassword().equals(uPassword))
                targetEntity.addPasswordToHistory(uPassword, passwordDao);

            // Update database
            this.userDao.save(targetEntity);
            return update;
        } else
            throw new NotFoundException("User Could Not Be Found");
    }

    @Transactional(readOnly = true)
    public List<UserBoundary> getAllUsers(int size, int page) {
        Page<UserEntity> entitiesPage = this.userDao
                .findAll(PageRequest.of(page, size, Direction.DESC, "Username"));

        List<UserEntity> content = entitiesPage.getContent();
        List<UserBoundary> boundaries = new ArrayList<>();

        for (UserEntity entity : content)
            boundaries.add(new UserBoundary(entity.getUsername(), entity.getPassword(), entity.getEmail()));

        return boundaries;
    }
    
    @Transactional
    public UserBoundary resetPassword(String email, String password) {
        Optional<UserEntity> oEntity = this.userDao.findByEmail(email);
        if (oEntity.isPresent()) {
            UserEntity entity = oEntity.get();
            entity.setPassword(password);
            this.userDao.save(entity);
            return new UserBoundary(entity.getUsername(), entity.getPassword(), entity.getEmail());
        } else
            throw new NotFoundException("User Could Not Be Found");
    }

    public String getUsernameByEmail(String email) {
        Optional<UserEntity> oEntity = this.userDao.findByEmail(email);
        if (oEntity.isPresent()) {
        	UserEntity entity = oEntity.get();
        	return entity.getUsername();
        } else
            throw new NotFoundException("User Could Not Be Found");
    }
}