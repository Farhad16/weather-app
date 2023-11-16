import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getWeatherIcon } from "../utils/icon.util";
import search from "../assets/images/search.png";
import humidity from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";
import axios from "axios";

const API_KEY = "7da80e4684c1ac5af21ff27b6c8df691";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (location: string) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_KEY}`
      );

      setWeatherData(response.data);
    } catch (error: any) {
      console.log(error.message);
      setError("Location not found. Please enter a valid location.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Dhaka");
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-8 sm:py-6 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 w-full">
        <div className="box-container flex flex-col w-full p-6 rounded-xl gap-6 bg-cyan-900 text-white min-h-[450px] sm:min-h-[520px]">
          <div className="box bg-slate-200 rounded-full px-6 py-3 flex items-center w-full">
            <img src={search} alt="search" />

            <input
              type="text"
              placeholder="Search location"
              className="px-4 border-none outline-none focus:outline-none w-full bg-transparent placeholder:text-gray-500 text-black"
              // onChange={handleInputChange}
            />
          </div>
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
                      <img src={humidity} alt="humidity" className="w-4 h-4" />
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
        <div>for</div>
      </div>
    </div>
  );
};

export default WeatherApp;
