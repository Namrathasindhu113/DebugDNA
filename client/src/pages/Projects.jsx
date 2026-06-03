import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Projects() {

  const [projects, setProjects] = useState([])

  const [name, setName] = useState("")

  const [environment, setEnvironment] =
    useState("development")

  const fetchProjects = () => {

    axios
      .get(
        "http://localhost:9090/api/projects"
      )
      .then((res) => {

        setProjects(res.data)

      })
  }

  useEffect(() => {

    fetchProjects()

  }, [])

  const createProject = async () => {
    if (!name.trim()) {
    alert("Project name is required")
    return
  }

    await axios.post(
      "http://localhost:9090/api/projects",
      {
        name,
        environment
      }
    )

    setName("")

    fetchProjects()
  }

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold">
        Projects
      </h1>

      <div className="mt-6 flex gap-4">

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Project Name"
          className="bg-black/30 border border-white/10 rounded-xl px-4 py-2"
        />

        <select
          value={environment}
          onChange={(e) =>
            setEnvironment(e.target.value)
          }
          className="bg-black/30 border border-white/10 rounded-xl px-4 py-2"
        >

          <option>
            development
          </option>

          <option>
            production
          </option>

        </select>

        <button
          onClick={createProject}
          className="px-4 py-2 rounded-xl bg-cyan-500"
        >
          Create
        </button>

      </div>

      <div className="mt-8 grid gap-4">

        {projects.map((project) => (

          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >

            <h3 className="text-xl font-bold">
              {project.name}
            </h3>

            <p className="mt-2 text-slate-400">
              {project.environment}
            </p>

            <p className="mt-3 text-cyan-400 break-all">
              {project.apiKey}
            </p>

          </Link>

        ))}

      </div>

    </div>
  )
}

export default Projects