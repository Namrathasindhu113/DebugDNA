function AIAnalysisPanel() {
  return (
    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl">
      
      <p className="text-cyan-400 tracking-[0.3em] uppercase text-sm">
        AI Root Cause Analysis
      </p>

      <h2 className="mt-5 text-3xl font-bold">
        MongoDB Connection Failure Detected
      </h2>

      <div className="mt-8 space-y-5">
        
        <div>
          <h3 className="font-semibold text-cyan-300">
            Root Cause
          </h3>

          <p className="mt-2 text-slate-300">
            Backend server cannot connect to MongoDB Atlas due to missing IP whitelist configuration.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-cyan-300">
            Suggested Fix
          </h3>

          <p className="mt-2 text-slate-300">
            Add your current IP address in MongoDB Atlas Network Access settings.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-cyan-300">
            Severity
          </h3>

          <p className="mt-2 text-red-400">
            HIGH
          </p>
        </div>
      </div>
    </div>
  )
}

export default AIAnalysisPanel