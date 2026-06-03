package com.debugdna.server.repository;

import com.debugdna.server.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository
        extends MongoRepository<User, String> {

    User findByEmail(String email);
}