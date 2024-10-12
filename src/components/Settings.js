import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [coldThreshold, setColdThreshold] = useState(10);
  const [warmThreshold, setWarmThreshold] = useState(20);

  // Load thresholds from local storage when the component mounts
  useEffect(() => {
    const savedColdThreshold = localStorage.getItem('coldThreshold');
    const savedWarmThreshold = localStorage.getItem('warmThreshold');
    if (savedColdThreshold) setColdThreshold(Number(savedColdThreshold));
    if (savedWarmThreshold) setWarmThreshold(Number(savedWarmThreshold));
  }, []);

  // Save thresholds to local storage when they change
  useEffect(() => {
    localStorage.setItem('coldThreshold', coldThreshold);
    localStorage.setItem('warmThreshold', warmThreshold);
  }, [coldThreshold, warmThreshold]);

  return (
    <div>
      <header>
        <h1>Settings ⚙️</h1>
      </header>
      <section>
        <h2>Personal Comfort Thresholds</h2>
        <label>
          Cold Weather Threshold: 
          <input
            type="range"
            min="0"
            max="20"
            value={coldThreshold}
            onChange={(e) => setColdThreshold(Number(e.target.value))}
          />
          {coldThreshold}°C
        </label>
        <br />
        <label>
          Warm Weather Threshold: 
          <input
            type="range"
            min="20"
            max="40"
            value={warmThreshold}
            onChange={(e) => setWarmThreshold(Number(e.target.value))}
          />
          {warmThreshold}°C
        </label>
      </section>
      <section>
        <h2>Saved Locations</h2>
        <p>No saved locations yet.</p>
      </section>
    </div>
  );
};

export default Settings;