package com.debugdna.server.controller;

import com.debugdna.server.service.GroqService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/ai")
public class AIController {

    private final GroqService groqService;

    public AIController(GroqService groqService) {
        this.groqService = groqService;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(
            @RequestBody Map<String, String> body) {

        String prompt = body.get("prompt");

        String response = groqService.askAI(prompt);

        return Map.of(
                "response",
                response);
    }
}