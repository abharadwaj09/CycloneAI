import { Alert, AtmosphereData, CycloneData, DataSourceStatus, District, HistoricalCyclone, OceanData, RainfallData, WindData } from '../types';
import { DEMO_ALERTS, DEMO_ATMOSPHERE_DATA, DEMO_CYCLONE_DATA, DEMO_DATA_SOURCES, DEMO_DISTRICTS, DEMO_HISTORICAL_CYCLONES, DEMO_OCEAN_DATA, DEMO_RAINFALL_CITIES, DEMO_WIND_DATA } from './demo-data';

class DataService {
  private static instance: DataService;
  
  private constructor() {}

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public isLiveMode(): boolean {
    return !!process.env.NEXT_PUBLIC_LIVE_DATA_API_KEY;
  }

  public async getCycloneData(): Promise<CycloneData[]> {
    if (this.isLiveMode()) {
      // Implement real API call here
      return Promise.resolve([DEMO_CYCLONE_DATA]);
    }
    return Promise.resolve([DEMO_CYCLONE_DATA]);
  }

  public async getRainfallData(location: string): Promise<RainfallData> {
    if (this.isLiveMode()) {
      // Implement real API call here
    }
    const data = DEMO_RAINFALL_CITIES.find(c => c.city.toLowerCase() === location.toLowerCase());
    return Promise.resolve(data || DEMO_RAINFALL_CITIES[0]);
  }

  public async getWindData(location: string): Promise<WindData> {
    return Promise.resolve(DEMO_WIND_DATA);
  }

  public async getOceanData(): Promise<OceanData> {
    return Promise.resolve(DEMO_OCEAN_DATA);
  }

  public async getAtmosphereData(location: string): Promise<AtmosphereData> {
    return Promise.resolve(DEMO_ATMOSPHERE_DATA);
  }

  public async getAlerts(): Promise<Alert[]> {
    return Promise.resolve(DEMO_ALERTS);
  }

  public async getDistricts(): Promise<District[]> {
    return Promise.resolve(DEMO_DISTRICTS);
  }

  public async getHistoricalCyclones(): Promise<HistoricalCyclone[]> {
    return Promise.resolve(DEMO_HISTORICAL_CYCLONES);
  }

  public async getDataSourceStatus(): Promise<DataSourceStatus[]> {
    return Promise.resolve(DEMO_DATA_SOURCES);
  }
}

export const dataService = DataService.getInstance();
