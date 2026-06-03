import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {

    try {

      await axios.post(
        "http://localhost:9090/api/auth/signup",
        {
          name,
          email,
          password
        }
      )

      navigate("/login")

    } catch (err) {

      alert(
        "Signup failed"
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 w-[400px]">

        <h1 className="text-4xl font-bold text-cyan-400">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full mt-6 p-4 rounded-xl bg-black/30 border border-white/10"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full mt-4 p-4 rounded-xl bg-black/30 border border-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full mt-4 p-4 rounded-xl bg-black/30 border border-white/10"
        />

        <button
          onClick={handleSignup}
          className="w-full mt-6 p-4 rounded-xl bg-cyan-500"
        >
          Signup
        </button>

      </div>

    </div>
  )
}

export default Signup