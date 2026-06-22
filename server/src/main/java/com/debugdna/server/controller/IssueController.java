package com.debugdna.server.controller;

import com.debugdna.server.model.Issue;
import com.debugdna.server.repository.IssueRepository;
import com.debugdna.server.service.AuditLogService;
import com.debugdna.server.service.AIAnalysisService;
import com.debugdna.server.service.SimilarIncidentService;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueRepository issueRepository;
    private final AIAnalysisService aiAnalysisService;
    private final SimilarIncidentService similarIncidentService;
    private final AuditLogService auditLogService;

    public IssueController(
            IssueRepository issueRepository,
            AIAnalysisService aiAnalysisService,
            SimilarIncidentService similarIncidentService,
            AuditLogService auditLogService) {
        this.issueRepository = issueRepository;
        this.aiAnalysisService = aiAnalysisService;
        this.similarIncidentService = similarIncidentService;
        this.auditLogService = auditLogService;
    }

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    @GetMapping("/{id}/similar")
    public List<Issue> getSimilarIssues(
            @PathVariable String id) {

        return similarIncidentService.findSimilar(id);
    }

    @DeleteMapping("/all")
    public String deleteAllIssues() {

        issueRepository.deleteAll();

        return "All issues deleted";
    }

    @PostMapping
    public Issue createIssue(@RequestBody Issue issue) {

        issue.setAiAnalysis(
                aiAnalysisService.generateAnalysis(issue.getTitle()));

        issue.setSuggestedFix(
                aiAnalysisService.generateFix(issue.getTitle()));

        Issue savedIssue = issueRepository.save(issue);

        auditLogService.log(
                "ISSUE_CREATED",
                "ISSUE",
                savedIssue.getId(),
                "SYSTEM",
                "Issue created: " + savedIssue.getTitle());

        return savedIssue;
    }

    @PutMapping("/{id}/assign")
    public Issue assignIssue(
            @PathVariable String id,
            @RequestBody Map<String, String> payload) {

        Issue issue = issueRepository
                .findById(id)
                .orElseThrow();

        issue.setAssignedTo(
                payload.getOrDefault("assignedTo", ""));
        issue.setAssignedTeam(
                payload.getOrDefault("assignedTeam", ""));
        issue.setAssignedBy(
                payload.getOrDefault("assignedBy", ""));
        issue.setAssignedAt(LocalDateTime.now());

        Issue updatedIssue = issueRepository.save(issue);

        auditLogService.log(
                "ISSUE_ASSIGNED",
                "ISSUE",
                updatedIssue.getId(),
                payload.getOrDefault("assignedBy", "SYSTEM"),
                "Assigned to "
                        + updatedIssue.getAssignedTo()
                        + " | Team: "
                        + updatedIssue.getAssignedTeam());

        return updatedIssue;
    }

    @PutMapping("/{id}/status")
    public Issue updateStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Issue issue = issueRepository
                .findById(id)
                .orElseThrow();

        issue.setStatus(status);

        Issue updatedIssue = issueRepository.save(issue);

        auditLogService.log(
                "ISSUE_STATUS_UPDATED",
                "ISSUE",
                updatedIssue.getId(),
                "SYSTEM",
                "Status updated to: " + status);

        return updatedIssue;
    }
}