import { Bell } from "lucide-react"
import { useState } from "react"

function NotificationBell({ notifications }) {

  const [open, setOpen] = useState(false)

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative"
      >
        <Bell size={24} />

        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-[#0B1220] border border-white/10 rounded-2xl p-4 z-50">

          <h3 className="font-bold text-cyan-400 mb-4">
            Notifications
          </h3>

          {notifications.map((n, index) => (
            <div
              key={index}
              className="border-b border-white/10 py-3"
            >
              {n}
            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default NotificationBell