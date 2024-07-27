import { getWeatherIcon, toCelsius, weatherChooser } from "../../utils/formulas";
import { Link } from "react-router-dom";
import '../App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WeatherWidget({ location }) {
  const { address, days } = location
  const currTempCelsius = toCelsius(days[0].temp).toFixed(1)
  const currTempFahrenheit = days[0].temp.toFixed(1)
  const currConditions = days[0].conditions
  const {icon, className} = getWeatherIcon(currConditions)

  return (
    <div className="location-card">
      <div><h1 className={`weather-icon-main-page ${className}`}><FontAwesomeIcon icon={icon}/></h1></div>
      <div>{address}</div>
      <div style={{margin: '0 0.3em'}}>
        {currTempCelsius} °C/{" "}
        {currTempFahrenheit} °F
      </div>{" "}
      <div style={{ marginTop: '0.6em', marginBottom: '0.8em'}}>
        <Link to={`/weather/${address}`}><button className="see-more-btn" type="button">See more</button></Link>
      </div>
    </div>
  );
}
