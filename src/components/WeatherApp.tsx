import { CircularProgress, debounce } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { getWeatherIcon } from "../utils/icon.util";
import search from "../assets/images/search.png";
import humidity from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";
import axios, { AxiosResponse } from "axios";
import LineChartForeCast from "./LineChartForeCast";
import FiveDaysForecast from "./FiveDaysForecast";

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

  console.log(forecastData);

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
      <div className="flex flex-col gap-4 sm:gap-6 w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full p-6 rounded-xl gap-6 bg-cyan-900 text-white min-h-[300px] sm:min-h-[400px]">
            {loading ? (
              <div className="flex item-center justify-center mt-24">
                <CircularProgress sx={{ color: "white" }} />
              </div>
            ) : (
              weatherData && (
                <>
                  <div className="flex flex-col text-center gap-4 items-center justify-center flex-grow flex-1">
                    <img
                      src={getWeatherIcon(weatherData.weather[0].icon)}
                      alt="icon"
                      className="w-28 h-28 mx-auto"
                    />
                    <h1 className="text-6xl">
                      {Math.floor(weatherData.main.temp)} °c
                    </h1>
                    <h2 className="text-5xl">{weatherData.name}</h2>
                  </div>

                  <div className="flex flex-row justify-between w-full items-center mt-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={humidity}
                          alt="humidity"
                          className="w-4 h-4"
                        />
                        <span className="text-base">
                          {weatherData.main.humidity}%
                        </span>
                      </div>
                      <span>Humidity</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center gap-2">
                        <img src={wind} alt="wind" className="w-4 h-4" />
                        <span className="text-base">
                          {Math.floor(weatherData.wind.speed)} m/s
                        </span>
                      </div>
                      <span>Wind Speed</span>
                    </div>
                  </div>
                </>
              )
            )}
            {!loading && error && <p className="text-gray-200">{error}</p>}
          </div>
          <div className="box-container flex flex-col w-full p-6 rounded-xl gap-6 bg-cyan-900 text-white min-h-[300px] sm:min-h-[400px]">
            {forecastLoading ? (
              <div className="flex item-center justify-center mt-24">
                <CircularProgress sx={{ color: "white" }} />
              </div>
            ) : (
              forecastData && (
                <FiveDaysForecast forecastData={forecastData.list} />
              )
            )}
            {!forecastLoading && forecastError && (
              <p className="text-gray-200">{forecastError}</p>
            )}
          </div>
        </div>

        <div className="overflow-x-auto bg-slate-200 box p-6 rounded-lg">
          {forecastLoading ? (
            <div className="flex item-center justify-center mt-24">
              <CircularProgress sx={{ color: "white" }} />
            </div>
          ) : (
            forecastData && (
              <LineChartForeCast forecastData={forecastData.list} />
            )
          )}
          {!forecastLoading && forecastError && (
            <p className="text-gray-200">{forecastError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
