import React, { createContext, useState, useEffect } from 'react';

export const ThresholdContext = createContext();

export const ThresholdProvider = ({ children }) => {
  const [coldThreshold, setColdThreshold] = useState(10);
  const [warmThreshold, setWarmThreshold] = useState(20);

  useEffect(() => {
    const savedColdThreshold = localStorage.getItem('coldThreshold');
    const savedWarmThreshold = localStorage.getItem('warmThreshold');
    if (savedColdThreshold) setColdThreshold(Number(savedColdThreshold));
    if (savedWarmThreshold) setWarmThreshold(Number(savedWarmThreshold));
  }, []);

  useEffect(() => {
    localStorage.setItem('coldThreshold', coldThreshold);
    localStorage.setItem('warmThreshold', warmThreshold);
  }, [coldThreshold, warmThreshold]);

  return (
    <ThresholdContext.Provider value={{ coldThreshold, warmThreshold, setColdThreshold, setWarmThreshold }}>
      {children}
    </ThresholdContext.Provider>
  );
};