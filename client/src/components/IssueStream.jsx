import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const issues = [
  {
    type: "error",
    title: "MongoDB Connection Failure",
    time: "2s ago",
  },
  {
    type: "success",
    title: "AI Root Cause Analysis Completed",
    time: "5s ago",
  },
  {
    type: "error",
    title: "CORS Policy Blocked Request",
    time: "12s ago",
  },
]

function IssueStream() {
  return (
    <div className="mt-28 px-10 relative z-10">
      
      <div className="mb-8">
        <p className="text-cyan-400 tracking-[0.3em] uppercase text-sm">
          Live Issue Stream
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Real-Time AI Detection Feed
        </h2>
      </div>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-5"
          >
            <div className="flex items-center gap-4">
              {issue.type === "error" ? (
                <AlertTriangle className="text-red-400" />
              ) : (
                <CheckCircle2 className="text-cyan-400" />
              )}

              <div>
                <h3 className="font-semibold">{issue.title}</h3>
                <p className="text-sm text-slate-400">
                  AI monitoring engine
                </p>
              </div>
            </div>

            <span className="text-slate-500 text-sm">
              {issue.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default IssueStream