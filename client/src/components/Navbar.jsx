import { useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  return (
    <nav className="w-full flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-md">

      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        DebugDNA
      </h1>

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-full border border-cyan-400/40 hover:bg-cyan-400/10 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition"
        >
          Get Started
        </button>

      </div>

    </nav>
  )
}

export default Navbar