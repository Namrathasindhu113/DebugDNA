package com.debugdna.server.controller;

import com.debugdna.server.dto.TelemetryPayload;
import com.debugdna.server.model.Issue;
import com.debugdna.server.model.Project;
import com.debugdna.server.repository.IssueRepository;
import com.debugdna.server.repository.ProjectRepository;
import com.debugdna.server.service.GroqService;
import com.debugdna.server.service.EmailService;
import com.debugdna.server.service.AIResponseParser;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class IngestionController {

        private final GroqService groqService;

        private final IssueRepository issueRepository;

        private final ProjectRepository projectRepository;

        private final SimpMessagingTemplate messagingTemplate;

        private final EmailService emailService;

        private final AIResponseParser aiResponseParser;

        public IngestionController(
                        GroqService groqService,
                        IssueRepository issueRepository,
                        ProjectRepository projectRepository,
                        SimpMessagingTemplate messagingTemplate,
                        EmailService emailService,
                        AIResponseParser aiResponseParser) {

                this.groqService = groqService;
                this.issueRepository = issueRepository;
                this.projectRepository = projectRepository;
                this.messagingTemplate = messagingTemplate;
                this.emailService = emailService;
                this.aiResponseParser = aiResponseParser;
        }

        @PostMapping("/ingest")
        public Issue ingestTelemetry(
                        @RequestHeader("x-api-key") String apiKey,
                        @RequestBody TelemetryPayload payload) {

                Project project = projectRepository.findByApiKey(
                                apiKey);

                if (project == null) {

                        throw new RuntimeException(
                                        "Invalid API Key");
                }

                List<Issue> projectIssues = issueRepository.findByProjectId(
                                payload.getProjectId());

                StringBuilder previousIncidents = new StringBuilder();

                for (Issue oldIssue : projectIssues) {

                        previousIncidents.append(
                                        "\nPrevious Incident:\n")
                                        .append(oldIssue.getTitle())
                                        .append("\nAnalysis:\n")
                                        .append(oldIssue.getAiAnalysis())
                                        .append("\n");
                }

                String aiAnalysis = groqService.askAI(
                                payload.getLogs(),
                                project.getFramework(),
                                project.getLanguage(),
                                project.getTechStack(),
                                previousIncidents.toString());
                System.out.println("===== AI RESPONSE =====");
                System.out.println(aiAnalysis);

                List<Issue> existingIssues = issueRepository.findByTitleAndProjectId(
                                payload.getAppName(),
                                payload.getProjectId());

                if (!existingIssues.isEmpty()) {

                        System.out.println("FOUND EXISTING ISSUE");

                        Issue existingIssue = existingIssues.get(0);

                        existingIssue.setOccurrences(
                                        existingIssue.getOccurrences() + 1);

                        existingIssue.setLastSeen(
                                        LocalDateTime.now());

                        existingIssue.setStatus(
                                        "ACTIVE");

                        // Update AI Analysis every time
                        existingIssue.setAiAnalysis(
                                        aiAnalysis);

                        // Parse AI response and populate fields
                        aiResponseParser.enrichIssue(
                                        existingIssue,
                                        aiAnalysis);

                        System.out.println(
                                        "Updated Root Cause = "
                                                        + existingIssue.getRootCause());

                        System.out.println(
                                        "Updated Business Impact = "
                                                        + existingIssue.getBusinessImpact());

                        System.out.println(
                                        "Updated Confidence Score = "
                                                        + existingIssue.getConfidenceScore());

                        Issue updatedIssue = issueRepository.save(
                                        existingIssue);

                        messagingTemplate.convertAndSend(
                                        "/topic/issues",
                                        updatedIssue);

                        return updatedIssue;
                }

                Issue issue = new Issue();

                issue.setTitle(
                                payload.getAppName());

                issue.setSeverity(
                                payload.getSeverity());

                issue.setDescription(
                                payload.getLogs());

                issue.setAiAnalysis(
                                aiAnalysis);

                System.out.println(
                                "CALLING AI PARSER...");

                aiResponseParser.enrichIssue(
                                issue,
                                aiAnalysis);

                System.out.println(
                                "Root Cause = "
                                                + issue.getRootCause());

                System.out.println(
                                "Business Impact = "
                                                + issue.getBusinessImpact());

                System.out.println(
                                "Recovery Steps = "
                                                + issue.getRecoverySteps());

                System.out.println(
                                "Prevention Strategy = "
                                                + issue.getPreventionStrategy());

                System.out.println(
                                "Confidence Score = "
                                                + issue.getConfidenceScore());
                issue.setSuggestedFix(
                                "AI-generated fix available");

                issue.setProjectId(
                                payload.getProjectId());

                issue.setEnvironment(
                                payload.getEnvironment());

                issue.setCreatedAt(
                                LocalDateTime.now());

                issue.setLastSeen(
                                LocalDateTime.now());

                issue.setOccurrences(1);

                issue.setStatus(
                                "ACTIVE");
                System.out.println(
                                "Saving issue with root cause: "
                                                + issue.getRootCause());

                Issue savedIssue = issueRepository.save(issue);

                System.out.println(
                                "Severity received: "
                                                + savedIssue.getSeverity());

                if ("HIGH".equalsIgnoreCase(
                                savedIssue.getSeverity())) {

                        try {

                                emailService.sendHighSeverityAlert(
                                                savedIssue.getTitle(),
                                                savedIssue.getSeverity(),
                                                savedIssue.getAiAnalysis());

                        } catch (Exception e) {

                                System.out.println(
                                                "Email failed: "
                                                                + e.getMessage());
                        }
                }

                messagingTemplate.convertAndSend(
                                "/topic/issues",
                                savedIssue);

                return savedIssue;
        }

}