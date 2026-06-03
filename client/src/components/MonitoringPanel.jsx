import StatusCard from "./StatusCard"

function MonitoringPanel() {
  return (
    <div className="mt-28 px-6 md:px-10 relative z-10">
      
      <div className="mb-10 text-center">
        <p className="text-cyan-400 tracking-[0.3em] uppercase text-sm">
          Live Monitoring
        </p>

        <h2 className="mt-3 text-4xl md:text-5xl font-bold">
          Real-Time Development Intelligence
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <StatusCard
          title="Active Projects"
          value="12"
          status="active"
        />

        <StatusCard
          title="Detected Issues"
          value="34"
          status="active"
        />

        <StatusCard
          title="AI Analysis Engine"
          value="ONLINE"
          status="active"
        />

        <StatusCard
          title="Deployment Health"
          value="92%"
          status="active"
        />
      </div>
    </div>
  )
}
export default MonitoringPanel