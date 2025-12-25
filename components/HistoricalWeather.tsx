
import React from 'react';
import { HistoricalData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HistoricalWeatherProps {
  historicalData: HistoricalData[];
  insights: string;
}

export const HistoricalWeather: React.FC<HistoricalWeatherProps> = ({ historicalData, insights }) => {
  const formattedData = historicalData.map(day => ({
    ...day,
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
  }));

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-1">Historical Data & Insights</h2>
        <p className="text-sm text-gray-400 mb-4">Past weather patterns for the selected period.</p>
      </div>

      <div className="px-6 pb-6">
         <h3 className="text-md font-semibold text-cyan-400 mb-2">AI-Generated Summary</h3>
         <p className="text-sm text-gray-300 bg-gray-700/50 p-4 rounded-md border border-gray-600">{insights}</p>
      </div>

      <div className="px-6 pb-6">
        <h3 className="text-md font-semibold text-white mb-4">Temperature Trend (°C)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={formattedData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E1E1E',
                  borderColor: '#444444',
                  color: '#e5e7eb',
                }}
              />
              <Legend wrapperStyle={{fontSize: "14px"}}/>
              <Line type="monotone" dataKey="avg_temp_c" name="Avg Temp" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <h3 className="text-md font-semibold text-white mb-4">Daily Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Avg Temp (°C)</th>
                <th scope="col" className="px-4 py-3">Max Wind (kph)</th>
                <th scope="col" className="px-4 py-3">Precip (mm)</th>
                <th scope="col" className="px-4 py-3">Avg Humidity (%)</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((day) => (
                <tr key={day.date} className="border-b border-gray-700 hover:bg-gray-700/30">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{new Date(day.date).toLocaleDateString('en-CA', {timeZone: 'UTC'})}</td>
                  <td className="px-4 py-3">{day.avg_temp_c.toFixed(1)}</td>
                  <td className="px-4 py-3">{day.max_wind_kph.toFixed(1)}</td>
                  <td className="px-4 py-3">{day.total_precip_mm.toFixed(1)}</td>
                  <td className="px-4 py-3">{day.avg_humidity.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
