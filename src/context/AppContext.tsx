'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, AppMode, CycloneData, DataSourceStatus, District, MapStyle } from '../types';
import { dataService } from '../lib/data-service';

interface AppContextType {
  currentMode: AppMode;
  setCurrentMode: (mode: AppMode) => void;
  selectedCyclone: CycloneData | null;
  setSelectedCyclone: (cyclone: CycloneData | null) => void;
  selectedDistrict: District | null;
  setSelectedDistrict: (district: District | null) => void;
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  mapStyle: MapStyle;
  setMapStyle: (style: MapStyle) => void;
  activeLayers: Set<string>;
  toggleLayer: (layerId: string) => void;
  alerts: Alert[];
  dataSourceStatuses: DataSourceStatus[];
  isLoading: boolean;
  lastUpdated: string;
  notifications: any[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.LIVE);
  const [selectedCyclone, setSelectedCyclone] = useState<CycloneData | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<MapStyle>(MapStyle.GEOGRAPHIC);
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['radar', 'satellite']));
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dataSourceStatuses, setDataSourceStatuses] = useState<DataSourceStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => {
      const newLayers = new Set(prev);
      if (newLayers.has(layerId)) {
        newLayers.delete(layerId);
      } else {
        newLayers.add(layerId);
      }
      return newLayers;
    });
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [cyclones, alertsData, statuses] = await Promise.all([
        dataService.getCycloneData(),
        dataService.getAlerts(),
        dataService.getDataSourceStatus(),
      ]);
      if (cyclones.length > 0) {
        setSelectedCyclone(cyclones[0]);
      }
      setAlerts(alertsData);
      setDataSourceStatuses(statuses);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMode]);

  return (
    <AppContext.Provider
      value={{
        currentMode,
        setCurrentMode,
        selectedCyclone,
        setSelectedCyclone,
        selectedDistrict,
        setSelectedDistrict,
        selectedLocation,
        setSelectedLocation,
        mapStyle,
        setMapStyle,
        activeLayers,
        toggleLayer,
        alerts,
        dataSourceStatuses,
        isLoading,
        lastUpdated,
        notifications,
        sidebarOpen,
        setSidebarOpen,
        searchQuery,
        setSearchQuery,
        activeModule,
        setActiveModule,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
