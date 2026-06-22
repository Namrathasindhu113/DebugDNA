import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const COLORS = [
  "#ef4444",
  "#eab308",
  "#22c55e",
]

function AnalyticsSeverityPie({ data }) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 min-h-[500px]">

      <h2 className="text-xl font-bold text-cyan-400 mb-4">
        Incidents by Severity
      </h2>

      <div className="w-full h-[400px]">

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

    <PieChart>

            <Pie
  data={data}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={140}
  label
>

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  )
}

export default AnalyticsSeverityPie