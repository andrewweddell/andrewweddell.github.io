import React, { useContext } from 'react';
import { ThresholdContext } from '../context/ThresholdContext';

import styles from './Settings.module.css';

const Settings = ({ closeModal }) => {
  const { coldThreshold, warmThreshold, setColdThreshold, setWarmThreshold } = useContext(ThresholdContext);

  const handleSave = () => {
    closeModal(); // Close the modal and save the current settings
  };

  return (
    <div className={styles.settingsContainer}>
      <header className={styles.settingsHeader}>
        <h1>Settings ⚙️</h1>
      </header>
      <section className={styles.thresholdsSection}>
        <h2>Personal Comfort Thresholds</h2>
        <div className={styles.thresholdControl}>
          <label htmlFor="coldThreshold">Cold Weather Threshold:</label>
          <input
            id="coldThreshold"
            type="range"
            min="0"
            max="20"
            value={coldThreshold}
            onChange={(e) => setColdThreshold(Number(e.target.value))}
          />
          <span>{coldThreshold}°C</span>
        </div>
        <div className={styles.thresholdControl}>
          <label htmlFor="warmThreshold">Warm Weather Threshold:</label>
          <input
            id="warmThreshold"
            type="range"
            min="20"
            max="40"
            value={warmThreshold}
            onChange={(e) => setWarmThreshold(Number(e.target.value))}
          />
          <span>{warmThreshold}°C</span>
        </div>
      </section>
      <button className={styles.saveButton} onClick={handleSave}>Save and Close</button>
    </div>
  );
};

export default Settings;
