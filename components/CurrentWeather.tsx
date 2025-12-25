
import React from 'react';
import { CurrentWeatherData } from '../types';
import { ThermometerIcon, WindIcon, HumidityIcon, PressureIcon } from './Icons';

interface CurrentWeatherProps {
  location: { name: string; country: string; localtime: string };
  current: CurrentWeatherData;
}

const WeatherMetric: React.FC<{ icon: React.ReactNode; label: string; value: string | number; unit: string }> = ({ icon, label, value, unit }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-gray-700/50 p-2 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-bold text-white">
        {value} <span className="text-sm font-normal text-gray-400">{unit}</span>
      </p>
    </div>
  </div>
);

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ location, current }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{location.name}, {location.country}</h2>
          <p className="text-sm text-gray-400">As of {new Date(current.last_updated).toLocaleTimeString()}</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-extrabold text-white tracking-tighter">{Math.round(current.temp_c)}°C</p>
          <p className="text-lg text-gray-300 -mt-1">{current.condition.text}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-700">
        <WeatherMetric
          icon={<HumidityIcon className="h-6 w-6 text-cyan-400" />}
          label="Humidity"
          value={current.humidity}
          unit="%"
        />
        <WeatherMetric
          icon={<WindIcon className="h-6 w-6 text-cyan-400" />}
          label="Wind Speed"
          value={current.wind_kph}
          unit="kph"
        />
        <WeatherMetric
          icon={<PressureIcon className="h-6 w-6 text-cyan-400" />}
          label="Pressure"
          value={current.pressure_mb}
          unit="mb"
        />
      </div>
    </div>
  );
};
