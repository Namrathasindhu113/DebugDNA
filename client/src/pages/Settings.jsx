import { ArrowLeft, Check, ChevronDown, Settings as SettingsIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Settings() {
  const navigate = useNavigate()

  return (
    <div className="p-6 md:p-8 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <button
            onClick={() => navigate(-1) || navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-cyan-400">
            Settings
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your workspace configuration and monitoring preferences
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          <Check size={16} />
          Save Changes
        </button>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Profile</p>
              <h2 className="mt-1 text-2xl font-semibold text-cyan-400">Workspace Owner</h2>
            </div>
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-300">
              Admin
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Name</p>
              <p className="mt-1 text-base text-white">Alex Morgan</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
              <p className="mt-1 text-base text-white">alex@debugdna.io</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Timezone</p>
              <p className="mt-1 text-base text-white">UTC-05:00</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">AI Configuration</p>
              <h2 className="mt-1 text-2xl font-semibold text-cyan-400">Model & Analysis</h2>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
              Connected
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Provider</p>
                <p className="mt-1 text-white">Groq AI</p>
              </div>
              <span className="text-cyan-300">Primary</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Response Mode</p>
                <p className="mt-1 text-white">Detailed Analysis</p>
              </div>
              <span className="text-cyan-300">Auto</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Confidence Threshold</p>
                <p className="mt-1 text-white">85%</p>
              </div>
              <span className="text-cyan-300">High</span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Notifications</p>
              <h2 className="mt-1 text-2xl font-semibold text-cyan-400">Alert Preferences</h2>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
              Enabled
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Email Alerts</p>
                <p className="mt-1 text-white">All critical incidents</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Slack / Teams</p>
                <p className="mt-1 text-white">On-call notifications</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-cyan-400" />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Digest</p>
                <p className="mt-1 text-white">Daily summary</p>
              </div>
              <span className="text-slate-300">08:00 UTC</span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Appearance</p>
              <h2 className="mt-1 text-2xl font-semibold text-cyan-400">Theme & Layout</h2>
            </div>
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-300">
              Dark Mode
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Theme</p>
                <p className="mt-1 text-white">DebugDNA Dark</p>
              </div>
              <ChevronDown size={18} className="text-slate-400" />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Density</p>
                <p className="mt-1 text-white">Comfortable</p>
              </div>
              <ChevronDown size={18} className="text-slate-400" />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div>
                <p className="text-sm text-slate-400">Accent</p>
                <p className="mt-1 text-white">Cyan</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-cyan-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">System Information</p>
              <h2 className="mt-1 text-2xl font-semibold text-cyan-400">Environment Status</h2>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
              Healthy
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-sm text-slate-400">Version</p>
              <p className="mt-1 text-white">v2.4.1</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-sm text-slate-400">Environment</p>
              <p className="mt-1 text-white">Production</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-sm text-slate-400">Last Sync</p>
              <p className="mt-1 text-white">2 min ago</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-sm text-slate-400">Region</p>
              <p className="mt-1 text-white">US-East</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Platform Health</p>
              <h2 className="mt-1 text-2xl font-semibold text-cyan-400">Service Status</h2>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
              Operational
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div className="flex items-center gap-3">
                <SettingsIcon size={18} className="text-cyan-400" />
                <div>
                  <p className="text-sm text-slate-400">API Gateway</p>
                  <p className="mt-1 text-white">99.98% uptime</p>
                </div>
              </div>
              <span className="text-emerald-300">Stable</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div className="flex items-center gap-3">
                <SettingsIcon size={18} className="text-cyan-400" />
                <div>
                  <p className="text-sm text-slate-400">WebSocket</p>
                  <p className="mt-1 text-white">Latency 42ms</p>
                </div>
              </div>
              <span className="text-emerald-300">Healthy</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 p-4">
              <div className="flex items-center gap-3">
                <SettingsIcon size={18} className="text-cyan-400" />
                <div>
                  <p className="text-sm text-slate-400">AI Engine</p>
                  <p className="mt-1 text-white">Queue 12 requests</p>
                </div>
              </div>
              <span className="text-amber-300">Moderate</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Settings