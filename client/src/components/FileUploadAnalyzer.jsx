import { useState } from "react"
import axios from "axios"

function FileUploadAnalyzer() {

  const [file, setFile] = useState(null)
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {

    if (!file) return

    const text = await file.text()

    setLoading(true)

    try {

      const res = await axios.post(
        "http://localhost:9090/api/ai/chat",
        {
          prompt: `
Analyze this server log professionally.

Provide:
1. Root cause
2. Severity
3. Suggested Fix
4. Deployment impact

LOGS:
${text}
          `
        }
      )

      setResponse(res.data.response)

    } catch (error) {

      setResponse("AI analysis failed.")

    }

    setLoading(false)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <h2 className="text-3xl font-bold">
        AI File Log Analyzer
      </h2>

      <p className="mt-3 text-slate-400">
        Upload backend logs, stack traces, or deployment errors
      </p>

      <input
        type="file"
        accept=".txt,.log"
        onChange={(e) => setFile(e.target.files[0])}
        className="mt-6 block w-full text-sm text-slate-300"
      />

      <button
        onClick={handleAnalyze}
        className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 transition"
      >
        Analyze File
      </button>

      {loading && (

        <div className="mt-6 text-cyan-400 animate-pulse">
          AI analyzing uploaded logs...
        </div>

      )}

      {response && (

        <div className="mt-6 bg-black/30 border border-cyan-500/20 rounded-2xl p-5 whitespace-pre-line text-slate-300 leading-relaxed overflow-auto max-h-[500px]">

          {response}

        </div>

      )}

    </div>
  )
}

export default FileUploadAnalyzer