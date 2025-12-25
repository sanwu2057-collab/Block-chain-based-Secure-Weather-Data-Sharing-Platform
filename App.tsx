
import React, { useState, useCallback } from 'react';
import { WeatherForm } from './components/WeatherForm';
import { CurrentWeather } from './components/CurrentWeather';
import { HistoricalWeather } from './components/HistoricalWeather';
import { BlockchainView } from './components/BlockchainView';
import { fetchWeatherDataAndInsights } from './services/geminiService';
import { FormValues, WeatherData, BlockchainRecord, HistoricalData, UseCase } from './types';
import { LogoIcon } from './components/Icons';

// Simple hash function simulation for demonstration purposes.
// In a real application, a robust cryptographic hash function like SHA-256 would be used.
const createDataHash = (data: object): string => {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `0x${Math.abs(hash).toString(16).padStart(8, '0')}`;
};

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchWeatherDataAndInsights(values.location, values.startDate, values.endDate);
      setWeatherData(data);

      // If the use case is critical, create a new record on the simulated blockchain.
      if (values.useCase !== UseCase.GENERAL) {
        const newRecord: BlockchainRecord = {
          id: blockchainRecords.length + 1,
          timestamp: new Date().toISOString(),
          location: values.location,
          useCase: values.useCase,
          temperature: data.current.temp_c,
          humidity: data.current.humidity,
          dataHash: createDataHash(data),
        };
        setBlockchainRecords(prevRecords => [...prevRecords, newRecord]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. The AI model may be unable to generate data for the requested location or date range. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [blockchainRecords.length]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center space-x-3 mb-6">
          <LogoIcon className="h-10 w-10 text-cyan-400" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Blockchain Weather Ledger</h1>
            <p className="text-sm text-gray-400">Tamper-Proof Weather Data for Critical Industries</p>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <WeatherForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            <BlockchainView records={blockchainRecords} />
          </div>

          <div className="lg:col-span-2">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96 bg-gray-800/50 rounded-lg border border-gray-700">
                <svg className="animate-spin h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-lg text-gray-300">Generating secure weather data with AI...</p>
                <p className="text-sm text-gray-500">This may take a moment.</p>
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center h-96 bg-red-900/20 text-red-300 p-4 rounded-lg border border-red-700">
                <p>{error}</p>
              </div>
            )}
            {weatherData && !isLoading && (
              <div className="space-y-6">
                <CurrentWeather 
                  location={weatherData.location}
                  current={weatherData.current}
                />
                <HistoricalWeather 
                  historicalData={weatherData.historical}
                  insights={weatherData.insights}
                />
              </div>
            )}
            {!weatherData && !isLoading && !error && (
               <div className="flex flex-col items-center justify-center h-96 bg-gray-800/50 rounded-lg border border-dashed border-gray-700 p-6 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                 </svg>
                 <h2 className="text-xl font-semibold text-gray-300">Welcome to the Weather Ledger</h2>
                 <p className="text-gray-500 mt-2">Enter a location and date range to fetch and verify weather data on our secure, simulated blockchain.</p>
               </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
