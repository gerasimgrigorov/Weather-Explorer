// src/pages/SingleWeatherPage.jsx
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { toCelsius, getWeatherIcon } from "../../utils/formulas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import Map from "../components/Map"; // Ensure this import points to your Map component
import ForecastList from "../components/ForecastList";
import SunriseSunsetWidget from "../components/details/SunriseSunsetWidget";
import UVWidget from "../components/details/UVWidget";
import WindSpeedWidget from "../components/details/WindSpeedWidget";
import HumidityWidget from "../components/details/HumidityWidget";
import { borderRadius } from "@mui/system";
import { useState } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    throw new Error("Query parameter 'q' is missing.");
  }

  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        query
      )}?key=${apiKey}`
    );
    return response.data;
  } catch (e) {
    throw new Error("Failed to fetch weather data.");
  }
}

export default function SingleWeatherPage() {
  const location = useLoaderData();

  const [isFavorited, setIsFavorited] = useState()
  const currHour = new Date().getHours();
  const currentWeather = location.days[0].hours[currHour];

  const currentTempCelsius = Math.round(toCelsius(currentWeather.feelslike));
  const currentTempFahrenheit = Math.round(currentWeather.feelslike);
  // const { icon, className } = getWeatherIcon(currentWeather.conditions);

  const sunrise = location.days[0].sunrise;
  const sunset = location.days[0].sunset;
  const uvIndex = currentWeather.uvindex;
  const windSpeed = currentWeather.windspeed;
  const humidity = currentWeather.humidity.toFixed(1);
  const visibility = currentWeather.visibility;
  const pressure = currentWeather.pressure;

  function handleFavorite(){
    setIsFavorited(prevState => !prevState)
  }

  return (
    <section className="single-weather-main">
      <div className="single-weather-card">
        <div style={{ textAlign: "start" }}>
          <span style={{ fontSize: "22px" }}>
            <FontAwesomeIcon icon={faLocationDot} />{" "}
          </span>{" "}
          <span className="single-location-name">
            {location.resolvedAddress}
          </span>
        </div>
        <div className="temperature-container">
          <span className="celsius">{currentTempCelsius}°C/</span>
          <span className="fahrenheit">{currentTempFahrenheit}°F</span>
          <span className="add-to-fav">
            <IconButton
              color="inherit"
              aria-label="add to fav"
              sx={{ padding: "2px", color: isFavorited ? "#ffea00" : "#242424" }}
              onClick={handleFavorite}
            >
              {isFavorited ? <StarIcon className="fav-icon" /> : <StarBorderIcon className="fav-icon" />}
            </IconButton>
          </span>
        </div>
        <h3 className="align-start">Forecast for the next 15 days:</h3>
        <ForecastList days={location.days} />{" "}
        <h3 className="align-start">Other details:</h3>
        <div className="widget-row">
          <SunriseSunsetWidget sunrise={sunrise} sunset={sunset} />
          <WindSpeedWidget windSpeed={windSpeed} />
          <UVWidget uvIndex={uvIndex} />
          <HumidityWidget humidity={humidity} />
        </div>
        <div className="map-widget">
          <h3 className="align-start">Location map:</h3>
          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            sx={{ borderRadius: "10px" }}
          />
        </div>
      </div>
    </section>
  );
}
