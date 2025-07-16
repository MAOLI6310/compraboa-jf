import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import SearchResults from '@/pages/SearchResults';
import Terms from '@/pages/Terms';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import Subscription from '@/pages/Subscription';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<SearchResults />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/assinatura" element={<Subscription />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;