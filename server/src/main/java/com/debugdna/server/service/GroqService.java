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

        public String askAI(
                        String logs,
                        String framework,
                        String language,
                        String techStack,
                        String previousIncidents) {

                String structuredPrompt = "You are an elite AI DevOps monitoring assistant.\n\n" +

                                "Respond ONLY in this format:\n\n" +

                                "INCIDENT REPORT\n\n" +

                                "Incident Summary:\n...\n\n" +

                                "Root Cause:\n...\n\n" +

                                "Affected Component:\n...\n\n" +

                                "Severity:\n...\n\n" +

                                "Business Impact:\n...\n\n" +

                                "Recovery Steps:\n" +
                                "1. ...\n" +
                                "2. ...\n" +
                                "3. ...\n\n" +

                                "Prevention Strategy:\n...\n\n" +

                                "Code Recommendation:\n...\n\n" +

                                "Confidence Score:\n...%\n\n" +

                                "PROJECT CONTEXT\n\n" +

                                "Framework: " + framework + "\n" +
                                "Language: " + language + "\n" +
                                "Tech Stack: " + techStack + "\n\n" +

                                "PREVIOUS INCIDENTS:\n" +
                                previousIncidents + "\n\n" +

                                "LOGS:\n" + logs;
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