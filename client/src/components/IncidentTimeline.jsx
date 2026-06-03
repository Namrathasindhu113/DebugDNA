function IncidentTimeline({ issues }) {

  const sortedIssues = [...issues].reverse()

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            Incident Timeline
          </h2>

          <p className="mt-2 text-slate-400">
            Live infrastructure activity feed
          </p>

        </div>

        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

      </div>

      <div className="mt-8 space-y-6">

        {sortedIssues.map((issue, index) => (

          <div
            key={index}
            className="flex gap-5"
          >

            <div className="flex flex-col items-center">

              <div className="h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

              {index !== sortedIssues.length - 1 && (

                <div className="w-[2px] h-full bg-white/10 mt-2" />

              )}

            </div>

            <div className="pb-6">

              <p className="text-sm text-slate-500">
                {issue.lastSeen || "Just now"}
              </p>

              <h3 className="mt-1 text-lg font-semibold">
                {issue.title}
              </h3>

              <p className="mt-2 text-slate-400">
                {issue.severity} severity incident detected
              </p>

              <div className="mt-3 flex items-center gap-3">

                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
                  {issue.status || "ACTIVE"}
                </span>

                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
                  {issue.occurrences || 1} occurrences
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default IncidentTimeline