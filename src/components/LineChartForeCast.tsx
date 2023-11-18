import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import organizeTemperatureData from "../utils/forecast.util";
import { temperatureFormatter } from "../utils/temperature.util";
import dayjs from "dayjs";

const LineChartForeCast = ({
  forecastData,
  selectedForecast,
}: {
  forecastData: any[];
  selectedForecast: any;
}) => {
  const temperatureData = organizeTemperatureData(forecastData).slice(0, 5);
  const selected = temperatureFormatter(
    temperatureData[selectedForecast].temperatures
  );

  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <p className="text-xl font-medium text-white">
        {dayjs(temperatureData[selectedForecast].date).format("dddd DD, YYYY")}
      </p>
      <LineChart width={800} height={300} data={selected}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          axisLine={{ stroke: "#fff" }}
          tick={{ fill: "#fff" }}
        >
          <Label position="insideBottom" offset={-10} fill="#fff" />
        </XAxis>
        <YAxis
          type="number"
          domain={["dataMin", "dataMax"]}
          axisLine={{ stroke: "#fff" }}
          tick={{ fill: "#fff" }}
          tickCount={6}
        >
          <Label position="insideLeft" angle={-90} offset={10} fill="#fff" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temp"
          name="Temperature"
          stroke="#f8ca05"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
};

export default LineChartForeCast;
