import { useEffect, useState } from "react"
import axios from "axios"
import DashboardLayout from "../layouts/DashboardLayout"

function AuditLogs() {

  const [logs, setLogs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("ALL")

  const totalLogs = logs.length

  const issueLogs = logs.filter(
    (log) => log.entityType === "ISSUE"
  ).length

  const projectLogs = logs.filter(
    (log) => log.entityType === "PROJECT"
  ).length

  const assignmentLogs = logs.filter(
    (log) => log.action === "ISSUE_ASSIGNED"
  ).length

  const filteredLogs = logs.filter((log) => {

    const matchesSearch =
      log.details?.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      log.performedBy?.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      log.entityType?.toLowerCase().includes(
        searchTerm.toLowerCase()
      )

    const matchesAction =
      actionFilter === "ALL" ||
      log.action === actionFilter

    return matchesSearch && matchesAction
  })

  useEffect(() => {

  fetchLogs()

  const interval = setInterval(() => {
    fetchLogs()
  }, 5000)

  return () => clearInterval(interval)

}, [])
  const fetchLogs = async () => {
    try {

      const response = await axios.get(
        "http://localhost:9090/api/audit-logs"
      )

      setLogs(response.data)

    } catch (err) {

      console.log(err)

    }
  }

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-cyan-400">
        Audit Logs
      </h1>

      <p className="mt-2 text-slate-400">
        Track all project and issue activities
      </p>
      <p className="mt-2 text-xs text-green-400">
  Auto-refreshing every 5 seconds
</p>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">
            Total Logs
          </p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-2">
            {totalLogs}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">
            Issue Events
          </p>

          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {issueLogs}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">
            Project Events
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {projectLogs}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">
            Assignments
          </p>

          <h2 className="text-3xl font-bold text-purple-400 mt-2">
            {assignmentLogs}
          </h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="grid md:grid-cols-2 gap-4 mt-8">

        <input
          type="text"
          placeholder="Search audit logs..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
        />

        <select
          value={actionFilter}
          onChange={(e) =>
            setActionFilter(e.target.value)
          }
          className="bg-[#0B1220] border border-white/10 rounded-xl px-4 py-3 text-white"
        >
          <option value="ALL">
            All Events
          </option>

          <option value="PROJECT_CREATED">
            PROJECT_CREATED
          </option>

          <option value="ISSUE_CREATED">
            ISSUE_CREATED
          </option>

          <option value="ISSUE_ASSIGNED">
            ISSUE_ASSIGNED
          </option>

          <option value="ISSUE_STATUS_UPDATED">
            ISSUE_STATUS_UPDATED
          </option>

        </select>

      </div>

      {/* RESULT COUNT */}

      <div className="mt-4 text-slate-400">
        Showing {filteredLogs.length} audit events
      </div>

      {/* AUDIT LOG LIST */}

      <div className="mt-6 space-y-4">

        {filteredLogs.length === 0 ? (

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-slate-400">
              No audit events found
            </p>
          </div>

        ) : (

          filteredLogs.map((log) => {

            const badgeColor =
              log.action === "PROJECT_CREATED"
                ? "bg-green-500/20 text-green-400"
                : log.action === "ISSUE_CREATED"
                ? "bg-cyan-500/20 text-cyan-400"
                : log.action === "ISSUE_ASSIGNED"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-purple-500/20 text-purple-400"

            return (

              <div
                key={log.id}

               className="relative pl-10 bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="absolute left-4 top-6">

  <div
    className={`w-3 h-3 rounded-full ${
      log.action === "PROJECT_CREATED"
        ? "bg-green-400"
        : log.action === "ISSUE_CREATED"
        ? "bg-cyan-400"
        : log.action === "ISSUE_ASSIGNED"
        ? "bg-yellow-400"
        : "bg-purple-400"
    }`}
  />

</div>
<div className="absolute left-[21px] top-9 h-full w-px bg-white/10" />

                <div className="flex justify-between items-center">

                  <div>

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
                    >
                      {log.action}
                    </span>

                    <p className="text-slate-300 mt-3">
                      {log.details}
                    </p>

                  </div>

                  <span className="text-xs text-slate-500">
                    {new Date(
                      log.timestamp
                    ).toLocaleString()}
                  </span>

                </div>

                <div className="mt-4 flex gap-6 text-sm">

                  <span className="text-slate-400">
                    Entity: {log.entityType}
                  </span>

                  <span className="text-slate-400">
                    User: {log.performedBy}
                  </span>

                </div>

              </div>

            )

          })

        )}

      </div>

    </DashboardLayout>
  )
}

export default AuditLogs