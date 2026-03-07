import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Concept from './components/Concept';
import { BlueTeamSection, RedTeamSection } from './components/TeamSection';
import FlagSystem from './components/FlagSystem';
import Timeline from './components/Timeline';
import WinConditions from './components/WinConditions';
import Footer from './components/Footer';
import Background from './components/Background';
import Register from './components/Register';
import LegalPage from './components/LegalPage';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import DeletedUsers from './pages/DeletedUsers';
import PageLogger from './components/PageLogger';
import DiscordHandler from './components/DiscordHandler';

const LandingPage = () => (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Concept />
        <div className="bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent">
          <BlueTeamSection />
        </div>
        <div className="bg-gradient-to-b from-transparent via-neon-red/5 to-transparent">
          <RedTeamSection />
        </div>
        <FlagSystem />
        <Timeline />
        <WinConditions />
        <Register />
      </main>
      <Footer />
    </>
);

function App() {
  return (
    <Router>
      <PageLogger />
      <DiscordHandler />
      <div className="relative min-h-screen">
        <Background />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/legal/:type" element={<LegalPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/deleted-users" element={<DeletedUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
