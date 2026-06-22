function ProjectSelector({

  projects,

  selectedProject,

  setSelectedProject,

}) {

  return (

    <div className="flex items-center gap-4">

      <p className="text-slate-400">
        Active Project
      </p>

      <select
        value={selectedProject}
        onChange={(e) =>
          setSelectedProject(
            e.target.value
          )
        }
        className="
bg-[#0B1220]
text-white
border
border-cyan-400/40
rounded-xl
px-4
py-3
outline-none
focus:border-cyan-400
"
      >

        <option value="ALL">
          ALL PROJECTS
        </option>

        {projects.map((project) => (

          <option
            key={project.id}
            value={project.name}
          >

            {project.name}

          </option>

        ))}

      </select>

    </div>
  )
}

export default ProjectSelector