package com.example.secure_networks.backend.dao;

import com.example.secure_networks.backend.data.PasswordEntity;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PasswordDao extends PagingAndSortingRepository<PasswordEntity, Long> {

    long deleteById(long id);

}
