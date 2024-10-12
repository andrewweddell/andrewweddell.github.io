import React, { useContext } from 'react';
import { ThresholdContext } from '../context/ThresholdContext';

const Settings = () => {
  const { coldThreshold, warmThreshold, setColdThreshold, setWarmThreshold } = useContext(ThresholdContext);

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