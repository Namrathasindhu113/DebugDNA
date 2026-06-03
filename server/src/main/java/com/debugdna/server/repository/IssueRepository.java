package com.debugdna.server.repository;

import com.debugdna.server.model.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IssueRepository
                extends MongoRepository<Issue, String> {

        long countBySeverity(String severity);

        long countByStatus(String status);

        List<Issue> findByTitleAndProjectId(
                        String title,
                        String projectId);
}