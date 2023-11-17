import dayjs from "dayjs";

interface TemperatureData {
  date: string;
  temperatures: number[];
}

const organizeTemperatureDataaa = (forecastData: any[]): TemperatureData[] => {
  const groupedData: {
    [date: string]: {
      temperatures: number[];
    };
  } = {};

  forecastData.forEach((forecast: any) => {
    const date = dayjs(forecast.dt * 1000).format("MMM D, YYYY");

    if (!groupedData[date]) {
      groupedData[date] = {
        temperatures: [forecast.main.temp],
      };
    } else {
      groupedData[date].temperatures.push(forecast.main.temp);
    }
  });

  const result: TemperatureData[] = Object.keys(groupedData).map((date) => ({
    date,
    temperatures: groupedData[date].temperatures,
  }));

  return result;
};

export default organizeTemperatureDataaa;
