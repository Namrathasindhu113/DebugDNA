package com.debugdna.server.controller;

import com.debugdna.server.model.Issue;
import com.debugdna.server.repository.IssueRepository;
import com.debugdna.server.service.AIAnalysisService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueRepository issueRepository;
    private final AIAnalysisService aiAnalysisService;

    public IssueController(
            IssueRepository issueRepository,
            AIAnalysisService aiAnalysisService) {
        this.issueRepository = issueRepository;
        this.aiAnalysisService = aiAnalysisService;
    }

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
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

        return issueRepository.save(issue);
    }

    @PutMapping("/{id}/status")
    public Issue updateStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Issue issue = issueRepository
                .findById(id)
                .orElseThrow();

        issue.setStatus(status);

        return issueRepository.save(issue);
    }
}