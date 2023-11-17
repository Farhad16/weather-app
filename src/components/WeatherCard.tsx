import React from "react";
import { getWeatherIcon } from "../utils/icon.util";
import humidityIcon from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";
import dayjs from "dayjs";

export interface IWeather {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
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
    <div className="border border-opacity-50 rounded-lg flex flex-col text-center gap-6 items-center justify-between p-2">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm">{dayjs(date).format("ddd DD")}</p>
        <img
          src={getWeatherIcon(weatherIcon)}
          alt="icon"
          className="w-16 h-16 md:w-24 md:h-24"
        />
        <div className="text-base flex gap-4">
          <span>{maxTemperature} °c</span>
          <span className="text-gray-300">{minTemperature} °c</span>
        </div>
      </div>

      <div className="text-sm flex flex-row justify-between w-full items-center gap-6 flex-1 flex-grow mt-auto">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <img src={humidityIcon} alt="humidity" className="w-3 h-3" />
            <span>{humidity}%</span>
          </div>
          <span>Humidity</span>
        </div>
        <div className="flex flex-col gap-1">
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
