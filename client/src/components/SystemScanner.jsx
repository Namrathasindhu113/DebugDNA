import AIPulse from "./AIPulse"

function SystemScanner() {
  return (
    <div className="mt-32 px-6 md:px-10 relative z-10">
      
      <div className="text-center mb-14">
        <p className="text-cyan-400 tracking-[0.3em] uppercase text-sm">
          Autonomous Intelligence
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold">
          Continuous AI System Scanning
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed">
          DebugDNA continuously monitors development workflows,
          analyzes failures in real time, and identifies root causes
          before they become production problems.
        </p>
      </div>

      <AIPulse />
    </div>
  )
}

export default SystemScanner