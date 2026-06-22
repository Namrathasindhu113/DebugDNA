import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Activity,
  Settings,
  FolderKanban,
} from "lucide-react"
import { ClipboardList } from "lucide-react"

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Overview",
    path: "/dashboard",
  },

  {
    icon: <Activity size={20} />,
    label: "Analytics",
    path: "/analytics",
  },

  {
    icon: <FolderKanban size={20} />,
    label: "Projects",
    path: "/projects",
  },

  {
  icon: <ClipboardList size={20} />,
  label: "Audit Logs",
  path: "/audit-logs",
},

  {
    icon: <Settings size={20} />,
    label: "Settings",
    path: "/settings",
  },
]

function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-[280px] min-h-screen bg-white/5 border-r border-white/10 backdrop-blur-xl p-6">
      
      <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
        DebugDNA
      </h1>

      <div className="mt-14 space-y-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path)

          return (
            <Link
              key={index}
              to={item.path}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400"
              }`}
            >
              <span className={isActive ? "text-cyan-400" : "text-slate-300"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar