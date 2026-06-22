package com.debugdna.server.service;

import com.debugdna.server.model.Issue;
import com.debugdna.server.model.Project;
import com.debugdna.server.repository.IssueRepository;
import com.debugdna.server.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectSummaryService {

    private final ProjectRepository projectRepository;
    private final IssueRepository issueRepository;

    public ProjectSummaryService(
            ProjectRepository projectRepository,
            IssueRepository issueRepository) {

        this.projectRepository = projectRepository;
        this.issueRepository = issueRepository;
    }

    public Map<String, Object> getProjectSummary(String projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow();

        List<Issue> issues = issueRepository.findByProjectId(project.getName());

        long totalIncidents = issues.size();
        long activeIncidents = issues.stream()
                .filter(issue -> "ACTIVE".equalsIgnoreCase(issue.getStatus()))
                .count();
        long resolvedIncidents = issues.stream()
                .filter(issue -> "RESOLVED".equalsIgnoreCase(issue.getStatus()))
                .count();
        long highSeverityIncidents = issues.stream()
                .filter(issue -> "HIGH".equalsIgnoreCase(issue.getSeverity()))
                .count();

        String riskLevel = determineRiskLevel(highSeverityIncidents);
        String summary = buildSummary(
                project.getName(),
                totalIncidents,
                activeIncidents,
                resolvedIncidents,
                highSeverityIncidents,
                riskLevel);

        Map<String, Object> response = new HashMap<>();
        response.put("projectName", project.getName());
        response.put("framework", project.getFramework());
        response.put("language", project.getLanguage());
        response.put("techStack", project.getTechStack());
        response.put("totalIncidents", totalIncidents);
        response.put("activeIncidents", activeIncidents);
        response.put("resolvedIncidents", resolvedIncidents);
        response.put("highSeverityIncidents", highSeverityIncidents);
        response.put("riskLevel", riskLevel);
        response.put("summary", summary);

        return response;
    }

    private String determineRiskLevel(long highSeverityIncidents) {
        if (highSeverityIncidents >= 5) {
            return "HIGH";
        }

        if (highSeverityIncidents >= 2) {
            return "MEDIUM";
        }

        return "LOW";
    }

    private String buildSummary(
            String projectName,
            long totalIncidents,
            long activeIncidents,
            long resolvedIncidents,
            long highSeverityIncidents,
            String riskLevel) {

        String unresolvedText = totalIncidents - resolvedIncidents <= 0
                ? "No unresolved incidents remain."
                : "Most operational issues remain unresolved and require attention.";

        return "This project '" + projectName + "' currently has "
                + totalIncidents + " incidents, including "
                + activeIncidents + " active incidents and "
                + highSeverityIncidents + " high-severity incidents. "
                + "The overall risk level is " + riskLevel + ". "
                + unresolvedText;
    }
}