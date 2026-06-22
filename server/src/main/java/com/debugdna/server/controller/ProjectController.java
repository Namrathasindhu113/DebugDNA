package com.debugdna.server.controller;

import com.debugdna.server.model.Project;
import com.debugdna.server.repository.ProjectRepository;
import com.debugdna.server.service.ProjectSummaryService;
import com.debugdna.server.service.AuditLogService;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final ProjectSummaryService projectSummaryService;
    private final AuditLogService auditLogService;

    public ProjectController(
            ProjectRepository projectRepository,
            ProjectSummaryService projectSummaryService,
            AuditLogService auditLogService) {

        this.projectRepository = projectRepository;
        this.projectSummaryService = projectSummaryService;
        this.auditLogService = auditLogService;
    }

    @PostMapping
    public Project createProject(
            @RequestBody Project project) {

        project.setApiKey(
                UUID.randomUUID().toString());

        project.setCreatedAt(
                LocalDateTime.now());

        Project savedProject = projectRepository.save(project);

        auditLogService.log(
                "PROJECT_CREATED",
                "PROJECT",
                savedProject.getId(),
                "SYSTEM",
                "Project created: " + savedProject.getName());

        return savedProject;
    }

    @GetMapping
    public List<Project> getProjects() {

        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public Project getProjectById(
            @PathVariable String id) {

        return projectRepository
                .findById(id)
                .orElseThrow();
    }

    @GetMapping("/{projectId}/summary")
    public Map<String, Object> getProjectSummary(
            @PathVariable String projectId) {

        return projectSummaryService.getProjectSummary(projectId);
    }
}