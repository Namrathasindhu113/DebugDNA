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

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-10">

        <div>
          <h1 className="text-5xl xl:text-6xl font-bold leading-tight bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            AI Monitoring
            <br />
            Dashboard
          </h1>

          <p className="mt-5 text-slate-400 text-lg max-w-2xl leading-relaxed">
            Live AI-powered debugging and infrastructure monitoring
          </p>

          <div className="mt-5 flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 text-sm tracking-widest">
              LIVE MONITORING ACTIVE
            </p>

          </div>
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

      <div className="mt-8 flex gap-4 flex-wrap">

  <button
    onClick={() => setSelectedProject("ALL")}
    className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400"
  >
    ALL
  </button>

  {[...new Set(
    issues.map(
      (issue) => issue.projectId
    )
  )].map((project) => (

    <button
      key={project}
      onClick={() =>
        setSelectedProject(project)
      }
      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 transition"
    >
      {project}
    </button>

  ))}

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

      {/* FORM + ISSUE FEED */}
      <div className="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ISSUE FORM */}
        <div className="xl:col-span-1">
          <IssueForm refreshIssues={fetchIssues} />
        </div>

        {/* ISSUE LIST */}
        <div className="xl:col-span-2 grid grid-cols-1 gap-6">

          {filteredIssues.map((issue) => (
            <IssueCard
              id={issue.id}
              key={issue.id}
              title={issue.title}
              severity={issue.severity}
              description={issue.description}
              aiAnalysis={issue.aiAnalysis}
              suggestedFix={issue.suggestedFix}
              occurrences={issue.occurrences}
              status={issue.status}
              lastSeen={issue.lastSeen}
              environment={issue.environment}
              projectId={issue.projectId}
            />
          ))}

        </div>

      </div>

      {/* AI PANEL */}
      <div className="mt-10">
        <AITerminal />
      </div>
      <div className="mt-10">
  <AIChat />
</div>

<div className="mt-10">
  <LogAnalyzer />
</div>

<div className="mt-10">
  <DeploymentPanel />
</div>
<div className="mt-10">
  <FileUploadAnalyzer />
</div>

<div className="mt-10">
  <AnalyticsChart issues={issues} />
</div>

<div className="mt-10">
  <IncidentTimeline issues={issues} />
</div>

    </DashboardLayout>
  )
}

export default Dashboard