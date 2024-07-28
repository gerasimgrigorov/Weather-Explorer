// src/pages/SingleWeatherPage.jsx
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { toCelsius } from "../../utils/formulas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import ForecastList from "../components/ForecastList";
import SunriseSunsetWidget from "../components/details/SunriseSunsetWidget";
import UVWidget from "../components/details/UVWidget";
import WindSpeedWidget from "../components/details/WindSpeedWidget";
import HumidityWidget from "../components/details/HumidityWidget";

export default function SingleWeatherPage() {
  const location = useLoaderData();
  console.log(location);

  // Dummy data
  const sunrise = "06:00";
  const sunset = "20:00";
  const uvIndex = 5;
  const windSpeed = 15;
  const humidity = 65;

  return (
    <section className="single-weather-main">
      <div className="single-weather-card">
        <div className="single-weather-header">
          <span style={{ fontSize: "20px" }}>
            <FontAwesomeIcon icon={faLocationDot} />{" "}
          </span>{" "}
          <span className="single-location-name">
            {location.resolvedAddress}
          </span>
        </div>
        <div className="align-start">
          <span className="celsius">
            {toCelsius(location.days[0].temp).toFixed(1)}°C/
          </span>
          <span className="fahrenheit"> {location.days[0].temp}°F</span>
        </div>
        <h3 className="align-start">Forecast for the next 7 days:</h3>
        <ForecastList days={location.days} />{" "}
        <h3 className="align-start">Other details:</h3>
        <div className="widget-row">
          <SunriseSunsetWidget sunrise={sunrise} sunset={sunset} />
          <UVWidget uvIndex={uvIndex} />
          <WindSpeedWidget windSpeed={windSpeed} />
          <HumidityWidget humidity={humidity} />
        </div>
      </div>
    </section>
  );
}

export async function loader({ params }) {
  const { locationId } = params;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const response = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationId}?key=${apiKey}`
  );
  return response.data;
}
