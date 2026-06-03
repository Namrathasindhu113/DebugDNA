function StatsCard({
  title,
  value,
  statusColor,
}) {

  return (
    <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <div
        className={`absolute top-5 right-5 h-3 w-3 rounded-full ${statusColor} animate-pulse`}
      />

      <p className="text-slate-400">
        {title}
      </p>

      <h2 className="mt-5 text-2xl xl:text-3xl font-bold leading-tight">
        {value}
      </h2>

    </div>
  )
}

export default StatsCard