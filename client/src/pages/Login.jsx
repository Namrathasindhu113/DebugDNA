import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:9090/api/auth/login",
        {
          email,
          password
        }
      )

      if (
        response.data.message ===
        "Login successful"
      ) {

        localStorage.setItem(
          "debugdna-user",
          JSON.stringify(response.data)
        )

        navigate("/dashboard")
      }

      else {

        alert(
          response.data.message
        )
      }

    } catch (err) {

      alert(
        "Login failed"
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 w-[400px]">

        <h1 className="text-4xl font-bold text-cyan-400">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full mt-6 p-4 rounded-xl bg-black/30 border border-white/10"
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
          onClick={handleLogin}
          className="w-full mt-6 p-4 rounded-xl bg-cyan-500"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default Login