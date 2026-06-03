function DeploymentPanel() {

  const deployments = [
    {
      name: "Frontend Deployment",
      status: "SUCCESS",
      time: "2 mins ago",
    },
    {
      name: "Backend API Server",
      status: "RUNNING",
      time: "LIVE",
    },
    {
      name: "MongoDB Database",
      status: "STABLE",
      time: "99.9% uptime",
    },
    {
      name: "AI Analysis Engine",
      status: "ONLINE",
      time: "Realtime",
    },
  ]

  const getStatusColor = (status) => {

    if(status === "SUCCESS") {
      return "text-green-400 bg-green-500/10 border-green-500/20"
    }

    if(status === "RUNNING") {
      return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    }

    if(status === "STABLE") {
      return "text-blue-400 bg-blue-500/10 border-blue-500/20"
    }

    return "text-purple-400 bg-purple-500/10 border-purple-500/20"
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            Deployment Monitoring
          </h2>

          <p className="mt-2 text-slate-400">
            Live infrastructure and CI/CD observability
          </p>
        </div>

        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

      </div>

      <div className="mt-8 space-y-5">

        {deployments.map((deployment, index) => (

          <div
            key={index}
            className="flex items-center justify-between bg-black/20 border border-white/5 rounded-2xl p-5"
          >

            <div>
              <h3 className="font-semibold text-lg">
                {deployment.name}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {deployment.time}
              </p>
            </div>

            <div
              className={`px-4 py-2 rounded-full border text-sm font-semibold ${getStatusColor(deployment.status)}`}
            >
              {deployment.status}
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default DeploymentPanel