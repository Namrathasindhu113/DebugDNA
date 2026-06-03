import { motion } from "framer-motion"

function AIPulse() {
  return (
    <div className="relative flex items-center justify-center h-[500px]">
      
      {/* Outer Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute h-[320px] w-[320px] rounded-full border border-cyan-400/20"
      />

      {/* Middle Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.15, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute h-[220px] w-[220px] rounded-full border border-blue-500/20"
      />

      {/* Core */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="relative z-10 h-32 w-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_80px_rgba(34,211,238,0.7)] flex items-center justify-center"
      >
        <span className="font-bold text-lg tracking-widest">
          AI
        </span>
      </motion.div>
    </div>
  )
}

export default AIPulse