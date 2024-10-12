import React from 'react';

const Settings = () => {
  return (
    <div>
      <header>
        <h1>Settings ⚙️</h1>
      </header>
      <section>
        <h2>Personal Comfort Thresholds</h2>
        <label>Cold Weather Threshold: <input type="range" min="0" max="20" /></label>
        <label>Warm Weather Threshold: <input type="range" min="20" max="40" /></label>
      </section>
      <section>
        <h2>Saved Locations</h2>
        <p>No saved locations yet.</p>
      </section>
    </div>
  );
};

export default Settings;