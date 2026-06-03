import { AlertTriangle } from "lucide-react"
import axios from "axios"

function IssueCard({
  id,
  title,
  severity,
  description,
  aiAnalysis,
  suggestedFix,
  occurrences,
  status,
  lastSeen,
  environment,
  projectId,
}) {

  const severityColor =
    severity === "HIGH"
      ? "text-red-400 border-red-500/30 bg-red-500/20"
      : severity === "MEDIUM"
      ? "text-yellow-300 border-yellow-500/30 bg-yellow-500/20"
      : "text-green-300 border-green-500/30 bg-green-500/20"

  const updateStatus = async (newStatus) => {

    try {

      await axios.put(
        `http://localhost:9090/api/issues/${id}/status?status=${newStatus}`
      )

      window.location.reload()

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

      <p className="mt-6 text-slate-400 leading-relaxed whitespace-pre-wrap">
        {description}
      </p>

      <div className="mt-6 border-t border-white/10 pt-5">

        <div className="mt-6 border-t border-white/10 pt-5">

  <h3 className="text-cyan-400 font-semibold">
    AI Analysis
  </h3>

  <div className="mt-3 bg-black/20 rounded-xl p-4">

    <pre className="text-slate-300 whitespace-pre-wrap text-sm overflow-x-auto">
      {aiAnalysis}
    </pre>

  </div>

</div>

      </div>

      <div className="mt-5">

        <h3 className="text-cyan-400 font-semibold">
          Suggested Fix
        </h3>

        <p className="mt-2 text-slate-300">
          {suggestedFix}
        </p>

      </div>

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

    </div>
  )
}

export default IssueCard