import {
  faSun,
  faCloudSun,
  faCloud,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";

export function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

export function weatherChooser(weather) {
  if (weather > 20) {
    return "good";
  }
}

export function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

export function getWeatherIcon(condition) {
  if (condition.includes("Rain")) {
    return { icon: faCloudShowersHeavy, className: "weather-icon-rain" };
  } else if (condition.includes("Overcast")) {
    return { icon: faCloud, className: "weather-icon-overcast" };
  } else if (condition.includes("Partially cloudy")) {
    return { icon: faCloudSun, className: "weather-icon-partially-cloudy" };
  } else if (condition.includes("Clear")) {
    return { icon: faSun, className: "weather-icon-clear" };
  } else {
    return { icon: faSun, className: "weather-icon-default" }; // Default icon
  }
}

export function formatLocation(location) {
  return location.replace(/,/g, ', ');
}
