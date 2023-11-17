import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import organizeTemperatureData from "../utils/forecast.util";

const LineChartForeCast = ({ forecastData }: { forecastData: any[] }) => {
  const temperatureData = organizeTemperatureData(forecastData).slice(1, 6);

  return (
    <LineChart width={800} height={300} data={temperatureData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        axisLine={{ stroke: "#fff" }} // Change X-axis line color
        tick={{ fill: "#fff" }} // Change X-axis tick label color
      />
      <YAxis
        type="number"
        domain={["dataMin", "dataMax"]}
        axisLine={{ stroke: "#fff" }} // Change X-axis line color
        tick={{ fill: "#fff" }} // Change X-axis tick label color
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="minTemperature"
        name="Min Temperature"
        stroke="#8884d8"
        strokeWidth={2}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="maxTemperature"
        name="Max Temperature"
        stroke="#82ca9d"
        strokeWidth={2}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="averageTemperature"
        name="Average Temperature"
        stroke="#ffc658"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  );
};

export default LineChartForeCast;
