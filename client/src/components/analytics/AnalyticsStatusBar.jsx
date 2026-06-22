import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function AnalyticsStatusBar({ data }) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 min-h-[500px]">

      <h2 className="text-xl font-bold text-cyan-400 mb-4">
        Incident Status Distribution
      </h2>

      <div className="w-full h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#06b6d4"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  )
}

export default AnalyticsStatusBar