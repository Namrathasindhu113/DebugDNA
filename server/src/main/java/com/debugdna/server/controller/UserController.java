package com.debugdna.server.controller;

import com.debugdna.server.model.User;
import com.debugdna.server.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getUsers() {

        return userRepository.findAll();
    }
}