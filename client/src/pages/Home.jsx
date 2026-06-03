import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import BackgroundGlow from "../components/BackgroundGlow"
import GridBackground from "../components/GridBackground"
import MonitoringPanel from "../components/MonitoringPanel"
import IssueStream from "../components/IssueStream"
import TerminalPreview from "../components/TerminalPreview"
import SystemScanner from "../components/SystemScanner"

function Home() {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <GridBackground />
      <BackgroundGlow />

      <Navbar />
      <Hero />
      <MonitoringPanel />
      <IssueStream />
      <TerminalPreview />
      <SystemScanner />
    </div>
  )
}

export default Home