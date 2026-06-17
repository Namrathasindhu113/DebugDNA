package com.debugdna.server.service;

import com.debugdna.server.model.Issue;
import org.springframework.stereotype.Service;

@Service
public class AIResponseParser {

    public void enrichIssue(
            Issue issue,
            String aiAnalysis) {

        issue.setRootCause(
                extract(aiAnalysis,
                        "Root Cause:",
                        "Affected Component:"));

        issue.setBusinessImpact(
                extract(aiAnalysis,
                        "Business Impact:",
                        "Recovery Steps:"));

        issue.setRecoverySteps(
                extract(aiAnalysis,
                        "Recovery Steps:",
                        "Prevention Strategy:"));

        issue.setPreventionStrategy(
                extract(aiAnalysis,
                        "Prevention Strategy:",
                        "Code Recommendation:"));

        issue.setConfidenceScore(
                extract(aiAnalysis,
                        "Confidence Score:",
                        "PROJECT CONTEXT"));

        System.out.println("===== AI PARSER =====");
        System.out.println("Root Cause = " + issue.getRootCause());
        System.out.println("Business Impact = " + issue.getBusinessImpact());
        System.out.println("Recovery Steps = " + issue.getRecoverySteps());
        System.out.println("Prevention Strategy = " + issue.getPreventionStrategy());
        System.out.println("Confidence Score = " + issue.getConfidenceScore());
    }

    private String extract(
            String text,
            String start,
            String end) {

        int startIndex = text.indexOf(start);

        if (startIndex == -1)
            return "";

        startIndex += start.length();

        int endIndex;

        if (end.isEmpty()) {

            endIndex = text.length();

        } else {

            endIndex = text.indexOf(
                    end,
                    startIndex);

            if (endIndex == -1)
                endIndex = text.length();
        }

        return text.substring(
                startIndex,
                endIndex)
                .replace("\r", "")
                .trim();
    }
}