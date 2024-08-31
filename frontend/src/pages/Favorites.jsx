import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import Modal from "../components/Modal";
import WeatherWidget from "../components/WeatherWidget";
import WeatherList from "../components/WeatherList";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function Favorites() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const result = await axios.get("/api/user/favorites", {
          withCredentials: true,
        });
        const locations = result.data;
        console.log("Locations in the favorite: ", locations);

        const weatherDataPromises = locations.map(async (location) => {
          const { latitude, longitude, address } = location;
          const weatherResult = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${apiKey}`
          );

          return { ...weatherResult.data, address, latitude, longitude };
        });

        const weatherData = await Promise.all(weatherDataPromises);

        setFavorites(weatherData);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error loading favorite locations or weather data:",
          error
        );
        setError("Failed to load favorite locations.");
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  const handleClose = () => {
    navigate("../");
  };

  if (loading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading favorites...</p>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={handleClose}>
        <p>{error}</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className="favorite-locations-list">
        <h3 className="favorite-locations-title">Your Favorite Locations</h3>
        <WeatherList>
          {favorites.length > 0 ? (
            favorites.map((location, index) => (
              <WeatherWidget key={index} location={location} />
            ))
          ) : (
            <p style={{marginLeft: "0.5em"}}>No favorite locations saved yet.</p>
          )}
          <button
            onClick={handleClose}
            className="favorite-locations-close-button"
          >
            Close
          </button>
        </WeatherList>
      </div>
    </Modal>
  );
}
