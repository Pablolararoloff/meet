import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const genres = [
      { name: 'React', color: '#FF6347' },      // Pantone Amethyst Orchid
  { name: 'JavaScript', color: '#DAA520' }, // Pantone Golden Rod
  { name: 'Node', color: '#008B8B' },       // Pantone Dark Cyan
  { name: 'jQuery', color: '#40E0D0' },     // Pantone Turquoise
  { name: 'Angular', color: '#6B5B95' } 
    ];

  const newData = genres.map(({ name, color }) => {
      const filteredEvents = events.filter(event => event.summary.includes(name));
      return {
        name: name,
        value: filteredEvents.length,
        color: color  // Include color property in the data array
      };
    });

    setData(newData);
  }, [events]); 

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.45;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#f6f6f6"
        textAnchor={x > cx ? 'middle' : 'middle'}
        dominantBaseline="central"
      >
        {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
