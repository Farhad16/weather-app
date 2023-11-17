import dayjs from "dayjs";

interface TemperatureData {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  averageTemperature: number;
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
}

const organizeTemperatureData = (forecastData: any[]): TemperatureData[] => {
  const groupedData: {
    [date: string]: {
      temperatures: number[];
      weatherIcons: string[];
      humidity: number[];
      windSpeed: number[];
    };
  } = {};

  forecastData.forEach((forecast: any) => {
    const date = dayjs(forecast.dt * 1000).format("MMM D, YYYY");

    if (!groupedData[date]) {
      groupedData[date] = {
        temperatures: [forecast.main.temp],
        weatherIcons: [forecast.weather[0].icon],
        humidity: [forecast.main.humidity],
        windSpeed: [forecast.wind.speed],
      };
    } else {
      groupedData[date].temperatures.push(forecast.main.temp);
      groupedData[date].weatherIcons.push(forecast.weather[0].icon);
      groupedData[date].humidity.push(forecast.main.humidity);
      groupedData[date].windSpeed.push(forecast.wind.speed);
    }
  });

  const result: TemperatureData[] = Object.keys(groupedData).map((date) => {
    const temperatures = groupedData[date].temperatures;
    const minTemperature = Math.round(Math.min(...temperatures));
    const maxTemperature = Math.round(Math.max(...temperatures));
    const averageTemperature = Math.round(
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
    );

    const humidity = Math.round(
      groupedData[date].humidity.reduce((sum, h) => sum + h, 0) /
        groupedData[date].humidity.length
    );

    const windSpeed = Math.round(
      groupedData[date].windSpeed.reduce((sum, ws) => sum + ws, 0) /
        groupedData[date].windSpeed.length
    );

    return {
      date,
      minTemperature,
      maxTemperature,
      averageTemperature,
      weatherIcon: groupedData[date].weatherIcons[0], // Assuming weather icon is consistent for a given date
      humidity,
      windSpeed,
    };
  });

  return result;
};

export default organizeTemperatureData;
