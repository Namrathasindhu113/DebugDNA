function AnalyticsKpiCard({ title, value }) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-slate-400">
        {title}
      </h3>

      <p className="text-3xl font-bold text-cyan-400 mt-2">
        {value}
      </p>
    </div>
  )
}

export default AnalyticsKpiCard