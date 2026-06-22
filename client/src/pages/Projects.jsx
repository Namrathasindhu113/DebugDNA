import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Projects() {

  const [projects, setProjects] = useState([])

  const [name, setName] = useState("")

  const [environment, setEnvironment] =
    useState("development")

  const [framework, setFramework] =
  useState("")

const [language, setLanguage] =
  useState("")

const [repositoryUrl, setRepositoryUrl] =
  useState("")

const [techStack, setTechStack] =
  useState("")  

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
    environment,
    framework,
    language,
    repositoryUrl,
    techStack
  }
)

    setName("")

    setFramework("")
setLanguage("")
setRepositoryUrl("")
setTechStack("")

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

        <input
  value={framework}
  onChange={(e) =>
    setFramework(e.target.value)
  }
  placeholder="Framework (React, Spring Boot...)"
  className="bg-black/30 border border-white/10 rounded-xl px-4 py-2"
/>

<input
  value={language}
  onChange={(e) =>
    setLanguage(e.target.value)
  }
  placeholder="Language (Java, JavaScript...)"
  className="bg-black/30 border border-white/10 rounded-xl px-4 py-2"
/>

<input
  value={repositoryUrl}
  onChange={(e) =>
    setRepositoryUrl(e.target.value)
  }
  placeholder="Repository URL"
  className="bg-black/30 border border-white/10 rounded-xl px-4 py-2"
/>

<input
  value={techStack}
  onChange={(e) =>
    setTechStack(e.target.value)
  }
  placeholder="Tech Stack (React, MongoDB...)"
  className="bg-black/30 border border-white/10 rounded-xl px-4 py-2"
/>

        <button
          onClick={createProject}
          className="px-4 py-2 rounded-xl bg-cyan-500"
        >
          Create
        </button>

      </div>

      <div className="mt-8">
        {projects.length === 0 ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-cyan-400/20 bg-white/5 p-10 text-center">
            <p className="text-xl font-semibold text-cyan-400">
              No projects created yet
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
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

                <p className="text-slate-400">
                  Framework: {project.framework}
                </p>

                <p className="text-slate-400">
                  Language: {project.language}
                </p>

                <p className="text-slate-400">
                  Tech Stack: {project.techStack}
                </p>

                <p className="mt-3 text-cyan-400 break-all">
                  {project.apiKey}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Projects