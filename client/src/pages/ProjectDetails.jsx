import { useEffect, useState } from "react"
import { Copy, ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function ProjectDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [project, setProject] = useState(null)

  const copyApiKey = () => {
    if (!project?.apiKey) return

    navigator.clipboard.writeText(project.apiKey)
    alert("API Key Copied")
  }

  useEffect(() => {
    axios
      .get(`http://localhost:9090/api/projects/${id}`)
      .then((res) => {
        setProject(res.data)
      })
  }, [id])

  if (!project) {
    return (
      <div className="p-10">
        <button
          onClick={() => navigate(-1) || navigate("/projects")}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mt-10 flex min-h-[260px] items-center justify-center rounded-3xl border border-cyan-400/20 bg-white/5 p-10 text-center">
          <p className="text-xl font-semibold text-cyan-400">
            Project not found
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-10">
      <button
        onClick={() => navigate(-1) || navigate("/projects")}
        className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h1 className="mt-4 text-4xl font-bold">
        {project.name}
      </h1>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-slate-400">Environment</p>
        <p className="mt-2 text-xl">{project.environment}</p>

        <p className="mt-6 text-slate-400">API Key</p>

        <div className="mt-3 flex items-center gap-3">
          <p className="text-cyan-400 break-all flex-1">{project.apiKey}</p>

          <button
            onClick={copyApiKey}
            className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold">SDK Setup</h2>

        <pre className="mt-5 overflow-auto bg-black/30 rounded-xl p-4 text-sm">
{`const DebugDNA = require("debugdna-sdk")

DebugDNA.init({
  apiUrl: "http://localhost:9090",
  apiKey: "${project.apiKey}",
  projectId: "${project.name}",
  appName: "${project.name}",
  environment: "${project.environment}"
})`}
        </pre>
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Integration Steps</h2>

        <ol className="mt-5 space-y-3 text-slate-300">
          <li>1. Install DebugDNA SDK</li>
          <li>2. Copy your API Key</li>
          <li>3. Initialize SDK in your Node.js app</li>
          <li>4. Start monitoring crashes automatically</li>
        </ol>
      </div>
    </div>
  )
}

export default ProjectDetails