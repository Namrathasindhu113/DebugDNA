package com.debugdna.server.controller;

import com.debugdna.server.dto.AnalyticsResponse;
import com.debugdna.server.repository.IssueRepository;

import org.springframework.web.bind.annotation.*;

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
    public AnalyticsResponse getAnalytics() {

        AnalyticsResponse response = new AnalyticsResponse();

        response.setTotalIssues(
                issueRepository.count());

        response.setCriticalIssues(
                issueRepository.countBySeverity(
                        "HIGH"));

        response.setActiveIssues(
                issueRepository.countByStatus(
                        "ACTIVE"));

        return response;
    }
}