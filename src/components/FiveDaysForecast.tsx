import React from "react";
import organizeTemperatureData from "../utils/forecast.util";
import dayjs from "dayjs";
import { getWeatherIcon } from "../utils/icon.util";
import humidity from "../assets/images/humidity.png";
import wind from "../assets/images/wind.png";

const FiveDaysForecast = ({
  forecastData,
  setSelectedForecast,
  selectedForecast,
}: {
  forecastData: any[];
  setSelectedForecast: any;
  selectedForecast: number;
}) => {
  const temperatureData = organizeTemperatureData(forecastData);

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      {temperatureData.slice(0, 5).map((data, idx) => (
        <div
          className={`${
            idx === selectedForecast && "bg-cyan-600 bg-opacity-50"
          } border border-opacity-50 rounded-lg flex flex-col text-center gap-6 items-center justify-between p-2 cursor-pointer min-w-[200px]`}
          onClick={() => setSelectedForecast(idx)}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm">{dayjs(data.date).format("ddd DD")}</p>
            <img
              src={getWeatherIcon(data.weatherIcon)}
              alt="icon"
              className="w-12 h-12"
            />
            <div className="text-base flex gap-4">
              <span>{Math.round(data.max_temp)} °c</span>
              <span className="text-gray-300">
                {Math.round(data.min_temp)} °c
              </span>
            </div>
          </div>

          <div className="text-sm flex flex-row justify-between w-full items-center gap-6 flex-1 flex-grow mt-auto">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-2">
                <img src={humidity} alt="humidity" className="w-3 h-3" />
                <span>{data.humidity}%</span>
              </div>
              <span>Humidity</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-2">
                <img src={wind} alt="wind" className="w-3 h-3" />
                <p className="">{Math.floor(data.windSpeed * 3.6)} km/h</p>
              </div>
              <span>Wind</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveDaysForecast;
