import React from 'react';
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

function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
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
    </div>
  );
}

export default App;
