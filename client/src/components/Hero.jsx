import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

function Hero() {

  const navigate = useNavigate()

  const launchDashboard = () => {

    const user =
      localStorage.getItem(
        "debugdna-user"
      )

    if (user) {

      navigate("/dashboard")

    } else {

      navigate("/login")

    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 pt-28">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <p className="mb-4 text-cyan-400 tracking-[0.3em] uppercase text-sm">
          AI Developer Intelligence
        </p>

        <h1 className="text-7xl md:text-8xl font-black leading-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-600 bg-clip-text text-transparent">
          DebugDNA
        </h1>

        <p className="mt-6 max-w-2xl text-slate-400 text-lg leading-relaxed">
          Automatically monitor development workflows, detect failures,
          analyze root causes, and get AI-powered debugging assistance
          in real time.
        </p>

        <div className="mt-10 flex gap-4 justify-center">

          <button
            onClick={launchDashboard}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition"
          >
            Launch Dashboard
          </button>

          <button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
              })
            }
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition"
          >
            Live Demo
          </button>

        </div>

      </motion.div>
    </div>
  )
}

export default Hero