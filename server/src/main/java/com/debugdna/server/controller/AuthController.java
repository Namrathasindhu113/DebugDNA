package com.debugdna.server.controller;

import com.debugdna.server.model.User;
import com.debugdna.server.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public Object signup(
            @RequestBody User user) {

        User existingUser = userRepository.findByEmail(
                user.getEmail());

        if (existingUser != null) {

            return Map.of(
                    "message",
                    "Email already exists");
        }

        userRepository.save(user);

        return Map.of(
                "message",
                "Signup successful");
    }

    @PostMapping("/login")
    public Object login(
            @RequestBody User user) {

        User existingUser = userRepository.findByEmail(
                user.getEmail());

        if (existingUser == null) {

            return Map.of(
                    "message",
                    "User not found");
        }

        if (!existingUser.getPassword()
                .equals(user.getPassword())) {

            return Map.of(
                    "message",
                    "Invalid password");
        }

        return Map.of(
                "message",
                "Login successful",
                "userId",
                existingUser.getId(),
                "name",
                existingUser.getName());
    }
}