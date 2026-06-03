import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

function AnalyticsChart({ issues }) {

  const chartData = issues.map(
    (issue) => ({
      name:
        issue.title?.length > 15
          ? issue.title.substring(0, 15) + "..."
          : issue.title,
      occurrences:
        issue.occurrences || 1,
    })
  )

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            Incident Analytics
          </h2>

          <p className="mt-2 text-slate-400">
            Most recurring incidents detected by DebugDNA
          </p>
        </div>

        <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />

      </div>

      <div className="mt-10 h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.2}
            />

            <XAxis
              dataKey="name"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Bar
              dataKey="occurrences"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default AnalyticsChart