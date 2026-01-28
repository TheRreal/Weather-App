"use client"; // normally defaults to Server Comp but to implement useState need use client.
import styles from "./page.module.scss"; // Pulls the styling from SCSS.
import { useState } from "react"; // is here to remember info and re-render when necessary only on what changes..

export default function Home() {
  const unit = "°F"; // the default was Celcius but changed to F.
  const [weather, setWeather] = useState(null); // stores weather info.
  const [loading, setLoading] = useState(false); // The logic of the app.

  async function getWeather() {
    setLoading(true); // after clicked show 'loading' to show its working.
    try {
      // fetches/pulls the data from the weather station (API).
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-25.89&longitude=139.35&current_weather=true&temperature_unit=fahrenheit"
      );
      const data = await response.json();// almost like a translater | machine readable text to JS object that pulls from data.current_weather | converts json text to a JS object.
      
      setWeather(data.current_weather); // writing or recording the weather data
    } catch (error) {
      console.error("Fetch error:", error);//  logs an error instead of crashing if weather api is down.
    } finally {
      setLoading(false);   // make the Get LIve forecast button clickable again | interface resets itself to a usable state.
    } 
  }

  return (  // used className= b/c of SCSS instead of styles=
      <main className={styles.wrapper}>
      <div className={styles.card}> 
        <h1 className={styles.title}>Weather App</h1>
        <p className={styles.subtitle}>Current Location: London</p>
        
        <button 
          onClick={getWeather} // getWeather function is passed into the prop onClick and starts the retrieval process from the weather site.
          disabled={loading} // Prevent extra clicks after clicking button.
          className={styles.button}
        >
          {/* Show "Loading..." if busy, otherwise show the standard text. */}
          {loading ? "Loading..." : "Get Live Forecast"}
        </button>

        {/* Safety Check: Only show this section if we actually have data on our notepad. */}
        {weather && (
          <div className={styles.result}>
            <div className={styles.temp}>{weather.temperature}{unit}</div>
            <div className={styles.detail}>Wind: {weather.windspeed}mph</div>
          </div> 
        )}
      </div>
    </main>
  );
}