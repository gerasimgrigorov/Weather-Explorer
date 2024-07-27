import axios from "axios";
import { useLoaderData, useParams } from "react-router-dom";
import { toCelsius } from "../../utils/formulas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import ForecastList from "../components/ForecastList";

export default function SingleWeatherPage() {
  const location = useLoaderData();
  console.log(location);
  // const places = [...response.data.locations]
  // render the places and the params
  // see what you will get and filter the places to get the info only for the current place and display the data
  // also think of other option to get the data
  //choose other weather info provider
  // const params = useParams()
  // const currLocation = places.filter(place => place.address === params.locationId)

  // const { address, name, days, timezone } = currLocation
  // let options = {
  //   timeZone: timezone,
  //   year: 'numeric',
  //   month: 'numeric',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  // }
  // make it give the time of the location
  // console.log(currLocation)

  return (
    <section className="single-weather-main">
      {/* <h1>Single Weather Page</h1> */}

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
        {/* <span class="day-weather-icon">
          <FontAwesomeIcon icon={faSun} />
        </span> */}
        <h3 className="align-start">Forecast for the next 7 days:</h3>
        <ForecastList days={location.days}/> {/* funckciq koqto opredelq iconata */}
        <h3 className="align-start">Other details:</h3>
        <span>wind presure sunset windspeed moisture</span>
      </div>
      {/* make an inferesting card with the rest of the application information like wind and sunrise or something  */}
      {/* then see how to send a request with the input serch and display 404 page if the requested location is not found */}
    </section>
  );
}

export async function loader({ params }) {
  const { locationId } = params;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const response = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationId}?key=${apiKey}`
  );
  return response.data;
}
