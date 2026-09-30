export interface CycloneData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  windSpeed: number; // km/h
  maxSustainedWind: number; // km/h
  gustSpeed: number; // km/h
  centralPressure: number; // hPa
  category: number;
  movementDirection: number; // degrees
  movementSpeed: number; // km/h
  distanceFromCoast: number; // km
  stormSurge: number; // meters
  timestamp: string;
  basin: string;
  status: string;
}

export interface WeatherStation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  elevation: number;
  type: string;
  status: string;
}

export interface RainfallData {
  current: number; // mm
  hourly1: number;
  hourly3: number;
  hourly6: number;
  hourly24: number;
  hourly48: number;
  probability: number; // %
  peakForecast: number;
  intensity: string;
  floodRisk: string;
}

export interface WindData {
  speed: number;
  gusts: number;
  direction: number;
  shear: number;
}

export interface OceanData {
  sst: number; // Sea Surface Temperature
  oceanHeatContent: number;
  tempAnomaly: number;
  waveHeight: number;
  seaLevel: number;
  currents: number;
}

export interface AtmosphereData {
  pressure: number;
  humidity: number;
  temperature: number;
  pressureTrend: number;
  previousPressure: number;
}

export enum AlertLevel {
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  ORANGE = 'ORANGE',
  RED = 'RED',
}

export interface Alert {
  id: string;
  level: AlertLevel;
  type: string;
  location: string;
  state: string;
  district: string;
  message: string;
  timestamp: string;
  source: string;
}

export interface District {
  id: string;
  name: string;
  state: string;
  isCoastal: boolean;
  alertLevel: AlertLevel;
  windSpeed: number;
  rainfall: number;
  floodRisk: string;
  roadStatus: string;
  coordinates: [number, number]; // [lat, lon]
}

export interface HistoricalCyclone {
  id: string;
  name: string;
  year: number;
  category: number;
  maxWind: number;
  minPressure: number;
  landfallPoint: string;
  fatalities: number;
  damage: number; // In billions
}

export interface PredictionResult {
  timestamp: string;
  lat: number;
  lon: number;
  intensity: number;
  confidence: number; // %
}

export interface DataSourceStatus {
  id: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  lastUpdated: string;
  latency: number; // ms
}

export interface SimulationParams {
  speed: number;
  intensityChange: number;
  trackDeviation: number;
  seaSurfaceTempChange: number;
}

export interface SimulationResult {
  step: number;
  state: CycloneData;
  impacts: any; 
}

export enum AppMode {
  LIVE = 'LIVE',
  SIMULATION = 'SIMULATION',
  HISTORICAL = 'HISTORICAL',
}

export enum MapStyle {
  GEOGRAPHIC = 'GEOGRAPHIC',
  SATELLITE = 'SATELLITE',
  OCEAN = 'OCEAN',
}

export interface MapLayer {
  id: string;
  name: string;
  type: string;
  url: string;
  visible: boolean;
  opacity: number;
}
