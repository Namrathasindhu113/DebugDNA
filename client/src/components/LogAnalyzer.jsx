import { useState } from "react"
import axios from "axios"

function LogAnalyzer() {

  const [logs, setLogs] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {

    if (!logs.trim()) return

    setLoading(true)

    try {

      const res = await axios.post(
        "http://localhost:9090/api/ai/chat",
        {
          prompt: `
You are an elite AI DevOps monitoring assistant.

Analyze these logs professionally.

Respond ONLY in this format:

Root Cause:
...

Severity:
...

Suggested Fix:
...

Deployment Impact:
...

LOGS:
${logs}
          `
        }
      )

      setResponse(res.data.response)

    } catch (error) {

      setResponse(
        "AI analysis failed."
      )
    }

    setLoading(false)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            AI Log Analyzer
          </h2>

          <p className="mt-2 text-slate-400">
            Analyze infrastructure and deployment logs using AI
          </p>

        </div>

        <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />

      </div>

      <textarea
        value={logs}
        onChange={(e) =>
          setLogs(e.target.value)
        }
        placeholder="Paste logs here..."
        className="mt-8 w-full h-52 bg-black/30 border border-white/10 rounded-2xl p-5 outline-none focus:border-cyan-400 resize-none text-slate-300"
      />

      <button
        onClick={handleAnalyze}
        className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 transition"
      >
        Analyze Logs
      </button>

      {loading && (

        <div className="mt-6 text-cyan-400 animate-pulse">
          AI analyzing logs...
        </div>

      )}

      {response && (

        <div className="mt-8 bg-black/30 border border-cyan-500/20 rounded-2xl p-5 whitespace-pre-line text-slate-300 leading-relaxed overflow-auto max-h-[500px]">

          {response}

        </div>

      )}

    </div>
  )
}

export default LogAnalyzer