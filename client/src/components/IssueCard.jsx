import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import axios from "axios"

 function IssueCard({
  id,
  title,
  severity,
  description,
  aiAnalysis,

  rootCause,
  businessImpact,
  recoverySteps,
  preventionStrategy,
  confidenceScore,

  suggestedFix,
  occurrences,
  status,
  lastSeen,
  environment,
  projectId,
  assignedTo,
  assignedTeam,
  assignedBy,
  assignedAt,
  issues,
  setIssues,
}){

  const severityColor =
    severity === "HIGH"
      ? "text-red-400 border-red-500/30 bg-red-500/20"
      : severity === "MEDIUM"
      ? "text-yellow-300 border-yellow-500/30 bg-yellow-500/20"
      : "text-green-300 border-green-500/30 bg-green-500/20"

  const [assignmentForm, setAssignmentForm] = useState({
    assignedTo: assignedTo || "",
    assignedTeam: assignedTeam || "",
    assignedBy: assignedBy || "",
  })

  const [expanded, setExpanded] = useState(false)
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)

  const updateStatus = async (newStatus) => {

    try {

      const response = await axios.put(
  `http://localhost:9090/api/issues/${id}/status?status=${newStatus}`
)

console.log(response.data)
setIssues(
  issues.map(issue =>
    issue.id === id
      ? response.data
      : issue
  )
)

    } catch (err) {

      console.log(err)
      console.error("Failed to update issue status")
    }
  }

  const assignIssue = async () => {

    try {

      const response = await axios.put(
  `http://localhost:9090/api/issues/${id}/assign`,
  {
    assignedTo: assignmentForm.assignedTo,
    assignedTeam: assignmentForm.assignedTeam,
    assignedBy: assignmentForm.assignedBy,
  }
)

setIssues(
  issues.map(issue =>
    issue.id === id
      ? response.data
      : issue
  )
)

    } catch (err) {

      console.log(err)

    }
  }

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-cyan-400" />

            <h2 className="text-2xl font-bold">
              {title}
            </h2>

          </div>

          <div className="flex flex-wrap gap-3 mt-4">

            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold">
              {status || "ACTIVE"}
            </span>

            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold">
              Occurrences: {occurrences || 1}
            </span>

            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              {assignedTo ? `Assigned: ${assignedTo}` : "Unassigned"}
            </span>

          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm border ${severityColor}`}
        >
          {severity}
        </span>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-sm">

        <div className="bg-white/5 rounded-xl p-3">

          <p className="text-slate-400">
            Last Seen
          </p>

          <p className="text-white mt-1">
            {lastSeen || "Just now"}
          </p>

        </div>

        <div className="bg-white/5 rounded-xl p-3">

          <p className="text-slate-400">
            Environment
          </p>

          <p className="text-white mt-1">
            {environment || "development"}
          </p>

        </div>

        <div className="bg-white/5 rounded-xl p-3">

          <p className="text-slate-400">
            Project
          </p>

          <p className="text-white mt-1">
            {projectId || "-"}
          </p>

        </div>

      </div>


      <div className="mt-6">

  <p className="text-slate-400 whitespace-pre-wrap">
    {description}
  </p>

  <button
    onClick={() => setExpanded(!expanded)}
    className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
  >
    {expanded ? "Hide Details ▲" : "View Details ▼"}
  </button>

</div>
{expanded && (
  <>
  <div className="mt-5 border-t border-white/10 pt-5">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          <input
            value={assignmentForm.assignedTo}
            onChange={(e) =>
              setAssignmentForm((prev) => ({
                ...prev,
                assignedTo: e.target.value,
              }))
            }
            placeholder="Assigned To"
            className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
          />

          <input
            value={assignmentForm.assignedTeam}
            onChange={(e) =>
              setAssignmentForm((prev) => ({
                ...prev,
                assignedTeam: e.target.value,
              }))
            }
            placeholder="Assigned Team"
            className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
          />

          <input
            value={assignmentForm.assignedBy}
            onChange={(e) =>
              setAssignmentForm((prev) => ({
                ...prev,
                assignedBy: e.target.value,
              }))
            }
            placeholder="Assigned By"
            className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
          />

        </div>

        <div className="mt-3 flex items-center gap-3 flex-wrap">

          <button
            onClick={assignIssue}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
          >
            {assignedTo ? "Reassign" : "Assign"}
          </button>

          {assignedTo && (
            <span className="text-xs text-cyan-300">
              To: {assignedTo}
            </span>
          )}

          {assignedTeam && (
            <span className="text-xs text-slate-400">
              Team: {assignedTeam}
            </span>
          )}

          {assignedBy && (
            <span className="text-xs text-slate-400">
              By: {assignedBy}
            </span>
          )}

          {assignedAt && (
            <span className="text-xs text-slate-400">
              At: {new Date(assignedAt).toLocaleString()}
            </span>
          )}

        </div>

      </div>
      {/* Incident Intelligence */}

      <div className="mt-8 border-t border-white/10 pt-6">

        <h3 className="text-cyan-400 font-bold text-xl">
          Incident Intelligence
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mt-4">

          <div className="bg-white/5 rounded-xl p-4">

            <p className="text-slate-400 text-sm">
              Root Cause
            </p>

            <p className="text-white mt-2">
              {rootCause || "Not available"}
            </p>

          </div>

          <div className="bg-white/5 rounded-xl p-4">

            <p className="text-slate-400 text-sm">
              Confidence Score
            </p>

            <p className="text-green-400 font-bold mt-2">
              {confidenceScore || "N/A"}
            </p>

          </div>

          <div className="bg-white/5 rounded-xl p-4">

            <p className="text-slate-400 text-sm">
              Business Impact
            </p>

            <p className="text-white mt-2">
              {businessImpact || "Not available"}
            </p>

          </div>

          <div className="bg-white/5 rounded-xl p-4">

            <p className="text-slate-400 text-sm">
              Prevention Strategy
            </p>

            <p className="text-white mt-2">
              {preventionStrategy || "Not available"}
            </p>

          </div>

        </div>

        <div className="mt-4 bg-black/20 rounded-xl p-4">

          <h4 className="text-cyan-400 font-semibold">
            Recovery Steps
          </h4>

          <pre className="mt-2 text-slate-300 whitespace-pre-wrap text-sm">
            {recoverySteps || "No recovery steps available"}
          </pre>

        </div>

      </div>
      

      {/* AI Analysis */}

<div className="mt-8 border-t border-white/10 pt-6">

  <button
    onClick={() => setShowAIAnalysis(!showAIAnalysis)}
    className="flex items-center gap-2 text-cyan-400 font-bold"
  >
    {showAIAnalysis
      ? "Hide AI Analysis ▲"
      : "Show AI Analysis ▼"}
  </button>

        <h3 className="text-cyan-400 font-bold">
          Raw AI Analysis
        </h3>

        {showAIAnalysis && (

  <div className="mt-3 bg-black/20 rounded-xl p-4">

    <pre className="text-slate-300 whitespace-pre-wrap text-sm overflow-x-auto">
      {aiAnalysis}
    </pre>

  </div>

)}
      </div>

      {/* Suggested Fix */}

      <div className="mt-6">

        <h3 className="text-cyan-400 font-semibold">
          Suggested Fix
        </h3>

        <p className="mt-2 text-slate-300">
          {suggestedFix}
        </p>

      </div>


      {/* Status Actions */}

      <div className="mt-6 flex gap-3 flex-wrap">

        <button
          onClick={() => updateStatus("ACTIVE")}
          className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
        >
          Active
        </button>

        <button
          onClick={() => updateStatus("INVESTIGATING")}
          className="px-4 py-2 rounded-xl bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
        >
          Investigating
        </button>

        <button
          onClick={() => updateStatus("RESOLVED")}
          className="px-4 py-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
        >
          Resolved
        </button>

    </div>
  </>
)}

 </div>

  )
}
export default IssueCard