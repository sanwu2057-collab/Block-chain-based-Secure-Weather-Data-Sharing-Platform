
import React, { useState } from 'react';
import { FormValues, UseCase } from '../types';

interface WeatherFormProps {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
}

export const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit, isLoading }) => {
  const today = new Date().toISOString().split('T')[0];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const [location, setLocation] = useState<string>('New York, USA');
  const [startDate, setStartDate] = useState<string>(sevenDaysAgo);
  const [endDate, setEndDate] = useState<string>(today);
  const [useCase, setUseCase] = useState<UseCase>(UseCase.GENERAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ location, startDate, endDate, useCase });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Fetch Weather Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-1">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g., London, UK"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              min={startDate}
              max={today}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="use-case" className="block text-sm font-medium text-gray-400 mb-1">Use Case</label>
          <select
            id="use-case"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value as UseCase)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {Object.values(UseCase).map((uc) => (
              <option key={uc} value={uc}>{uc}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Selecting a critical use case will log the data to the blockchain.</p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isLoading ? 'Fetching Data...' : 'Get Weather & Verify'}
        </button>
      </form>
    </div>
  );
};
