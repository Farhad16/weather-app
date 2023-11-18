import { CircularProgress, debounce } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import search from "../assets/images/search.png";
import FiveDaysForecast from "./FiveDaysForecast";
import LineChartForeCast from "./LineChartForeCast";
import WeatherToday from "./WeatherToday";

const API_KEY = "7da80e4684c1ac5af21ff27b6c8df691";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [forecastError, setForecastError] = useState<string>("");
  const [forecastLoading, setForecastLoading] = useState<boolean>(false);
  const [selectedForecast, setSelectedForecast] = useState(0);

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
    <div className="min-h-screen px-4 sm:px-8 sm:py-6 py-4 flex flex-col gap-6 items-center justify-center bg-slate-400">
      <h2 className="font-bold text-4xl">
        Weather View: 5-Days Forecast Explorer
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
      <div className="flex flex-col w-full p-6 rounded-xl gap-6 bg-cyan-800 text-white md:mb-0 mb-4">
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
              condition={weatherData.weather[0].main}
              sys={weatherData.sys}
            />
          )
        )}
        {!loading && error && <p className="text-gray-200">{error}</p>}
      </div>

      {/* Line chart */}
      <div className="bg-cyan-800 box p-6 rounded-lg w-full flex flex-col gap-6">
        {forecastLoading ? (
          <div className="flex item-center justify-center mt-24">
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : (
          forecastData && (
            <>
              <LineChartForeCast
                forecastData={forecastData.list}
                selectedForecast={selectedForecast}
              />
              <FiveDaysForecast
                forecastData={forecastData.list}
                setSelectedForecast={setSelectedForecast}
                selectedForecast={selectedForecast}
              />
            </>
          )
        )}
        {!forecastLoading && forecastError && (
          <p className="text-gray-200">{forecastError}</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
