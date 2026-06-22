import { useState } from "react"

function CollapsibleSection({
  title,
  children
}) {

  const [open, setOpen] =
    useState(false)

  return (

    <div className="bg-white/5 border border-white/10 rounded-2xl">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="w-full p-5 text-left font-semibold text-cyan-400"
      >
        {open ? "▼" : "▶"} {title}
      </button>

      {open && (

        <div className="p-5">
          {children}
        </div>

      )}

    </div>

  )
}

export default CollapsibleSection
