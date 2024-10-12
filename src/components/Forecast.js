import React from 'react';

const Forecast = () => {
  return (
    <div>
      <header>
        <h1>Weather Forecast 📅</h1>
      </header>
      <section>
        <h2>Upcoming Weather</h2>
        <div className="forecast-timeline">
          <p>Next few hours: TBD</p>
        </div>
      </section>
      <section>
        <h2>Clothing Suggestions</h2>
        <div className="forecast-clothing">
          <p>Clothing for later: TBD</p>
        </div>
      </section>
    </div>
  );
};

export default Forecast;