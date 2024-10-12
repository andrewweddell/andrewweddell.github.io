import React, { createContext, useState, useCallback } from 'react';
export const ThresholdContext = createContext();

export const ThresholdProvider = ({ children }) => {
  const [coldThreshold, setColdThreshold] = useState(() => {
    const savedCold = localStorage.getItem('coldThreshold');
    return savedCold !== null ? Number(savedCold) : 10; // Default to 10°C if no saved value
  });

  const [warmThreshold, setWarmThreshold] = useState(() => {
    const savedWarm = localStorage.getItem('warmThreshold');
    return savedWarm !== null ? Number(savedWarm) : 20; // Default to 20°C if no saved value
  });

  const saveColdThreshold = useCallback((value) => {
    setColdThreshold(value);
    localStorage.setItem('coldThreshold', value);
  }, []);

  const saveWarmThreshold = useCallback((value) => {
    setWarmThreshold(value);
    localStorage.setItem('warmThreshold', value);
  }, []);

  return (
    <ThresholdContext.Provider
      value={{
        coldThreshold,
        warmThreshold,
        setColdThreshold: saveColdThreshold,
        setWarmThreshold: saveWarmThreshold,
      }}
    >
      {children}
    </ThresholdContext.Provider>
  );
};
