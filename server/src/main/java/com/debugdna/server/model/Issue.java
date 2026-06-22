package com.debugdna.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "issues")
@Data
public class Issue {

    @Id
    private String id;

    private String title;

    private String severity;

    private String description;

    private String aiAnalysis;

    private String rootCause;

    private String businessImpact;

    private String recoverySteps;

    private String preventionStrategy;

    private String confidenceScore;

    private String previousFix;

    private String suggestedFix;

    private String assignedTo;

    private String assignedTeam;

    private String assignedBy;

    private LocalDateTime assignedAt;

    private String projectId;

    private String environment;

    private LocalDateTime createdAt;

    private Integer occurrences;

    private String status;

    private LocalDateTime lastSeen;

}