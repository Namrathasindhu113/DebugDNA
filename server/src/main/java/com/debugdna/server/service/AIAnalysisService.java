package com.debugdna.server.service;

import org.springframework.stereotype.Service;

@Service
public class AIAnalysisService {

    public String generateAnalysis(String title) {

        title = title.toLowerCase();

        if (title.contains("mongodb")) {
            return "Database connectivity issue detected. Possible network or URI misconfiguration.";
        }

        if (title.contains("cors")) {
            return "Frontend-backend communication blocked due to CORS policy restrictions.";
        }

        if (title.contains("jwt")) {
            return "Authentication token validation failed.";
        }

        return "Unknown issue detected. Further debugging required.";
    }

    public String generateFix(String title) {

        title = title.toLowerCase();

        if (title.contains("mongodb")) {
            return "Verify MongoDB URI and ensure database server is running.";
        }

        if (title.contains("cors")) {
            return "Enable CORS configuration in backend security settings.";
        }

        if (title.contains("jwt")) {
            return "Check JWT secret key and token expiration.";
        }

        return "Review logs and stack trace for more details.";
    }
}