import React from "react";
import { getWeatherIcon } from "../utils/icon.util";

interface IWeather {
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  precipitation: number;
}

const WeatherToday = ({
  weatherIcon,
  humidity,
  windSpeed,
  location,
  temperature,
  precipitation,
}: IWeather) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl">{location}</h2>
      <div className="flex flex-row items-start gap-3">
        <img
          src={getWeatherIcon(weatherIcon)}
          alt="icon"
          className="w-20 h-20"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl">{Math.round(temperature)}°c</h2>
          <h2 className="text-2xl">Precipitation: {precipitation}</h2>
          <p className="">Humidity: {humidity}%</p>
          <p className="">Wind: {Math.floor(windSpeed * 3.6)} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherToday;
