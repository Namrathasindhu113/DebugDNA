import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import DashboardLayout from "../layouts/DashboardLayout"
import AnalyticsKpiCard from "../components/analytics/AnalyticsKpiCard"
import AnalyticsSeverityPie from "../components/analytics/AnalyticsSeverityPie"
import AnalyticsStatusBar from "../components/analytics/AnalyticsStatusBar"
import AnalyticsTrendLine from "../components/analytics/AnalyticsTrendLine"
import AnalyticsProjectsBar from "../components/analytics/AnalyticsProjectsBar"

function AnalyticsDashboard() {

  const navigate = useNavigate()

  const [analytics, setAnalytics] = useState({
    totalIncidents: 0,
    activeIncidents: 0,
    resolvedIncidents: 0,
    highSeverityIncidents: 0,
    severityData: [],
    statusData: [],
  })

  const [trendData, setTrendData] = useState([])
  const [projectData, setProjectData] = useState([])

  const hasAnalyticsData =
    analytics.totalIncidents > 0 ||
    analytics.activeIncidents > 0 ||
    analytics.resolvedIncidents > 0 ||
    analytics.highSeverityIncidents > 0 ||
    analytics.severityData?.length > 0 ||
    analytics.statusData?.length > 0 ||
    trendData.length > 0 ||
    projectData.length > 0

  useEffect(() => {

    loadAnalytics()
    loadTrends()
    loadProjects()

  }, [])

  const loadAnalytics = async () => {

    try {

      const response = await axios.get(
        "http://localhost:9090/api/analytics"
      )

      setAnalytics(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  const loadTrends = async () => {

    try {

      const response = await axios.get(
        "http://localhost:9090/api/analytics/trends"
      )

      const formatted = response.data.map(item => ({
        date: item._id,
        count: item.count
      }))

      setTrendData(formatted)

    } catch (error) {

      console.error(error)

    }
  }

  const loadProjects = async () => {

    try {

      const response = await axios.get(
        "http://localhost:9090/api/analytics/projects"
      )

      const formatted = response.data.map(item => ({
        project: item._id,
        count: item.count
      }))

      setProjectData(formatted)

    } catch (error) {

      console.error(error)

    }
  }

  return (

    <DashboardLayout>

      <div className="text-white">

        <button
          onClick={() => navigate(-1) || navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="mt-4 text-4xl font-bold text-cyan-400">
          Analytics Dashboard
        </h1>

        <p className="mt-3 text-slate-400">
          DebugDNA Incident Analytics
        </p>

        {hasAnalyticsData ? (
          <>
            <div className="grid md:grid-cols-4 gap-4 mt-8">

              <AnalyticsKpiCard
                title="Total Incidents"
                value={analytics.totalIncidents}
              />

              <AnalyticsKpiCard
                title="Active"
                value={analytics.activeIncidents}
              />

              <AnalyticsKpiCard
                title="Resolved"
                value={analytics.resolvedIncidents}
              />

              <AnalyticsKpiCard
                title="High Severity"
                value={analytics.highSeverityIncidents}
              />

            </div>

            <div className="mt-10">

              <div className="grid lg:grid-cols-2 gap-6">

                <AnalyticsSeverityPie
                  data={analytics.severityData}
                />

                <AnalyticsStatusBar
                  data={analytics.statusData}
                />

              </div>

            </div>

            <div className="mt-10">

              <AnalyticsTrendLine
                data={trendData}
              />

            </div>

            <div className="mt-10">

              <AnalyticsProjectsBar
                data={projectData}
              />

            </div>
          </>
        ) : (
          <div className="mt-10 flex min-h-[260px] items-center justify-center rounded-3xl border border-cyan-400/20 bg-white/5 p-10 text-center">
            <p className="text-xl font-semibold text-cyan-400">
              No analytics available
            </p>
          </div>
        )}

      </div>

    </DashboardLayout>

  )
}

export default AnalyticsDashboard