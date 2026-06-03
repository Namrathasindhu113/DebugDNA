package com.debugdna.server.model;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "projects")
@Data
public class Project {

    @Id
    private String id;

    private String name;

    private String apiKey;

    private String environment;

    private LocalDateTime createdAt;
}