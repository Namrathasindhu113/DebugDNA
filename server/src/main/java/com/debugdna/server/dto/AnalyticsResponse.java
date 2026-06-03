package com.debugdna.server.dto;

public class AnalyticsResponse {

    private long totalIssues;
    private long criticalIssues;
    private long activeIssues;

    public long getTotalIssues() {
        return totalIssues;
    }

    public void setTotalIssues(long totalIssues) {
        this.totalIssues = totalIssues;
    }

    public long getCriticalIssues() {
        return criticalIssues;
    }

    public void setCriticalIssues(long criticalIssues) {
        this.criticalIssues = criticalIssues;
    }

    public long getActiveIssues() {
        return activeIssues;
    }

    public void setActiveIssues(long activeIssues) {
        this.activeIssues = activeIssues;
    }
}