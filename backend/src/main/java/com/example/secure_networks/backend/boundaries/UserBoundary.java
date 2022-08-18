package com.example.secure_networks.backend.boundaries;

public class UserBoundary {

    private String username;
    private String password;
    private String email;

    public UserBoundary() {
    }

    public UserBoundary(String username, String password, String email) {
        this.setUsername(username);
        this.setPassword(password);
        this.setEmail(email);
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }

    @Override
    public String toString() {
        return "{" + this.username + "," + this.password + "," + this.email + "}";
    }

}
