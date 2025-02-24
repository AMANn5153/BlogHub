import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const LineCharts = ({data, xAxis, yAxis}) => {
  const color = yAxis === "likes" ? "red" : yAxis === "views" ? "blue" : "green";
  return (
      <LineChart
        width={900}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid  />
        <XAxis dataKey={xAxis} />
        <YAxis  dataKey={yAxis} allowDecimals= {false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yAxis} stroke={color} activeDot={{ r: 9 }} />
      </LineChart>
  );
}

export default LineCharts