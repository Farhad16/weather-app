import dayjs from "dayjs";

export interface ITemperatureData {
  date: string;
  temperatures: {
    temp: number;
    time: string;
  }[];
  max_temp: number;
  min_temp: number;
  humidity: number;
  windSpeed: number;
  weatherIcon: string;
}

const organizeTemperatureData = (forecastData: any[]): ITemperatureData[] => {
  const groupedData: {
    [date: string]: {
      temperatures: {
        temp: number;
        time: string;
      }[];
      humidity: number;
      windSpeed: number;
      weatherIcon: string;
    };
  } = {};

  forecastData.forEach((forecast: any) => {
    const date = dayjs(forecast.dt * 1000).format("MMM D, YYYY");

    const time = dayjs(forecast.dt * 1000).format("HH:mm");

    if (!groupedData[date]) {
      groupedData[date] = {
        temperatures: [
          {
            temp: forecast.main.temp,
            time,
          },
        ],
        humidity: forecast.main.humidity,
        windSpeed: forecast.wind.speed,
        weatherIcon: forecast.weather[0].icon,
      };
    } else {
      groupedData[date].temperatures.push({
        temp: forecast.main.temp,
        time,
      });
    }
  });

  const result: ITemperatureData[] = Object.keys(groupedData).map((date) => {
    const temperatures = groupedData[date].temperatures.map(
      (temp) => temp.temp
    );

    return {
      date,
      temperatures: groupedData[date].temperatures,
      max_temp: Math.round(Math.max(...temperatures)),
      min_temp: Math.round(Math.min(...temperatures)),
      humidity: groupedData[date].humidity,
      windSpeed: groupedData[date].windSpeed,
      weatherIcon: groupedData[date].weatherIcon,
    };
  });

  return result;
};

export default organizeTemperatureData;
