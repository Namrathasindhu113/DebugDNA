function TerminalPreview() {
  return (
    <div className="mt-28 px-10 relative z-10">
      
      <div className="mb-8">
        <p className="text-cyan-400 tracking-[0.3em] uppercase text-sm">
          AI Monitoring Terminal
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Continuous Development Analysis
        </h2>
      </div>

      <div className="bg-black/40 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.1)] overflow-hidden">
        
        <div className="flex gap-2 mb-5">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>

        <div className="space-y-3 font-mono text-sm">
          
          <p className="text-cyan-400">
            [MONITORING] npm run dev
          </p>

          <p className="text-slate-300">
            Detecting runtime activity...
          </p>

          <p className="text-red-400">
            MongoNetworkError detected
          </p>

          <p className="text-yellow-400">
            Running AI root-cause analysis...
          </p>

          <p className="text-green-400">
            Suggested Fix:
          </p>

          <p className="text-slate-300">
            Add current IP address to MongoDB Atlas whitelist.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TerminalPreview