import { useState } from "react"
import axios from "axios"

function AIChat() {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {

    if (!message.trim()) return

    const userMessage = {
      sender: "user",
      text: message,
    }

    setChat((prev) => [
      ...prev,
      userMessage
    ])

    setLoading(true)

    try {

      const response = await axios.post(
        "http://localhost:9090/api/ai/chat",
        {
          prompt: message
        }
      )

      const aiMessage = {
        sender: "ai",
        text: response.data.response,
      }

      setChat((prev) => [
        ...prev,
        aiMessage
      ])

    } catch (error) {

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "AI service unavailable."
        }
      ])

    }

    setLoading(false)
    setMessage("")
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

      <h2 className="text-3xl font-bold">
        AI Debug Assistant
      </h2>

      <div className="mt-6 h-[450px] overflow-y-auto space-y-4 pr-2">

        {chat.map((msg, index) => (

          <div
            key={index}
            className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-line ${
              msg.sender === "user"
                ? "ml-auto bg-cyan-500 text-white"
                : "bg-white/10 text-slate-200"
            }`}
          >
            {msg.text}
          </div>

        ))}

        {loading && (

          <div className="bg-white/10 text-slate-300 px-4 py-3 rounded-2xl w-fit animate-pulse">
            AI analyzing...
          </div>

        )}

      </div>

      <div className="mt-6 flex gap-4">

        <input
          type="text"
          placeholder="Ask DebugDNA AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
        />

        <button
          onClick={handleSend}
          className="px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 transition"
        >
          Send
        </button>

      </div>

    </div>
  )
}

export default AIChat