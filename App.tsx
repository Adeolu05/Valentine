import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './components/layout/AppLayout';
import LandingView, { HeroSection, StorySection, GallerySection } from './components/views/LandingView';
import CreateCardView from './components/views/CreateCardView';
import ProposalView from './components/views/ProposalView';
import SuccessView from './components/views/SuccessView';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingView />} />
          <Route path="/story" element={<StorySection />} />
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/proposal" element={<ProposalView />} />
          <Route path="/create" element={<CreateCardView />} />
          <Route path="/success" element={<SuccessView />} />
          <Route path="/map" element={<div className="pt-40 text-center text-4xl font-display">Map Interface Loading...</div>} />
          <Route path="/guestbook" element={<div className="pt-40 text-center text-4xl font-display">Guestbook indexing...</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <AnimatedRoutes />
  </Router>
);

export default App;
