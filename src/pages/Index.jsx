import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import WeatherWidget from "../components/WeatherWidget";
import WeatherList from "../components/WeatherList";
import SearchInput from "../components/SearchInput";

export default function IndexPage() {
  const response = useLoaderData();
  const [open, setOpen] = useState(false)

  const places = [...response.data.locations];
  // console.log(places)

  const navigation = useNavigation();
  // console.log(navigation.state);

  return (
    <div className="">
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          No results found.
        </Alert>
      </Collapse>

      <h2>
        Wellcome to{" "}
        <span style={{ textDecoration: "underline" }}>weather4me.com</span>!
      </h2>
      <h3>
        <em>Explore the weather around the word.</em>
      </h3>

      <div className="search-input">
        <SearchInput places={places} />
      </div>

      <h3>Popular destination around the world.</h3>

      <WeatherList>
        {places.map(place => <WeatherWidget key={place.latitude} location={place} />)}
      </WeatherList>
    </div>
  );
}

export async function loader() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  return await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelinemulti?key=${apiKey}&locations=New%20York%2CUSA%7CLondon%2CUK%7CParis%2CFrance%7CTokyo%2CJapan%7CSydney%2CAustralia&locationNames=New%20York%7CLondon%7CParis%7CTokyo%7CSydney`
  );
}
