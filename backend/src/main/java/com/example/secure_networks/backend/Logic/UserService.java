package com.example.secure_networks.backend.Logic;

import com.example.secure_networks.backend.boundaries.LoginBoundary;
import com.example.secure_networks.backend.boundaries.UserBoundary;

public interface UserService {

    /**
     * Creates a new user
     * 
     * @param user The new user details
     * @return The detalis of the new user
     */
    public UserBoundary createUser(UserBoundary user);

    /**
     * Returns the details of a user from a given identification
     * 
     * @param username The username of the user
     * @return The user details
     */
    public UserBoundary retriveUserDetails(String username);

    /**
     * Updates the details of a given user
     * 
     * @param user   The user details
     * @param update The updated user details
     * @return The updated user details
     */
    public UserBoundary updateUser(LoginBoundary user, UserBoundary update);

    /**
     * Resets a users password
     * @param email The users email
     * @param password The new password
     * @return The updated user details
     */
    public UserBoundary resetPassword(String email, String password);

    /**
     * @param email The users email
     * @return The username
     */
    public String getUsernameByEmail(String email);

}
