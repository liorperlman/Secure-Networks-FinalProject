package com.example.secure_networks.backend.data;

public class PasswordConfig {

    private int loginAttempts;
    private int passwordBackLog;

    // default constructor
    public PasswordConfig() {
    }

    public PasswordConfig(int loginAttempts, int passwordBackLog) {
        this.loginAttempts = loginAttempts;
        this.passwordBackLog = passwordBackLog;
    }

    // getter methods
    public int getLoginAttempts() {
        return loginAttempts;
    }

    public int getPasswordBackLog() {
        return passwordBackLog;
    }

    // set methods
    public void setLoginAttempts(int loginAttempts) {
        this.loginAttempts = loginAttempts;
    }

    public void setPasswordBackLog(int passwordBackLog) {
        this.passwordBackLog = passwordBackLog;
    }

    // toString
    @Override
    public String toString() {
        return "PasswordConfig [loginAttempts=" + loginAttempts + ", passwordBackLog=" + passwordBackLog + "]";
    }

}
