import { CircularProgress, debounce } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { getWeatherIcon } from "../utils/icon.util";
import search from "../assets/images/search.png";
import humidity from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";
import axios, { AxiosResponse } from "axios";
import LineChartForeCast from "./LineChartForeCast";
import FiveDaysForecast from "./FiveDaysForecast";
import WeatherCard from "./WeatherCard";
import dayjs from "dayjs";
import WeatherToday from "./WeatherToday";

const API_KEY = "7da80e4684c1ac5af21ff27b6c8df691";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [forecastError, setForecastError] = useState<string>("");
  const [forecastLoading, setForecastLoading] = useState<boolean>(false);

  const fetchWeatherData = async (location: string): Promise<void> => {
    setLoading(true);

    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_KEY}`
      );

      setWeatherData(response.data);
      setError("");
    } catch (error: any) {
      console.error(error.message);
      setError("Location not found. Please enter a valid location.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastWeatherData = async (location: string): Promise<void> => {
    setForecastLoading(true);

    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=Metric&appid=${API_KEY}`
      );

      setForecastData(response.data);
    } catch (error: any) {
      console.error(error.message);
      setForecastError("Location not found. Please enter a valid location.");
      setForecastData(null);
    } finally {
      setForecastLoading(false);
    }
  };

  const debouncedFetchData = debounce((newLocation: string): void => {
    fetchWeatherData(newLocation);
    fetchForecastWeatherData(newLocation);
  }, 1000);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let newLocation = event.target.value;

    if (newLocation.trim() === "") {
      newLocation = "Dhaka";
    }

    debouncedFetchData(newLocation);
  };

  useEffect(() => {
    fetchWeatherData("Dhaka");
    fetchForecastWeatherData("Dhaka");
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-8 sm:py-6 py-4 flex flex-col gap-6 items-center justify-center">
      <h2 className="font-semibold text-4xl">
        Weather View: 5-Day Forecast Explorer
      </h2>
      <div className="box bg-slate-200 rounded-full px-6 py-3 items-center flex sm:w-1/2 w-full">
        <img src={search} alt="search" />

        <input
          type="text"
          placeholder="Search location"
          className="px-4 border-none outline-none focus:outline-none w-full bg-transparent placeholder:text-gray-500 text-black"
          onChange={handleInputChange}
        />
      </div>

      {/* Today's weather */}

      <div className="flex flex-col w-full p-6 rounded-xl gap-6 bg-cyan-900 text-white md:mb-0 mb-4">
        {loading ? (
          <div className="flex item-center justify-center mt-24">
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : (
          weatherData && (
            <WeatherToday
              location={weatherData.name}
              temperature={weatherData.main.temp}
              weatherIcon={weatherData.weather[0].icon}
              humidity={weatherData.main.humidity}
              windSpeed={weatherData.wind.speed}
              precipitation={weatherData.main.precipitation}
            />
          )
        )}
        {!loading && error && <p className="text-gray-200">{error}</p>}
      </div>

      {/* Line chart */}
      <div className="overflow-x-auto bg-cyan-900 box p-6 rounded-lg w-full">
        {forecastLoading ? (
          <div className="flex item-center justify-center mt-24">
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : (
          forecastData && <LineChartForeCast forecastData={forecastData.list} />
        )}
        {!forecastLoading && forecastError && (
          <p className="text-gray-200">{forecastError}</p>
        )}
      </div>

      {/* For five days forecast weather */}
      <div className="w-full p-6 rounded-xl gap-6 bg-cyan-900 text-white col-span-2">
        <h2 className="mb-4">Next five days</h2>
        {forecastLoading ? (
          <div className="flex item-center justify-center mt-24">
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : (
          forecastData && <FiveDaysForecast forecastData={forecastData.list} />
        )}
        {!forecastLoading && forecastError && (
          <p className="text-gray-200">{forecastError}</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
