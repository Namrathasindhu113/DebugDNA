package com.debugdna.server.controller;

import com.debugdna.server.dto.TelemetryPayload;
import com.debugdna.server.model.Issue;
import com.debugdna.server.model.Project;
import com.debugdna.server.repository.IssueRepository;
import com.debugdna.server.repository.ProjectRepository;
import com.debugdna.server.service.GroqService;
import com.debugdna.server.service.EmailService;

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

        public IngestionController(
                        GroqService groqService,
                        IssueRepository issueRepository,
                        ProjectRepository projectRepository,
                        SimpMessagingTemplate messagingTemplate,
                        EmailService emailService) {

                this.groqService = groqService;
                this.issueRepository = issueRepository;
                this.projectRepository = projectRepository;
                this.messagingTemplate = messagingTemplate;
                this.emailService = emailService;
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

                String aiAnalysis = groqService.askAI(
                                payload.getLogs());

                List<Issue> existingIssues = issueRepository.findByTitleAndProjectId(
                                payload.getAppName(),
                                payload.getProjectId());

                if (!existingIssues.isEmpty()) {

                        Issue existingIssue = existingIssues.get(0);

                        existingIssue.setOccurrences(
                                        existingIssue.getOccurrences() + 1);

                        existingIssue.setLastSeen(
                                        LocalDateTime.now());

                        existingIssue.setStatus(
                                        "ACTIVE");

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

                Issue savedIssue = issueRepository.save(issue);

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