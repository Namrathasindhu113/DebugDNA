package com.debugdna.server.controller;

import com.debugdna.server.model.Project;
import com.debugdna.server.repository.ProjectRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(
            ProjectRepository projectRepository) {

        this.projectRepository = projectRepository;
    }

    @PostMapping
    public Project createProject(
            @RequestBody Project project) {

        project.setApiKey(
                UUID.randomUUID().toString());

        project.setCreatedAt(
                LocalDateTime.now());

        return projectRepository.save(project);
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
}