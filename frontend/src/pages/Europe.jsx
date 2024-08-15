import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherWidget from "../components/WeatherWidget";
import WeatherList from "../components/WeatherList";
import CircularProgress from "@mui/material/CircularProgress";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CACHE_KEY = "europeWeatherData";
const CACHE_EXP = 3600000;

function isCacheValid(cachedData) {
  if (!cachedData) return false;
  const { timeCached } = cachedData;
  const now = new Date().getTime();
  return now - timeCached < CACHE_EXP;
}

export async function loader() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

  if (isCacheValid(cachedData)) {
    return cachedData.data;
  } else {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelinemulti?key=${apiKey}&locations=Paris%2CFrance%7CBerlin%2CGermany%7CRome%2CItaly%7CMadrid%2CSpain`
      );
      const dataToCache = {
        timeCached: new Date().getTime(),
        data: response.data,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
      return response.data;
    } catch (e) {
      console.error("Failed to fetch the weather data for Europe.", e);
      throw new Error("Failed to fetch the weather data for Europe.");
    }
  }
}

export default function EuropePage() {
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loader()
      .then((data) => setPlaces(data.locations))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="europe-page">
      <h2>Weather in Europe</h2>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <WeatherList>
            {places &&
              places.map((place) => (
                <WeatherWidget key={place.latitude} location={place} />
              ))}
          </WeatherList>

          <MapContainer center={[48.8566, 2.3522]} zoom={4} style={{ height: "500px", marginTop: "2em" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {places &&
              places.map((place) => (
                <Marker key={place.latitude} position={[place.latitude, place.longitude]}>
                  <Popup>
                    <div>
                      <h3>{place.name}</h3>
                      {/* <p>{place.currentConditions.temp}°C, {place.currentConditions.conditions}</p> */}
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </>
      )}
    </div>
  );
}
