package com.debugdna.server.service;

import com.debugdna.server.model.Issue;
import com.debugdna.server.repository.IssueRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Service
public class LogWatcherService {

    private final GroqService groqService;
    private final IssueRepository issueRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public LogWatcherService(
            GroqService groqService,
            IssueRepository issueRepository,
            SimpMessagingTemplate messagingTemplate) {

        this.groqService = groqService;
        this.issueRepository = issueRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @PostConstruct
    public void watchLogs() {

        new Thread(() -> {

            try {

                WatchService watchService = FileSystems.getDefault().newWatchService();

                Path path = Paths.get("../logs");

                path.register(
                        watchService,
                        StandardWatchEventKinds.ENTRY_CREATE,
                        StandardWatchEventKinds.ENTRY_MODIFY);

                System.out.println("DEBUGDNA AI Log Watcher Active...");

                while (true) {

                    WatchKey key = watchService.take();

                    for (WatchEvent<?> event : key.pollEvents()) {

                        Path fileName = (Path) event.context();

                        if (fileName.toString().endsWith(".log")) {

                            Path fullPath = path.resolve(fileName);

                            String logs = Files.readString(fullPath);

                            String aiAnalysis = groqService.askAI(
                                    """
                                            Analyze this production log professionally.

                                            Provide:
                                            - Root cause
                                            - Severity
                                            - Suggested Fix
                                            - Deployment impact

                                            LOGS:
                                            """ + logs);
                            List<Issue> existingIssues = issueRepository.findAll();

                            Issue duplicate = null;

                            for (Issue existing : existingIssues) {

                                if (existing.getDescription() != null &&
                                        existing.getDescription().contains(
                                                logs.substring(
                                                        0,
                                                        Math.min(logs.length(), 30)))) {

                                    duplicate = existing;
                                    break;
                                }
                            }

                            if (duplicate != null) {

                                duplicate.setOccurrences(
                                        duplicate.getOccurrences() + 1);

                                duplicate.setLastSeen(
                                        LocalDateTime.now());

                                duplicate.setStatus("ACTIVE");

                                issueRepository.save(duplicate);
                                messagingTemplate.convertAndSend(
                                        "/topic/issues",
                                        duplicate);

                                System.out.println(
                                        "Existing issue updated.");

                            } else {

                                Issue issue = new Issue();

                                issue.setTitle(
                                        "Automated Log Detection");

                                issue.setSeverity("HIGH");

                                issue.setDescription(logs);

                                issue.setAiAnalysis(aiAnalysis);

                                issue.setSuggestedFix(
                                        "AI-generated fix available");

                                issue.setCreatedAt(
                                        LocalDateTime.now());

                                issue.setLastSeen(
                                        LocalDateTime.now());

                                issue.setOccurrences(1);

                                issue.setStatus("ACTIVE");

                                issueRepository.save(issue);
                                messagingTemplate.convertAndSend(
                                        "/topic/issues",
                                        issue);
                                System.out.println(
                                        "New AI issue generated.");
                            }

                            System.out.println(
                                    "AI issue generated automatically.");
                        }
                    }

                    key.reset();
                }

            } catch (
                    IOException | InterruptedException e) {

                e.printStackTrace();
            }

        }).start();
    }
}