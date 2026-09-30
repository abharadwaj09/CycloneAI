import { AlertLevel, CycloneData, District, RainfallData, WindData, OceanData, AtmosphereData, HistoricalCyclone, Alert, DataSourceStatus, PredictionResult } from '../types';

export const DEMO_CYCLONE_DATA: CycloneData = {
  id: 'BOB-04-2026',
  name: 'DANA',
  lat: 15.2,
  lon: 87.5,
  windSpeed: 165,
  maxSustainedWind: 180,
  gustSpeed: 210,
  centralPressure: 960,
  category: 3,
  movementDirection: 315,
  movementSpeed: 18,
  distanceFromCoast: 450,
  stormSurge: 2.5,
  timestamp: new Date().toISOString(),
  basin: 'Bay of Bengal',
  status: 'ACTIVE',
};

export const DEMO_DISTRICTS: District[] = [
  { id: 'd1', name: 'Puri', state: 'Odisha', isCoastal: true, alertLevel: AlertLevel.RED, windSpeed: 85, rainfall: 120, floodRisk: 'High', roadStatus: 'Partial Closure', coordinates: [19.8135, 85.8312] },
  { id: 'd2', name: 'Ganjam', state: 'Odisha', isCoastal: true, alertLevel: AlertLevel.RED, windSpeed: 75, rainfall: 95, floodRisk: 'High', roadStatus: 'Clear', coordinates: [19.3804, 84.9749] },
  { id: 'd3', name: 'Kendrapara', state: 'Odisha', isCoastal: true, alertLevel: AlertLevel.ORANGE, windSpeed: 60, rainfall: 65, floodRisk: 'Moderate', roadStatus: 'Clear', coordinates: [20.4939, 86.4259] },
  { id: 'd4', name: 'Srikakulam', state: 'Andhra Pradesh', isCoastal: true, alertLevel: AlertLevel.ORANGE, windSpeed: 55, rainfall: 50, floodRisk: 'Moderate', roadStatus: 'Clear', coordinates: [18.2949, 83.8938] },
  { id: 'd5', name: 'Visakhapatnam', state: 'Andhra Pradesh', isCoastal: true, alertLevel: AlertLevel.YELLOW, windSpeed: 40, rainfall: 25, floodRisk: 'Low', roadStatus: 'Clear', coordinates: [17.6868, 83.2185] },
  { id: 'd6', name: 'East Midnapore', state: 'West Bengal', isCoastal: true, alertLevel: AlertLevel.YELLOW, windSpeed: 35, rainfall: 20, floodRisk: 'Low', roadStatus: 'Clear', coordinates: [22.0298, 87.7981] },
  { id: 'd7', name: 'South 24 Parganas', state: 'West Bengal', isCoastal: true, alertLevel: AlertLevel.GREEN, windSpeed: 25, rainfall: 5, floodRisk: 'Low', roadStatus: 'Clear', coordinates: [22.1328, 88.4013] },
];

export const DEMO_RAINFALL_CITIES: (RainfallData & { city: string })[] = [
  { city: 'Puri', current: 15, hourly1: 20, hourly3: 50, hourly6: 95, hourly24: 180, hourly48: 300, probability: 95, peakForecast: 210, intensity: 'Very Heavy', floodRisk: 'High' },
  { city: 'Bhubaneswar', current: 10, hourly1: 15, hourly3: 40, hourly6: 70, hourly24: 120, hourly48: 200, probability: 85, peakForecast: 150, intensity: 'Heavy', floodRisk: 'Moderate' },
  { city: 'Visakhapatnam', current: 5, hourly1: 5, hourly3: 15, hourly6: 25, hourly24: 40, hourly48: 60, probability: 60, peakForecast: 50, intensity: 'Moderate', floodRisk: 'Low' },
];

export const DEMO_WIND_DATA: WindData = {
  speed: 165,
  gusts: 210,
  direction: 315,
  shear: 15,
};

export const DEMO_OCEAN_DATA: OceanData = {
  sst: 30.5,
  oceanHeatContent: 120,
  tempAnomaly: 1.2,
  waveHeight: 6.5,
  seaLevel: 0.8,
  currents: 1.5,
};

export const DEMO_ATMOSPHERE_DATA: AtmosphereData = {
  pressure: 960,
  humidity: 95,
  temperature: 26,
  pressureTrend: -5,
  previousPressure: 965,
};

export const DEMO_HISTORICAL_CYCLONES: HistoricalCyclone[] = [
  { id: 'h1', name: 'Fani', year: 2019, category: 5, maxWind: 215, minPressure: 932, landfallPoint: 'Puri, Odisha', fatalities: 89, damage: 8.1 },
  { id: 'h2', name: 'Amphan', year: 2020, category: 5, maxWind: 240, minPressure: 920, landfallPoint: 'Bakkhali, West Bengal', fatalities: 128, damage: 13.6 },
  { id: 'h3', name: 'Tauktae', year: 2021, category: 4, maxWind: 195, minPressure: 950, landfallPoint: 'Gujarat', fatalities: 174, damage: 2.1 },
  { id: 'h4', name: 'Biparjoy', year: 2023, category: 3, maxWind: 165, minPressure: 958, landfallPoint: 'Jakhau, Gujarat', fatalities: 17, damage: 0.1 },
  { id: 'h5', name: 'Michaung', year: 2023, category: 1, maxWind: 110, minPressure: 990, landfallPoint: 'Bapatla, Andhra Pradesh', fatalities: 17, damage: 1.2 },
];

export const DEMO_ALERTS: Alert[] = [
  { id: 'a1', level: AlertLevel.RED, type: 'Cyclone Warning', location: 'Odisha Coast', state: 'Odisha', district: 'Puri', message: 'Severe Cyclonic Storm DANA likely to make landfall near Puri within 24 hours. Evacuation ordered.', timestamp: new Date().toISOString(), source: 'IMD' },
  { id: 'a2', level: AlertLevel.ORANGE, type: 'Heavy Rainfall', location: 'North Coastal Andhra', state: 'Andhra Pradesh', district: 'Srikakulam', message: 'Extremely heavy rainfall expected in next 48 hours. Risk of flash floods.', timestamp: new Date().toISOString(), source: 'IMD' },
  { id: 'a3', level: AlertLevel.YELLOW, type: 'Fishermen Warning', location: 'Bay of Bengal', state: 'Multiple', district: 'All Coastal', message: 'Fishermen advised not to venture into deep sea for the next 72 hours.', timestamp: new Date().toISOString(), source: 'INCOIS' },
];

export const DEMO_DATA_SOURCES: DataSourceStatus[] = [
  { id: 's1', name: 'IMD Satellite', status: 'ONLINE', lastUpdated: new Date().toISOString(), latency: 45 },
  { id: 's2', name: 'INCOIS Ocean Data', status: 'ONLINE', lastUpdated: new Date().toISOString(), latency: 120 },
  { id: 's3', name: 'NDMA Alert System', status: 'ONLINE', lastUpdated: new Date().toISOString(), latency: 30 },
  { id: 's4', name: 'Doppler Radar VSKP', status: 'DEGRADED', lastUpdated: new Date().toISOString(), latency: 350 },
];

export function generateDemoTimeSeries(hours: number): { time: string; value: number }[] {
  const data = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    data.push({
      time: time.toISOString(),
      value: Math.floor(Math.random() * 50) + 950,
    });
  }
  return data;
}

export function generateDemoPrediction(): PredictionResult[] {
  const predictions = [];
  const now = new Date();
  for (let i = 1; i <= 24; i++) {
    const time = new Date(now.getTime() + i * 3600000);
    predictions.push({
      timestamp: time.toISOString(),
      lat: 15.2 + (i * 0.1),
      lon: 87.5 - (i * 0.08),
      intensity: 165 + (Math.sin(i / 4) * 20),
      confidence: Math.max(90 - (i * 2), 40),
    });
  }
  return predictions;
}
