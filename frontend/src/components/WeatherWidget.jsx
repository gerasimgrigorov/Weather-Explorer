import { getWeatherIcon, toCelsius } from "../../utils/formulas";
import { Link, useNavigation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatLocation } from "../../utils/formulas";
import "../App.css";

export default function WeatherWidget({ location }) {
  const { address, days } = location;

  const currTempCelsius = Math.round(toCelsius(days[0].temp).toFixed(1));
  const currTempFahrenheit = Math.round(days[0].temp.toFixed(1));
  const currConditions = days[0].conditions;
  const { icon, className } = getWeatherIcon(currConditions);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="location-card">
      <div className={`weather-icon-main-page ${className}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="weather-info">
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>{formatLocation(address)}</div>
        <div style={{ fontSize: "16px" }}>
          {currTempCelsius}°C / {currTempFahrenheit}°F
        </div>
      </div>
      <div className="weather-button-more">
        <Link to={`/search?q=${encodeURIComponent(address)}`}>
          <button className="see-more-btn" type="button" disabled={isLoading}>
            See more
          </button>
        </Link>
      </div>
    </div>
  );
}
