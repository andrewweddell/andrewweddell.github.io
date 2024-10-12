import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Settings from './components/Settings';
import Forecast from './components/Forecast';
import { ThresholdProvider } from './context/ThresholdContext';

function App() {
  return (
    <ThresholdProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forecast" element={<Forecast />} />
        </Routes>
      </Router>
    </ThresholdProvider>
  );
}

export default App;