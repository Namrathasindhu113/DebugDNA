import { useEffect, useState } from "react"

function AITerminal() {

  const logs = [
    "> initializing DebugDNA AI engine...",
    "> scanning deployment infrastructure...",
    "> analyzing backend services...",
    "> mongodb connection latency detected...",
    "> cors policy validated...",
    "> security scan completed...",
    "> AI root-cause analysis generated...",
    "> deployment health stable...",
    "> monitoring active...",
  ]

  const [visibleLogs, setVisibleLogs] = useState([])

  useEffect(() => {

    let index = 0

    const interval = setInterval(() => {

      setVisibleLogs((prev) => [
        ...prev,
        logs[index]
      ])

      index++

      if(index >= logs.length) {
        clearInterval(interval)
      }

    }, 1200)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="bg-black/40 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl overflow-hidden">

      <div className="flex items-center gap-3 mb-6">

        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />

        <p className="ml-4 text-cyan-400 tracking-widest text-sm">
          AI TERMINAL STREAM
        </p>

      </div>

      <div className="space-y-3 font-mono text-sm text-green-400 min-h-[300px]">

        {visibleLogs.map((log, index) => (
          <p
            key={index}
            className="animate-pulse"
          >
            {log}
          </p>
        ))}

        <div className="flex items-center">

          <span className="text-cyan-400">
            ▋
          </span>

        </div>

      </div>

    </div>
  )
}

export default AITerminal