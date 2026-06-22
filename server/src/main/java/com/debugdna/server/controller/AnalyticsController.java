package com.debugdna.server.controller;

import com.debugdna.server.model.Issue;
import com.debugdna.server.repository.IssueRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

        private final IssueRepository issueRepository;

        public AnalyticsController(
                        IssueRepository issueRepository) {

                this.issueRepository = issueRepository;
        }

        @GetMapping
        public Map<String, Object> getAnalytics() {

                List<Issue> issues = issueRepository.findAll();

                long totalIncidents = issues.size();

                long activeIncidents = issues.stream()
                                .filter(i -> "ACTIVE".equalsIgnoreCase(
                                                i.getStatus()))
                                .count();

                long resolvedIncidents = issues.stream()
                                .filter(i -> "RESOLVED".equalsIgnoreCase(
                                                i.getStatus()))
                                .count();

                long highSeverityIncidents = issues.stream()
                                .filter(i -> "HIGH".equalsIgnoreCase(
                                                i.getSeverity()))
                                .count();

                List<Map<String, Object>> severityData = List.of(

                                Map.of(
                                                "name",
                                                "HIGH",
                                                "value",
                                                issues.stream()
                                                                .filter(i -> "HIGH".equalsIgnoreCase(
                                                                                i.getSeverity()))
                                                                .count()),

                                Map.of(
                                                "name",
                                                "MEDIUM",
                                                "value",
                                                issues.stream()
                                                                .filter(i -> "MEDIUM".equalsIgnoreCase(
                                                                                i.getSeverity()))
                                                                .count()),

                                Map.of(
                                                "name",
                                                "LOW",
                                                "value",
                                                issues.stream()
                                                                .filter(i -> "LOW".equalsIgnoreCase(
                                                                                i.getSeverity()))
                                                                .count())

                );
                Map<String, Object> response = new HashMap<>();

                response.put(
                                "totalIncidents",
                                totalIncidents);

                response.put(
                                "activeIncidents",
                                activeIncidents);

                response.put(
                                "resolvedIncidents",
                                resolvedIncidents);

                response.put(
                                "highSeverityIncidents",
                                highSeverityIncidents);

                response.put(
                                "severityData",
                                severityData);

                List<Map<String, Object>> statusData = List.of(

                                Map.of(
                                                "name",
                                                "ACTIVE",
                                                "value",
                                                issues.stream()
                                                                .filter(i -> "ACTIVE".equalsIgnoreCase(
                                                                                i.getStatus()))
                                                                .count()),

                                Map.of(
                                                "name",
                                                "INVESTIGATING",
                                                "value",
                                                issues.stream()
                                                                .filter(i -> "INVESTIGATING".equalsIgnoreCase(
                                                                                i.getStatus()))
                                                                .count()),

                                Map.of(
                                                "name",
                                                "RESOLVED",
                                                "value",
                                                issues.stream()
                                                                .filter(i -> "RESOLVED".equalsIgnoreCase(
                                                                                i.getStatus()))
                                                                .count())

                );

                response.put(
                                "statusData",
                                statusData);

                return response;

        }

        @GetMapping("/trends")
        public List<Map<String, Object>> getTrends() {

                return issueRepository.getIncidentTrends();
        }

        @GetMapping("/projects")
        public List<Map<String, Object>> getProjects() {

                return issueRepository.getTopProjects();
        }
}