package com.debugdna.server.repository;

import com.debugdna.server.model.AuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AuditLogRepository extends MongoRepository<AuditLog, String> {

    List<AuditLog> findTop50ByOrderByTimestampDesc();

}