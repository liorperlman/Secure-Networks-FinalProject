package com.example.secure_networks.backend.boundaries;

public class LoginBoundary {
    
    private String username;
    private String password;

    public LoginBoundary(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
