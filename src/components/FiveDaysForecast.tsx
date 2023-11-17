import React from "react";
import organizeTemperatureData from "../utils/forecast.util";
import WeatherCard from "./WeatherCard";

const FiveDaysForecast = ({ forecastData }: { forecastData: any[] }) => {
  const temperatureData = organizeTemperatureData(forecastData);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full">
      {temperatureData.map((data) => (
        <WeatherCard
          key={data.date}
          date={data.date}
          weatherIcon={data.weatherIcon}
          maxTemperature={data.maxTemperature}
          minTemperature={data.minTemperature}
          humidity={data.humidity}
          windSpeed={data.windSpeed}
        />
      ))}
    </div>
  );
};

export default FiveDaysForecast;
