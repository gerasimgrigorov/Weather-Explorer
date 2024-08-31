import React from "react";
import { useLoaderData } from "react-router-dom";
import WeatherWidget from "../components/WeatherWidget";
import axios from "axios";
import WeatherList from "../components/WeatherList";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Europe&UK.css"; // Import the CSS file for styling
import { formatLocation } from "../../utils/formulas";

export async function loader() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const cachedData = JSON.parse(localStorage.getItem("ukWeatherData"));

  const CACHE_EXP = 3600000;
  const now = new Date().getTime();

  if (cachedData && now - cachedData.timeCached < CACHE_EXP) {
    return cachedData.data;
  } else {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelinemulti?key=${apiKey}&locations=Edinburgh%2CUK%7CManchester%2CUK%7CBristol%2CUK%7CCardiff%2CUK`
    );
    const dataToCache = {
      timeCached: new Date().getTime(),
      data: response.data,
    };
    localStorage.setItem("ukWeatherData", JSON.stringify(dataToCache));
    return response.data;
  }
}

export default function UKPage() {
  const data = useLoaderData();

  if (!data) {
    return (
      <div className="uk-page-widget">
        <h2 className="uk-page__title">Weather in the UK</h2>
        <p>Failed to load weather data. Please try again later.</p>
      </div>
    );
  }

  const places = [...data.locations];

  return (
    <>
      <div className="uk-page-widget">
        <h2 className="uk-page__title">Weather in the UK</h2>
        <div className="uk-page-content">
          <MapContainer
            center={[53.483959, -2.244644]}
            zoom={5.5}
            style={{ height: "500px", width: "100%", borderRadius: "8px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {places &&
              places.map((place) => (
                <Marker
                  key={place.latitude}
                  position={[place.latitude, place.longitude]}
                >
                  <Popup>
                    <div>
                      <a href={`/search?q=${encodeURIComponent(place.address)}`}><h3>{formatLocation(place.address)}</h3></a>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
      <div style={{ margin: "0 10px" }}>
        <WeatherList>
          {places &&
            places.map((place) => (
              <WeatherWidget key={place.latitude} location={place} />
            ))}
        </WeatherList>
      </div>
    </>
  );
}
