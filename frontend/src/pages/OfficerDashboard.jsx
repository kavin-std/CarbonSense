import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Search, Filter } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import FactoryCard from '../components/FactoryCard';
import { useData } from '../context/DataContext';

const OfficerDashboard = () => {
  const { factories, calculateFactoryMetrics } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Enhance factories with metrics
  const factoriesWithMetrics = useMemo(() => {
    return factories.map(f => {
      const metrics = calculateFactoryMetrics(f);
      return {
        ...f,
        energy: Math.round(metrics.totalEnergy),
        emissions: Math.round(metrics.totalEmissions)
      };
    });
  }, [factories, calculateFactoryMetrics]);

  // Filter factories based on search and type
  const filteredFactories = factoriesWithMetrics.filter(factory => {
    const matchesSearch = factory.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          factory.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || factory.type === filterType;
    return matchesSearch && matchesType;
  });

  const industryTypes = ['All', ...new Set(factories.map(f => f.type))];

  // Prepare data for industry comparison chart
  const industryData = useMemo(() => {
    const data = {};
    factoriesWithMetrics.forEach(f => {
      if (!data[f.type]) {
        data[f.type] = { type: f.type, emissions: 0, energy: 0, count: 0 };
      }
      data[f.type].emissions += f.emissions;
      data[f.type].energy += f.energy;
      data[f.type].count += 1;
    });
    return Object.values(data);
  }, [factoriesWithMetrics]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Regional Overview</h1>
        <p className="text-gray-500 mt-1">Monitor and compare factory emissions across the network.</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Total Daily Emissions by Industry (kg CO₂e)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="emissions" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Current Daily Emissions by Factory (kg CO₂e)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={factoriesWithMetrics} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 12 }} width={120} />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="emissions" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Factory List Section */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Monitored Facilities</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search factories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
              >
                {industryTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFactories.map(factory => (
            <FactoryCard key={factory.id} factory={factory} />
          ))}
          {filteredFactories.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100 border-dashed">
              No factories found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
