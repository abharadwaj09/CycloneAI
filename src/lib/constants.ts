import { AlertLevel, MapStyle } from '../types';

export const ALERT_COLORS = {
  [AlertLevel.GREEN]: '#22C55E',
  [AlertLevel.YELLOW]: '#EAB308',
  [AlertLevel.ORANGE]: '#F97316',
  [AlertLevel.RED]: '#EF4444',
};

export const CYCLONE_CATEGORIES = [
  { id: 1, name: 'Cyclonic Storm', windRange: '62-88 km/h' },
  { id: 2, name: 'Severe Cyclonic Storm', windRange: '89-117 km/h' },
  { id: 3, name: 'Very Severe Cyclonic Storm', windRange: '118-165 km/h' },
  { id: 4, name: 'Extremely Severe Cyclonic Storm', windRange: '166-221 km/h' },
  { id: 5, name: 'Super Cyclonic Storm', windRange: '> 222 km/h' },
];

export const RAINFALL_CATEGORIES = [
  { label: 'Light Rain', range: '2.5 - 15.5 mm', color: '#60A5FA' },
  { label: 'Moderate Rain', range: '15.6 - 64.4 mm', color: '#3B82F6' },
  { label: 'Heavy Rain', range: '64.5 - 115.5 mm', color: '#2563EB' },
  { label: 'Very Heavy Rain', range: '115.6 - 204.4 mm', color: '#1D4ED8' },
  { label: 'Extremely Heavy', range: '> 204.5 mm', color: '#1E3A8A' },
];

export const INDIAN_COASTAL_STATES = [
  'Gujarat', 'Maharashtra', 'Goa', 'Karnataka', 'Kerala', 
  'Tamil Nadu', 'Andhra Pradesh', 'Odisha', 'West Bengal',
  'Andaman and Nicobar', 'Lakshadweep'
];

export const INDIAN_STATES = [
  { name: 'Gujarat', capital: 'Gandhinagar', isCoastal: true },
  { name: 'Maharashtra', capital: 'Mumbai', isCoastal: true },
  { name: 'Goa', capital: 'Panaji', isCoastal: true },
  { name: 'Karnataka', capital: 'Bengaluru', isCoastal: true },
  { name: 'Kerala', capital: 'Thiruvananthapuram', isCoastal: true },
  { name: 'Tamil Nadu', capital: 'Chennai', isCoastal: true },
  { name: 'Andhra Pradesh', capital: 'Amaravati', isCoastal: true },
  { name: 'Odisha', capital: 'Bhubaneswar', isCoastal: true },
  { name: 'West Bengal', capital: 'Kolkata', isCoastal: true },
  { name: 'Andaman and Nicobar', capital: 'Port Blair', isCoastal: true },
  { name: 'Lakshadweep', capital: 'Kavaratti', isCoastal: true },
];

export const DEFAULT_MAP_CENTER: [number, number] = [20.5937, 78.9629];
export const MAP_BOUNDS = [
  [6.753515, 68.162386], // Southwest
  [37.090000, 97.395561] // Northeast
];

export const DATA_REFRESH_INTERVALS = {
  CYCLONE: 60000 * 15,
  RADAR: 60000 * 5,
  SATELLITE: 60000 * 30,
  ALERTS: 60000,
};

export const EMERGENCY_HELPLINES = [
  { name: 'National Emergency', number: '112' },
  { name: 'Ambulance', number: '108' },
  { name: 'Police', number: '100' },
  { name: 'Fire', number: '101' },
  { name: 'NDMA Control Room', number: '1070' },
  { name: 'Disaster Helpline', number: '1078' },
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Main overview' },
  { id: 'map', label: 'Live Map', icon: 'Map', description: 'Interactive tracking map' },
  { id: 'cyclone-tracker', label: 'Cyclone Tracker', icon: 'Tornado', description: 'Active cyclone details' },
  { id: 'rainfall', label: 'Rainfall', icon: 'CloudRain', description: 'Precipitation data' },
  { id: 'wind', label: 'Wind Analysis', icon: 'Wind', description: 'Wind speed & direction' },
  { id: 'ocean', label: 'Ocean Data', icon: 'Waves', description: 'SST and wave heights' },
  { id: 'atmosphere', label: 'Atmosphere', icon: 'Thermometer', description: 'Pressure and temp' },
  { id: 'alerts', label: 'Alerts', icon: 'AlertTriangle', description: 'Warning and bulletins' },
  { id: 'districts', label: 'Districts', icon: 'MapPin', description: 'Local impact data' },
  { id: 'predictions', label: 'Numerical Forecast', icon: 'Compass', description: 'Forecast models' },
  { id: 'historical', label: 'Historical Data', icon: 'History', description: 'Past cyclones' },
  { id: 'simulation', label: 'Simulation', icon: 'PlayCircle', description: 'Impact simulator' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'Building', description: 'Critical assets' },
  { id: 'evacuation', label: 'Evacuation', icon: 'Users', description: 'Shelters and routes' },
  { id: 'reports', label: 'Reports', icon: 'FileText', description: 'Exportable data' },
  { id: 'settings', label: 'Settings', icon: 'Settings', description: 'App configuration' },
];
