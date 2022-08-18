package com.example.secure_networks.backend.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PASS_HISTORY")
public class PasswordEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "passwd")
    private String password;

    public PasswordEntity() {
    }

    public PasswordEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "PasswordEntity [id=" + id + ", username=" + username + ", password=" + password + "]";
    }

    @Override
    public int hashCode() {
        return (this.username + this.password + this.id).hashCode();
    }

}
