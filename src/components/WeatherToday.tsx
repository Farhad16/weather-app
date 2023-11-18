import React from "react";
import { getWeatherIcon } from "../utils/icon.util";
import dayjs from "dayjs";

interface IWeather {
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  condition: string;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

const WeatherToday = ({
  weatherIcon,
  humidity,
  windSpeed,
  location,
  temperature,
  condition,
  sys,
}: IWeather) => {
  return (
    <div className="flex flex-col xs:flex-row justify-between items-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl">{location}</h2>
        <div className="flex flex-row items-start gap-6">
          <img
            src={getWeatherIcon(weatherIcon)}
            alt="icon"
            className="w-20 h-20"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl">{Math.round(temperature)}°c</h2>
            <p className="">Humidity: {humidity}%</p>
            <p className="">Wind: {Math.floor(windSpeed * 3.6)} km/h</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xl">{dayjs(new Date()).format("dddd DD, YYYY")}</p>
        <p className="">
          Condition: <span>{condition}</span>
        </p>
        <p>
          Sunrise:{" "}
          <span className="">{dayjs.unix(sys.sunrise).format("hh:mm A")}</span>
        </p>
        <p className="">
          Sunset: <span>{dayjs.unix(sys.sunset).format("hh:mm: A")}</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherToday;
