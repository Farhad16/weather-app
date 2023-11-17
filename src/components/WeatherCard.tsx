import React from "react";
import { getWeatherIcon } from "../utils/icon.util";
import humidityIcon from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";

export interface IWeather {
  date?: string;
  minTemperature?: number;
  maxTemperature?: number;
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
  temperature?: number;
}

const WeatherCard = ({
  date,
  weatherIcon,
  maxTemperature,
  minTemperature,
  humidity,
  windSpeed,
}: IWeather) => {
  return (
    <div className="flex flex-col text-center gap-2 items-center justify-center border p-2">
      <p>{date}</p>
      <img
        src={getWeatherIcon(weatherIcon)}
        alt="icon"
        className="w-16 h-16 mx-auto"
      />
      <p className="text-base flex gap-4 ">
        <span>{maxTemperature} °c</span>{" "}
        <span className="text-gray-300">{minTemperature} °c</span>
      </p>
      <div className="flex flex-row justify-between w-full items-center gap-6">
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex flex-row items-center gap-2">
            <img src={humidityIcon} alt="humidity" className="w-3 h-3" />
            <span>{humidity}%</span>
          </div>
          <span>Humidity</span>
        </div>
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex flex-row items-center gap-2">
            <img src={wind} alt="wind" className="w-3 h-3" />
            <span>{Math.floor(windSpeed)} m/s</span>
          </div>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
