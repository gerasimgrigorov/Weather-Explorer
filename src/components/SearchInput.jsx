import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

const filter = createFilterOptions();
let topLocations = [];

export default function SearchInput({ places, setOpen }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [value, setValue] = React.useState(null);

  console.log(value);

  places.map((place) =>
    topLocations.push({ title: place.address, timeZone: place.timezone })
  );

  async function fetchWeather(location) {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=CCBXZ6PRHD64ZKUNKTPZS5TKY`
      );
      console.log(location);
      navigate(`/weather/${location}`);
      console.log(response.data);
      return response;
    } catch (e) {
      throw new Error("An error occured");
    }
  }

  async function handleChange(event, newValue) {
    if (typeof newValue === "string") {
      setValue({ title: newValue });
      await fetchWeather(newValue); // Fetch weather when a string is selected
    } else if (newValue && newValue.inputValue) {
      setValue({ title: newValue.inputValue });
      fetchWeather(newValue.inputValue); // Fetch weather for new input
    } else {
      setValue(newValue);
      if (newValue) {
        fetchWeather(newValue.title); // Fetch weather for selected option
      }
    }
  }

  // fixnata e tursachkata za dadeni locacii, ostava samo da prenasochish i rendernesh nujnite neshta na ekrana i da napravish stylinga

  return (
    <Autocomplete
      value={value}
      disabled={navigation.state === "loading" ? true : false}
      onChange={handleChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Search for "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={topLocations}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.title}
          </li>
        );
      }}
      sx={{ width: "auto" }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            navigation.state === "loading"
              ? "Loading..."
              : "Enter a location to view the weather forecast"
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.3)", // 50% transparent border color
                borderWidth: "2px", // 2px border width
                borderRadius: "10px",
                transition: "0.5s ease"
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)", // Border color on hover
                borderWidth: "2px", // Border width on hover
                transition: "0.5s ease"
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 255, 255, 0.6)", // Border color when focused
                borderWidth: "2px", // Border width when focused
              },
            },
            "& .MuiInputBase-input": {
              color: "white", // White text color
            },
            "& .MuiFormLabel-root": {
              color: "rgba(255, 255, 255, 0.2)", // White label color
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "rgba(255, 255, 255, 0.5)", // White label color when focused
            },
          }}
        />
      )}
    />

    // sx={{
    //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    //     {
    //       borderColor: "black",
    //     },
    // }}
  );
}
