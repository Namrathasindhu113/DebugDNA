import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

function AnalyticsProjectsBar({ data }) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <h2 className="text-cyan-400 text-2xl font-bold mb-6">
        Top Affected Projects
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis dataKey="project" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#22d3ee"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  )
}

export default AnalyticsProjectsBar