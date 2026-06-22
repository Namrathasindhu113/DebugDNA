function RecentActivity({ issues }) {

  const recentIssues =
    [...issues]
      .sort(
        (a, b) =>
          new Date(b.lastSeen) -
          new Date(a.lastSeen)
      )
      .slice(0, 5)

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <h2 className="text-xl font-bold text-cyan-400">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">

        {recentIssues.map((issue) => (

          <div
            key={issue.id}
            className="border-b border-white/10 pb-3"
          >

            <p className="font-medium text-white">
              {issue.title}
            </p>

            <p className="text-sm text-slate-400">
              {issue.status}
              {" • "}
              {issue.severity}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default RecentActivity