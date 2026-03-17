import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialFactories, industryMachineryTemplates, emissionFactors } from '../data/dummyData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [factories, setFactories] = useState(() => {
    const stored = localStorage.getItem('carbonSense_factories');
    return stored ? JSON.parse(stored) : initialFactories;
  });

  useEffect(() => {
    localStorage.setItem('carbonSense_factories', JSON.stringify(factories));
  }, [factories]);

  const addFactory = (factoryData) => {
    const newFactory = {
      ...factoryData,
      id: `f-${Date.now()}`,
      machines: industryMachineryTemplates[factoryData.type].map(m => ({...m, id: `f-${Date.now()}-${m.id}`}))
    };
    setFactories(prev => [...prev, newFactory]);
    return newFactory;
  };

  const getFactoryByOwner = (email) => {
    return factories.find(f => f.ownerEmail === email);
  };

  const calculateFactoryMetrics = (factory) => {
    if (!factory) return { totalEnergy: 0, totalEmissions: 0, machineMetrics: [] };
    
    const factor = factory.hasPPA ? emissionFactors[factory.ppaSource] : emissionFactors['Grid (Default)'];
    
    let totalEnergy = 0;
    let totalEmissions = 0;
    const machineMetrics = factory.machines.map(m => {
      const dailyEnergy = m.powerKW * m.dailyHours;
      const dailyEmissions = dailyEnergy * factor; // in kg CO2
      totalEnergy += dailyEnergy;
      totalEmissions += dailyEmissions;
      return {
        ...m,
        dailyEnergy,
        dailyEmissions
      };
    });

    return {
      totalEnergy,
      totalEmissions, // in kg CO2 per day
      machineMetrics
    };
  };

  return (
    <DataContext.Provider value={{ factories, addFactory, getFactoryByOwner, calculateFactoryMetrics }}>
      {children}
    </DataContext.Provider>
  );
};
