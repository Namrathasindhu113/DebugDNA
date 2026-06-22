package com.debugdna.server.repository;

import com.debugdna.server.model.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import java.util.Map;

import org.springframework.data.mongodb.repository.Aggregation;

public interface IssueRepository
                extends MongoRepository<Issue, String> {

        long countBySeverity(String severity);

        long countByStatus(String status);

        List<Issue> findByTitleAndProjectId(
                        String title,
                        String projectId);

        List<Issue> findByProjectId(
                        String projectId);

        List<Issue> findBySeverity(String severity);

        @Aggregation(pipeline = {
                        "{ $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } }",
                        "{ $sort: { _id: 1 } }"
        })
        List<Map<String, Object>> getIncidentTrends();

        @Aggregation(pipeline = {
                        "{ $group: { _id: '$projectId', count: { $sum: 1 } } }",
                        "{ $sort: { count: -1 } }"
        })

        List<Map<String, Object>> getTopProjects();
}