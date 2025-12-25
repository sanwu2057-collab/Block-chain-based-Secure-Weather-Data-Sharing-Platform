
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { WeatherData, HistoricalData, CurrentWeatherData } from '../types';

// This file simulates a backend service that would typically call a real weather API.
// Here, we use Gemini's function calling to generate realistic, structured weather data
// based on a user's prompt. This demonstrates the app's architecture without needing
// a real weather API key.

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real application, you'd want to handle this more gracefully.
  // For this project, we assume the API key is set in the environment.
  console.warn("Gemini API key not found in environment variables.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY! });

/**
 * How the Gemini Function Calling Works Here:
 * 1. We define a function declaration (`get_weather_data_for_location`) with a detailed schema
 *    of the exact data structure we want (current weather, historical data, location info).
 * 2. We provide this function declaration to the Gemini model as a "tool" it can use.
 * 3. We send a prompt to Gemini asking for weather data for a specific location and date range.
 * 4. Instead of just replying with text, Gemini recognizes that our request matches the function's
 *    purpose. It then calls the function, filling in all the parameters of our schema with
 *    plausible, synthetically generated weather data.
 * 5. The model's response contains a `functionCalls` object. We parse this object to extract
 *    the structured JSON data that the model generated, which we then use in our application.
 * 6. We make a second call to Gemini with this generated data to produce qualitative insights.
 */
const getWeatherFunctionDeclaration: FunctionDeclaration = {
  name: 'get_weather_data_for_location',
  description: 'Generates detailed current and historical weather data for a specified location and date range.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'City name.' },
          region: { type: Type.STRING, description: 'State or region.' },
          country: { type: Type.STRING, description: 'Country name.' },
          localtime: { type: Type.STRING, description: 'Current local time in YYYY-MM-DD HH:mm format.' },
        },
      },
      current: {
        type: Type.OBJECT,
        properties: {
          last_updated: { type: Type.STRING, description: 'Last update time in YYYY-MM-DD HH:mm format.' },
          temp_c: { type: Type.NUMBER, description: 'Temperature in Celsius.' },
          condition: { 
            type: Type.OBJECT,
            properties: {
                text: { type: Type.STRING, description: 'Weather condition text, e.g., "Sunny", "Partly cloudy".' },
                icon: { type: Type.STRING, description: 'A URL to a weather icon. Ignore this and use a placeholder.' }
            }
          },
          wind_kph: { type: Type.NUMBER, description: 'Wind speed in kilometers per hour.' },
          pressure_mb: { type: Type.NUMBER, description: 'Pressure in millibars.' },
          humidity: { type: Type.NUMBER, description: 'Humidity percentage.' },
        },
      },
      historical: {
        type: Type.ARRAY,
        description: 'An array of historical daily weather data for the specified date range.',
        items: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING, description: 'Date in YYYY-MM-DD format.' },
            avg_temp_c: { type: Type.NUMBER, description: 'Average temperature in Celsius for the day.' },
            max_wind_kph: { type: Type.NUMBER, description: 'Maximum wind speed in kilometers per hour for the day.' },
            total_precip_mm: { type: Type.NUMBER, description: 'Total precipitation in millimeters for the day.' },
            avg_humidity: { type: Type.NUMBER, description: 'Average humidity percentage for the day.' },
          },
        },
      },
    },
    required: ['location', 'current', 'historical'],
  },
};


export const fetchWeatherDataAndInsights = async (location: string, startDate: string, endDate: string): Promise<WeatherData> => {
  const model = "gemini-3-flash-preview";

  const dataGenerationPrompt = `Generate weather data for ${location} from ${startDate} to ${endDate}. The current weather should reflect the end date. Ensure the historical data covers each day in the range.`;

  const dataResponse = await ai.models.generateContent({
    model,
    contents: dataGenerationPrompt,
    config: {
      tools: [{ functionDeclarations: [getWeatherFunctionDeclaration] }],
    },
  });
  
  const functionCalls = dataResponse.functionCalls;

  if (!functionCalls || functionCalls.length === 0) {
    throw new Error("AI model did not return the expected weather data structure.");
  }

  const weatherArgs = functionCalls[0].args as {
      location: { name: string; region: string; country: string; localtime: string; };
      current: CurrentWeatherData;
      historical: HistoricalData[];
  };

  if (!weatherArgs.location || !weatherArgs.current || !weatherArgs.historical) {
      throw new Error("Received incomplete weather data from the AI model.");
  }

  // Second, get insights based on the generated data.
  const insightsPrompt = `Based on the following weather data for ${location}, provide a brief, one-paragraph summary for a user in a critical industry like agriculture or insurance. Highlight the max/min/average temperature from the historical data, mention any significant precipitation, and note any potential extreme weather events hinted at by the data (e.g., high winds, sudden temperature drops). Keep it concise.
  
  Data:
  ${JSON.stringify(weatherArgs, null, 2)}`;
  
  const insightsResponse = await ai.models.generateContent({
    model,
    contents: insightsPrompt
  });

  const insightsText = insightsResponse.text;
  if (!insightsText) {
    throw new Error("AI model failed to generate weather insights.");
  }
  
  return {
    ...weatherArgs,
    insights: insightsText,
  };
};
