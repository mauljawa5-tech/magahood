import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import HowItWorks from './components/HowItWorks'
import Identity from './components/Identity'
import Cities from './components/Cities'
import AICitizens from './components/AICitizens'
import TokenUtility from './components/TokenUtility'
import AdditionalDetails from './components/AdditionalDetails'
import Marketplace from './components/Marketplace'
import Roadmap from './components/Roadmap'
import Governance from './components/Governance'
import Community from './components/Community'
import Vision from './components/Vision'
import Footer from './components/Footer'
import ToastHost from './components/ui/Toast'
import ModalRoot from './components/modals/ModalRoot'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-void text-white">
        <Navbar />
        <main>
          <Hero />
          <Intro />
          <HowItWorks />
          <Identity />
          <Cities />
          <AICitizens />
          <TokenUtility />
          <AdditionalDetails />
          <Marketplace />
          <Roadmap />
          <Governance />
          <Community />
          <Vision />
        </main>
        <Footer />
        <ModalRoot />
        <ToastHost />
      </div>
    </AppProvider>
  )
}
