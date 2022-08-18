package com.example.secure_networks.backend.boundaries;

public class ResetBoundary {

    String resetCode;
    String email;
    String password;

    // constructor
    public ResetBoundary(String resetCode, String email, String password) {
        this.resetCode = resetCode;
        this.email = email;
        this.password = password;
    }

    // getter methods
    public String getResetCode() {
        return resetCode;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // setter methods
    public void setResetCode(String resetCode) {
        this.resetCode = resetCode;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
