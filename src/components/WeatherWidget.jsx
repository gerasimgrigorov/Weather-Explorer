import { getWeatherIcon, toCelsius } from "../../utils/formulas";
import { Link, useNavigation } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WeatherWidget({ location }) {
  const { address, days } = location;

  const currTempCelsius = Math.round(toCelsius(days[0].temp).toFixed(1))
  const currTempFahrenheit = Math.round(days[0].temp.toFixed(1));
  const currConditions = days[0].conditions;
  const { icon, className } = getWeatherIcon(currConditions);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="location-card">
      <div>
        <h1 className={`weather-icon-main-page ${className}`}>
          <FontAwesomeIcon icon={icon} />
        </h1>
      </div>
      <div style={{fontSize:"20px"}}>{address}</div>
      <div style={{ margin: "0 0.3em", fontSize: "18px" }}>
        {currTempCelsius}°C/ {currTempFahrenheit}°F
      </div>{" "}
      <div style={{ marginTop: "0.6em", marginBottom: "0.8em" }}>
        <Link to={`/search?q=${encodeURIComponent(address)}`}>
          <button className="see-more-btn" type="button" disabled={isLoading}>
            See more
          </button>
        </Link>
      </div>
    </div>
  );
}
