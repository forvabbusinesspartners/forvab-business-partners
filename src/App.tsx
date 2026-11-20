import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyChoose from './components/WhyChoose'
import Approach from './components/Approach'
import PartnershipForm from './components/PartnershipForm'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-neutral-300">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Approach />
        <PartnershipForm />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
