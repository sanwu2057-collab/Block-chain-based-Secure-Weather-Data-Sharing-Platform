
export enum UseCase {
  GENERAL = 'General Inquiry',
  AGRICULTURE = 'Agriculture',
  DISASTER_MGMT = 'Disaster Management',
  TRANSPORT = 'Transport',
  INSURANCE = 'Insurance',
}

export interface FormValues {
  location: string;
  startDate: string;
  endDate: string;
  useCase: UseCase;
}

export interface CurrentWeatherData {
  last_updated: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_kph: number;
  pressure_mb: number;
  humidity: number;
}

export interface HistoricalData {
  date: string;
  avg_temp_c: number;
  max_wind_kph: number;
  total_precip_mm: number;
  avg_humidity: number;
}

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: CurrentWeatherData;
  historical: HistoricalData[];
  insights: string;
}

export interface BlockchainRecord {
  id: number;
  timestamp: string;
  location: string;
  useCase: UseCase;
  temperature: number;
  humidity: number;
  dataHash: string;
}
