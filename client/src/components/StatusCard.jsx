import { motion } from "framer-motion"

function StatusCard({ title, value, status }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 w-full"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-slate-400 text-sm">{title}</h3>

        <div
          className={`h-3 w-3 rounded-full ${
            status === "active"
              ? "bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
              : "bg-red-500"
          }`}
        />
      </div>

      <h1 className="mt-6 text-4xl font-bold text-white">
        {value}
      </h1>
    </motion.div>
  )
}

export default StatusCard