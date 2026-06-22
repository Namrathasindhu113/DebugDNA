import { useEffect, useState } from "react"
import axios from "axios"

import DashboardLayout from "../layouts/DashboardLayout"
import IssueCard from "../components/IssueCard"
import AIAnalysisPanel from "../components/AIAnalysisPanel"
import IssueForm from "../components/IssueForm"
import StatsCard from "../components/StatsCard"
import AITerminal from "../components/AITerminal"
import AIChat from "../components/AIChat"
import LogAnalyzer from "../components/LogAnalyzer"
import DeploymentPanel from "../components/DeploymentPanel"
import FileUploadAnalyzer from "../components/FileUploadAnalyzer"
import AnalyticsChart from "../components/AnalyticsChart"
import IncidentTimeline from "../components/IncidentTimeline"
import ProjectSelector from "../components/ProjectSelector"
import { connectWebSocket } from "../services/websocket"
import CollapsibleSection from "../components/CollapsibleSection"
import NotificationBell from "../components/NotificationBell"
import RecentActivity from "../components/RecentActivity"
function Dashboard() {

  const [issues, setIssues] = useState([])

  const [projects, setProjects] =
  useState([])

  const [selectedProject, setSelectedProject] =
  useState("ALL")

  const [searchTerm, setSearchTerm] =
  useState("")

  const [severityFilter, setSeverityFilter] =
  useState("ALL")

  const [statusFilter, setStatusFilter] =
  useState("ALL")

  const [notifications, setNotifications] =
  useState([])

  const fetchIssues = () => {
    axios
      .get("http://localhost:9090/api/issues")
      .then((res) => {
        setIssues(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchProjects = () => {

  axios
    .get(
      "http://localhost:9090/api/projects"
    )
    .then((res) => {

      setProjects(res.data)

    })
    .catch((err) => {

      console.log(err)

    })
}

  useEffect(() => {
    
    console.log("Dashboard mounted")

  fetchIssues()

  fetchProjects()

  console.log("Connecting websocket...")

  const stompClient =
connectWebSocket(
  (newIssue) => {

    setIssues((prev) => [
      newIssue,
      ...prev,
    ])

    setNotifications((prev) => [

      `🚨 ${newIssue.severity} Issue: ${newIssue.title}`,

      ...prev,

    ])
  }
)
  const interval = setInterval(() => {
    fetchIssues()
  }, 3000)

 return () => {

  clearInterval(interval)

  if (
    stompClient &&
    typeof stompClient.deactivate === "function"
  ) {

    stompClient.deactivate()
  }
}

}, [])

const filteredIssues = issues.filter(
  (issue) => {

    const matchesProject =
      selectedProject === "ALL" ||
      issue.projectId === selectedProject

    const matchesSearch =
      issue.title
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

    const matchesSeverity =
      severityFilter === "ALL" ||
      issue.severity === severityFilter

    const matchesStatus =
      statusFilter === "ALL" ||
      issue.status === statusFilter

    return (
      matchesProject &&
      matchesSearch &&
      matchesSeverity &&
      matchesStatus
    )
  }
)

  const highIssues = issues.filter(
    (issue) => issue.severity === "HIGH"
  ).length

  const projectIssues =
  selectedProject === "ALL"
    ? []
    : issues.filter(
        (issue) =>
          issue.projectId === selectedProject
      )

const activeProjectIssues =
  projectIssues.filter(
    (issue) => issue.status === "ACTIVE"
  ).length

const resolvedProjectIssues =
  projectIssues.filter(
    (issue) => issue.status === "RESOLVED"
  ).length

const projectHealth =
  projectIssues.length === 0
    ? 100
    : Math.max(
        0,
        100 -
          projectIssues.length * 10
      )

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

        <div>
          <h1 className="text-3xl font-bold text-cyan-400">
  Overview
</h1>

<p className="mt-2 text-slate-400">
  Live AI-powered debugging and infrastructure monitoring
</p>

<div className="mt-4 flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 text-sm tracking-widest">
              LIVE MONITORING ACTIVE
            </p>

          </div>
        </div>
<div className="flex justify-end mb-4">

  <NotificationBell
    notifications={notifications}
  />

</div>
        {/* STATS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 w-full xl:w-auto">
        
          <StatsCard
            title="Total Issues"
            value={issues.length}
            statusColor="bg-cyan-400"
          />

          <StatsCard
            title="Critical Alerts"
            value={highIssues}
            statusColor="bg-red-400"
          />

          <StatsCard
            title="AI Engine"
            value="ONLINE"
            statusColor="bg-green-400"
          />

          <StatsCard
            title="Deployment Health"
            value="98%"
            statusColor="bg-blue-400"
          />

        </div>

      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">

  <input
    type="text"
    placeholder="Search issues..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
  />

  <select
  value={severityFilter}
  onChange={(e) =>
    setSeverityFilter(e.target.value)
  }
  className="bg-[#0B1220] border border-white/10 rounded-xl px-4 py-3 text-white"
>
    <option value="ALL" className="bg-[#0B1220]">
  All Severities
</option>

<option value="HIGH" className="bg-[#0B1220]">
  HIGH
</option>

<option value="MEDIUM" className="bg-[#0B1220]">
  MEDIUM
</option>

<option value="LOW" className="bg-[#0B1220]">
  LOW
</option>
  </select>

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
  >
    <option value="ALL" className="bg-[#0B1220]">
  All Status
</option>

<option value="ACTIVE" className="bg-[#0B1220]">
  ACTIVE
</option>

<option value="INVESTIGATING" className="bg-[#0B1220]">
  INVESTIGATING
</option>

<option value="RESOLVED" className="bg-[#0B1220]">
  RESOLVED
</option>
  </select>


</div>

<div className="mt-8">

  <ProjectSelector

    projects={projects}

    selectedProject={
      selectedProject
    }

    setSelectedProject={
      setSelectedProject
    }

  />

</div>

<div className="mt-6">
  <RecentActivity
    issues={issues}
  />
</div>


{/* FORM + ISSUE FEED */}
<div className="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-8">

  {/* LEFT COLUMN */}
  <div className="xl:col-span-1 space-y-6">

    {
      selectedProject !== "ALL" && (

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <h2 className="text-xl font-bold text-cyan-400">
            Project Intelligence
          </h2>

          <div className="space-y-4 mt-5">

            <div>
              <p className="text-slate-400 text-sm">
                Project
              </p>

              <p className="text-white font-semibold">
                {selectedProject}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Total Incidents
              </p>

              <p className="text-cyan-400 font-bold">
                {projectIssues.length}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Active Incidents
              </p>

              <p className="text-red-400 font-bold">
                {activeProjectIssues}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Resolved
              </p>

              <p className="text-green-400 font-bold">
                {resolvedProjectIssues}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Health Score
              </p>

              <p className="text-green-400 font-bold">
                {projectHealth}%
              </p>
            </div>

          </div>

        </div>

      )
    }

    <IssueForm
      refreshIssues={fetchIssues}
    />

  </div>

  {/* ISSUE LIST */}
  <div className="xl:col-span-2">
    {issues.length === 0 ? (
      <div className="flex min-h-[260px] items-center justify-center rounded-3xl border border-cyan-400/20 bg-white/5 p-10 text-center">
        <div>
          <h3 className="text-2xl font-semibold text-cyan-400">
            No incidents detected yet
          </h3>
          <p className="mt-2 text-slate-400">
            Your monitoring environment looks healthy.
          </p>
        </div>
      </div>
    ) : filteredIssues.length === 0 ? (
      <div className="flex min-h-[260px] items-center justify-center rounded-3xl border border-cyan-400/20 bg-white/5 p-10 text-center">
        <div>
          <h3 className="text-2xl font-semibold text-cyan-400">
            No incidents match your filters
          </h3>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6">
        {filteredIssues.map((issue) => (
          <IssueCard
            key={issue.id}
            id={issue.id}
            title={issue.title}
            severity={issue.severity}
            description={issue.description}
            aiAnalysis={issue.aiAnalysis}
            rootCause={issue.rootCause}
            businessImpact={issue.businessImpact}
            recoverySteps={issue.recoverySteps}
            preventionStrategy={issue.preventionStrategy}
            confidenceScore={issue.confidenceScore}
            suggestedFix={issue.suggestedFix}
            occurrences={issue.occurrences}
            status={issue.status}
            lastSeen={issue.lastSeen}
            environment={issue.environment}
            projectId={issue.projectId}
            assignedTo={issue.assignedTo}
            assignedTeam={issue.assignedTeam}
            assignedBy={issue.assignedBy}
            assignedAt={issue.assignedAt}
            setIssues={setIssues}
            issues={issues}
          />
        ))}
      </div>
    )}
  </div>

      </div>

      <div className="mt-10 space-y-6">

  <CollapsibleSection
    title="AI Assistant"
  >
    <AIChat />
  </CollapsibleSection>

  <CollapsibleSection
    title="AI Terminal"
  >
    <AITerminal />
  </CollapsibleSection>

  <CollapsibleSection
    title="AI Log Analyzer"
  >
    <LogAnalyzer />
  </CollapsibleSection>

  <CollapsibleSection
    title="Deployment Monitor"
  >
    <DeploymentPanel />
  </CollapsibleSection>

  <CollapsibleSection
    title="File Upload Analyzer"
  >
    <FileUploadAnalyzer />
  </CollapsibleSection>

  <CollapsibleSection
    title="Analytics Preview"
  >
    <AnalyticsChart issues={issues} />
  </CollapsibleSection>

  <CollapsibleSection
    title="Incident Timeline"
  >
    <IncidentTimeline issues={issues} />
  </CollapsibleSection>

</div>

    </DashboardLayout>
  )
}

export default Dashboard