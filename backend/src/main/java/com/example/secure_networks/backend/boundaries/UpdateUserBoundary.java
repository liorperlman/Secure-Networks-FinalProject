package com.example.secure_networks.backend.boundaries;
 


public class UpdateUserBoundary {
    
    private LoginBoundary user;
    private UserBoundary update;

    public UpdateUserBoundary(LoginBoundary user, UserBoundary update)
    {
        this.user = user;
        this.update = update;
    }

    public LoginBoundary getUser() { return user; }

    public UserBoundary getUpdate() { return update; }

    public void setUser(LoginBoundary user) { this.user = user; }

    public void setUpdate(UserBoundary update) { this.update = update; }

}
