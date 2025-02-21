import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const LineCharts = ({data, xAxis, yAxis}) => {
  return (
      <LineChart
        width={900}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis  dataKey={yAxis} allowDecimals= {false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yAxis} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
  );
}

export default LineCharts