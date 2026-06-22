package com.debugdna.server.service;

import com.debugdna.server.model.Issue;
import com.debugdna.server.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SimilarIncidentService {

    private final IssueRepository issueRepository;

    public SimilarIncidentService(
            IssueRepository issueRepository) {

        this.issueRepository = issueRepository;
    }

    public List<Issue> findSimilar(String currentId) {

        return issueRepository.findById(currentId)
                .map(currentIssue -> {
                    String currentTitle = normalize(currentIssue.getTitle());
                    String currentSeverity = currentIssue.getSeverity();

                    return issueRepository.findAll()
                            .stream()
                            .filter(issue -> !currentId.equals(issue.getId()))
                            .filter(issue -> sameSeverity(issue, currentSeverity)
                                    || hasKeywordOverlap(issue.getTitle(), currentTitle))
                            .sorted((a, b) -> {
                                int severityCompare = Boolean.compare(
                                        sameSeverity(b, currentSeverity),
                                        sameSeverity(a, currentSeverity));

                                if (severityCompare != 0) {
                                    return severityCompare;
                                }

                                int scoreA = keywordScore(a.getTitle(), currentTitle);
                                int scoreB = keywordScore(b.getTitle(), currentTitle);

                                return Integer.compare(scoreB, scoreA);
                            })
                            .limit(5)
                            .toList();
                })
                .orElse(List.of());
    }

    private boolean sameSeverity(Issue issue, String severity) {
        return severity != null
                && severity.equalsIgnoreCase(issue.getSeverity());
    }

    private boolean hasKeywordOverlap(String title, String currentTitle) {
        if (title == null || currentTitle == null) {
            return false;
        }

        Set<String> titleTokens = tokenize(title);
        Set<String> currentTokens = tokenize(currentTitle);

        if (titleTokens.isEmpty() || currentTokens.isEmpty()) {
            return false;
        }

        return titleTokens.stream()
                .anyMatch(currentTokens::contains);
    }

    private int keywordScore(String title, String currentTitle) {
        if (title == null || currentTitle == null) {
            return 0;
        }

        Set<String> titleTokens = tokenize(title);
        Set<String> currentTokens = tokenize(currentTitle);

        return (int) titleTokens.stream()
                .filter(currentTokens::contains)
                .count();
    }

    private String normalize(String value) {
        if (value == null) {
            return "";
        }

        return value.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private Set<String> tokenize(String value) {
        String normalized = normalize(value);

        if (normalized.isEmpty()) {
            return Set.of();
        }

        return Arrays.stream(normalized.split(" "))
                .filter(word -> !word.isBlank())
                .collect(Collectors.toSet());
    }
}