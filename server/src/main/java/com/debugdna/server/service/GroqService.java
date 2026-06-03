package com.debugdna.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class GroqService {

        @Value("${groq.api.key}")
        private String groqApiKey;

        private final WebClient webClient;

        public GroqService(WebClient.Builder builder) {

                this.webClient = builder
                                .baseUrl("https://api.groq.com/openai/v1")
                                .build();
        }

        public String askAI(String logs) {

                String structuredPrompt = """
                                                You are an elite AI DevOps monitoring assistant.

                                                Analyze the logs professionally.

                                                Respond ONLY in this format:

                                                Respond ONLY in this format:

                                Root Cause:
                                ...

                                Severity:
                                ...

                                Suggested Fix:
                                ...

                                Code Example:
                                ...

                                Deployment Impact:
                                ...

                                Rules:
                                - Provide a practical fix
                                - If code is applicable, provide a short code snippet
                                - Keep the code under 10 lines
                                - Keep the response concise and dashboard friendly

                                                Keep the response:
                                                - concise
                                                - professional
                                                - clean
                                                - dashboard friendly

                                                LOGS:
                                                """ + logs;

                Map<String, Object> requestBody = Map.of(

                                "model", "llama-3.1-8b-instant",

                                "messages", List.of(

                                                Map.of(
                                                                "role", "system",
                                                                "content",
                                                                "You are an expert DevOps and infrastructure AI assistant."),

                                                Map.of(
                                                                "role", "user",
                                                                "content", structuredPrompt)),

                                "temperature", 0.3,
                                "max_tokens", 800);

                try {

                        Map response = webClient.post()
                                        .uri("/chat/completions")
                                        .header(
                                                        "Authorization",
                                                        "Bearer " + groqApiKey)
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .bodyValue(requestBody)
                                        .retrieve()
                                        .bodyToMono(Map.class)
                                        .block();

                        List choices = (List) response.get("choices");

                        if (choices == null || choices.isEmpty()) {

                                return """
                                                                                               Root Cause:
                                                AI response unavailable

                                                Severity:
                                                MEDIUM

                                                Suggested Fix:
                                                Retry analysis

                                                Code Example:
                                                No code example available

                                                Deployment Impact:
                                                Monitoring temporarily degraded
                                                                                                """;
                        }

                        Map firstChoice = (Map) choices.get(0);

                        Map message = (Map) firstChoice.get("message");

                        return message.get("content").toString();

                } catch (Exception e) {

                        return """
                                                                Root Cause:
                                        Temporary AI network failure

                                        Severity:
                                        MEDIUM

                                        Suggested Fix:
                                        - Restart backend
                                        - Check internet connection
                                        - Retry analysis

                                        Code Example:
                                        No code example available

                                        Deployment Impact:
                                        AI monitoring temporarily unavailable

                                                                                """;
                }
        }
}