import { useState } from "react"
import axios from "axios"

function IssueForm({ refreshIssues }) {

  const [title, setTitle] = useState("")
  const [severity, setSeverity] = useState("MEDIUM")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await axios.post(
        "http://localhost:9090/api/issues",
        {
          title,
          severity,
          description,
        }
      )

      setTitle("")
      setSeverity("MEDIUM")
      setDescription("")

      refreshIssues()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

      <h2 className="text-3xl font-bold">
        Report New Issue
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
        />

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
        />

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 transition"
        >
          Analyze Issue
        </button>

      </form>

    </div>
  )
}

export default IssueForm