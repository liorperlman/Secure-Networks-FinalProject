package com.example.secure_networks.backend.data;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.secure_networks.backend.Application;
import com.example.secure_networks.backend.dao.PasswordDao;

@Entity
@Table(name = "USERS_TABLE")
public class UserEntity {

    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "passwd")
    private String password;

    @Column(name = "email", unique = true)
    private String email;

    @OneToMany(targetEntity = PasswordEntity.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "username", referencedColumnName = "username")
    private List<PasswordEntity> passwordHistory;

    public UserEntity() {
        this.passwordHistory = new LinkedList<>();
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

    public List<PasswordEntity> getPasswordHistory() {
        return this.passwordHistory;
    }

    public void addPasswordToHistory(String password, PasswordDao passwordDao) {
        this.passwordHistory.add(new PasswordEntity(this.username, password));

        if (this.passwordHistory.size() > Application.passwordConfig.getPasswordBackLog()) {
            passwordDao.deleteById(this.passwordHistory.get(0).getId());
            this.passwordHistory.remove(0);
        }
    }

    public boolean containsPassword(String password) {
        for (PasswordEntity passwordEntity : this.passwordHistory) {
            if (passwordEntity.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String toString() {
        return "{" + this.username + "," + this.password + "," + this.email + "}";
    }

}