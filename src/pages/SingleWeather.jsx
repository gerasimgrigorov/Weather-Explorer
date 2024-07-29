// src/pages/SingleWeatherPage.jsx
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { toCelsius } from "../../utils/formulas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';

import ForecastList from "../components/ForecastList";
import SunriseSunsetWidget from "../components/details/SunriseSunsetWidget";
import UVWidget from "../components/details/UVWidget";
import WindSpeedWidget from "../components/details/WindSpeedWidget";
import HumidityWidget from "../components/details/HumidityWidget";

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
  const currHour = new Date().getHours();
  const currentTempHours = location.days[0].hours[currHour].feelslike;

  // console.log(currentTempHours)
  // console.log(currHour)
  // console.log(location)

  const sunrise = location.days[0].sunrise;
  const sunset = location.days[0].sunset;
  const uvIndex = location.days[0].uvindex;
  const windSpeed = location.days[0].windspeed;
  const humidity = location.days[0].humidity;

  return (
    <section className="single-weather-main">
      <div className="single-weather-card">
        <div style={{ textAlign: "start" }}>
          <span style={{ fontSize: "20px" }}>
            <FontAwesomeIcon icon={faLocationDot} />{" "}
          </span>{" "}
          <span className="single-location-name">
            {location.resolvedAddress}
            {/* <span className="add-to-fav">
              <IconButton color="#ffea00" aria-label="add to fav" sx={{padding: "2px"}}>
                <StarBorderIcon />
              </IconButton>
            </span> */}
          </span>
        </div>
        <div style={{ textAlign: "start" }}>
          <span className="celsius">
            {Math.round(toCelsius(currentTempHours))}°C/
          </span>
          <span className="fahrenheit"> {Math.round(currentTempHours)}°F</span>
        </div>
        <h3 className="align-start">Forecast for the next 7 days:</h3>
        <ForecastList days={location.days} />{" "}
        <h3 className="align-start">Other details:</h3>
        <div className="widget-row">
          <SunriseSunsetWidget sunrise={sunrise} sunset={sunset} />
          <WindSpeedWidget windSpeed={windSpeed} />
          <UVWidget uvIndex={uvIndex} />
          <HumidityWidget humidity={humidity} />
        </div>
      </div>
    </section>
  );
}
