package com.debugdna.server.repository;

import com.debugdna.server.model.Project;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository
        extends MongoRepository<Project, String> {

    Project findByApiKey(String apiKey);
}
