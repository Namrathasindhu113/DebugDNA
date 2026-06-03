import { Link } from "react-router-dom"
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Settings,
  FolderKanban,
} from "lucide-react"

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Overview",
    path: "/dashboard",
  },
  {
    icon: <Activity size={20} />,
    label: "Monitoring",
    path: "/dashboard",
  },
  {
    icon: <AlertTriangle size={20} />,
    label: "Issues",
    path: "/dashboard",
  },
  {
    icon: <FolderKanban size={20} />,
    label: "Projects",
    path: "/projects",
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    path: "/settings",
  },
]

function Sidebar() {
  return (
    <div className="w-[280px] min-h-screen bg-white/5 border-r border-white/10 backdrop-blur-xl p-6">
      
      <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
        DebugDNA
      </h1>

      <div className="mt-14 space-y-4">
        {menuItems.map((item, index) => (
        <Link
  key={index}
  to={item.path}
  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition"
>
  {item.icon}
  {item.label}
</Link>  
        ))}
      </div>
    </div>
  )
}

export default Sidebar