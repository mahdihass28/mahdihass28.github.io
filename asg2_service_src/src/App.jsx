import PortfolioBar from './components/PortfolioBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Booking from './components/Booking'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <PortfolioBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
export default App
