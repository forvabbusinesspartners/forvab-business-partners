import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Footer from './components/Footer'
import Terms from './pages/Terms'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-ink text-neutral-300">
      <Header />
      <main>
        <Terms />
      </main>
      <Footer />
    </div>
  </StrictMode>,
)
