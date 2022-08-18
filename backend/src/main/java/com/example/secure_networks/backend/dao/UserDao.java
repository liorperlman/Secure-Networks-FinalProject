package com.example.secure_networks.backend.dao;

import java.util.Optional;

import com.example.secure_networks.backend.data.UserEntity;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository<UserEntity, String> {

    /**
     * - It seems that JPA based repositores are either immune or highly resitant to
     * SQL injection attacks (or beyond our skills level)
     * 
     * - Also, as the server and client are built now, several possible
     * vulnerabilities are covered by code: for expample,
     * using the password field to try any SQL injection wouldn't work, as the
     * password is hashed on the client side, and arrives to the server hashed, so
     * any SQL injection attempt is "eaten" by the hash.
     * 
     * - So we are showing here examples of possible SQL injections that would have
     * worked under vulnerable conditions
     * 
     * For Register:
     * the query that runs currently is
     * Insert
     * into users_table (email,passwd,username)
     * values (?,?,?) // all the fields are given through the client
     * 
     * so possible SQL injection will be:
     * email = email@mail.com
     * password = 123Abc!#4aB
     * username = usr);delete from users_table where username is not null#
     * Resulting in a query:
     * Insert
     * into users_table (email,passwd,username)
     * values (email@mail.com, hash(123Abc!#4aB), usr);delete from users_table where
     * username is
     * not null #)
     * 
     * 
     * for Login:
     * the query that runs currently is
     * Select
     * *
     * from users_table
     * where username = ?
     * 
     * - possible injection could be :
     * passowrd = somepassword
     * username = user; drop table users_table;#
     * 
     * resulting in
     * Select
     * *
     * from users_table
     * where username = user; drop table users_table;#
     * 
     * - For an injection that logins with no credentials to work, the query needs
     * to be slightly different, and hash calculation need to happen on the server
     * side, only after pulling the data from the DB
     * after these changes, possible SQL injection will be:
     * passowrd = pass' or 1=1#
     * username = user1' or 1=1#
     * 
     * Login injections can't work in the current project scheme, because the query
     * only uses the username to access the db and get pass hash
     * and after that, the server checks if the passwords' hashes match.
     * the hash is calculated ( function: H(password + H(username + password)) )
     * using string value of the username and
     * password, meaning that the injection code would create a different hash
     * preventing the login.
     * 
     * 
     */

    Optional<UserEntity> findByEmail(String email);
}