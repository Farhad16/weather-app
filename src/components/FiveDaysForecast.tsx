import React from "react";
import organizeTemperatureData from "../utils/forecast.util";
import WeatherCard from "./WeatherCard";
import organizeTemperatureDataaa from "../utils/dd";

const FiveDaysForecast = ({ forecastData }: { forecastData: any[] }) => {
  const temperatureData = organizeTemperatureData(forecastData);

  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 w-full">
      {temperatureData.slice(0, 6).map((data) => (
        <WeatherCard
          key={data.date}
          date={data.date}
          weatherIcon={data.weatherIcon}
          maxTemperature={data.max_temp}
          minTemperature={data.min_temp}
          humidity={data.humidity}
          windSpeed={data.windSpeed}
        />
      ))}
    </div>
  );
};

export default FiveDaysForecast;
