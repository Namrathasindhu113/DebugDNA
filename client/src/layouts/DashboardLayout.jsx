import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

function DashboardLayout({ children }) {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem(
      "debugdna-user"
    ) || "{}"
  )

  const handleLogout = () => {

    localStorage.removeItem(
      "debugdna-user"
    )

    navigate("/login")
  }

  return (
    <div className="flex bg-[#050816] text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 overflow-y-auto">

        <div className="flex items-center justify-between px-10 py-6 border-b border-white/10">

          <div>

            <h2 className="text-xl font-semibold">
              Welcome,
              {" "}
              {user.name || "User"}
            </h2>

            <p className="text-slate-400 text-sm">
              DebugDNA AI Monitoring Platform
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            Logout
          </button>

        </div>

        <div className="p-10">
          {children}
        </div>

      </div>

    </div>
  )
}

export default DashboardLayout