import { toCelsius, getDayOfWeek, getWeatherIcon } from "../../utils/formulas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SingleTempBadge({ day }) {
  const {icon, className } = getWeatherIcon(day.conditions)

  return (
    <div>
      <li className="single-weather-day-summary">
        <div>
          <span>{getDayOfWeek(day.datetime)}</span>
        </div>
        <div>{toCelsius(day.temp).toFixed(1)}°C</div>
        <div>
          <span className={`weather-icon ${className}`}>
            <FontAwesomeIcon icon={icon} />
          </span>
        </div>
        <div>
          <span>{day.conditions}</span>
        </div>
      </li>
    </div>
  );
}

// Partially cloudy
// Clear
// Overcast
// Clear
// Rain, Partially cloudy
// Rain, Overcast
