import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap, Cloud, AlertTriangle, PlusCircle, Settings, Info } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { generateHistoricalData } from '../data/dummyData';

const FactoryDashboard = () => {
  const { user } = useAuth();
  const { getFactoryByOwner, calculateFactoryMetrics } = useData();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMachine, setSelectedMachine] = useState(null);

  const factory = getFactoryByOwner(user?.email);
  const metrics = useMemo(() => calculateFactoryMetrics(factory), [factory, calculateFactoryMetrics]);
  
  // Generate historical data based on current metrics
  const { energyHistory, carbonHistory } = useMemo(() => {
    if (!metrics.totalEnergy) return { energyHistory: [], carbonHistory: [] };
    return generateHistoricalData(metrics.totalEnergy, metrics.totalEmissions);
  }, [metrics.totalEnergy, metrics.totalEmissions]);

  if (!factory) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md w-full">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Factory Found</h2>
          <p className="text-gray-500 mb-6">You haven't registered a factory yet. Create one to start monitoring emissions.</p>
          <Link 
            to="/create-factory" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
          >
            Create Factory
          </Link>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Daily Energy Consumption</p>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(metrics.totalEnergy).toLocaleString()} <span className="text-lg font-normal text-gray-500">kWh</span>
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <Cloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Daily Carbon Emissions</p>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(metrics.totalEmissions).toLocaleString()} <span className="text-lg font-normal text-gray-500">kg CO₂e</span>
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Energy Consumption Trend (kWh)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={energyHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Carbon Emissions (kg CO₂e)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={carbonHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="emissions" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900">Carbon Reduction Suggestions</h3>
        </div>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
            <span><strong>Optimize High-Energy Machines:</strong> Focus on machines running 24/7. Consider variable frequency drives (VFDs) for motors.</span>
          </li>
          {factory.hasPPA ? (
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
              <span><strong>Maximize PPA Usage:</strong> You are using {factory.ppaSource}. Try to shift heavy operations to times when this source is most abundant.</span>
            </li>
          ) : (
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
              <span><strong>Consider a PPA:</strong> Switching to a Power Purchase Agreement (like Solar or Wind) can drastically reduce your carbon footprint.</span>
            </li>
          )}
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
            <span><strong>Equipment Maintenance:</strong> Regular maintenance of motors and compressors can improve efficiency by up to 15%.</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderMachines = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Factory Machinery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.machineMetrics.map(machine => (
            <div 
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              className={`bg-white rounded-xl shadow-sm border p-4 cursor-pointer transition-all ${
                selectedMachine?.id === machine.id 
                  ? 'border-emerald-500 ring-1 ring-emerald-500' 
                  : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${selectedMachine?.id === machine.id ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{machine.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{machine.powerKW} kW • {machine.dailyHours} hrs/day</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
          {selectedMachine ? (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedMachine.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Machine Details & Insights</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Power Rating</p>
                  <p className="font-semibold text-gray-900">{selectedMachine.powerKW} kW</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 mb-1">Daily Energy Consumption</p>
                  <p className="font-semibold text-blue-900">{selectedMachine.dailyEnergy.toLocaleString()} kWh</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600 mb-1">Est. Daily Carbon Emission</p>
                  <p className="font-semibold text-red-900">{Math.round(selectedMachine.dailyEmissions).toLocaleString()} kg CO₂</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p>{selectedMachine.note}</p>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
              <Settings className="w-12 h-12 text-gray-300 mb-3" />
              <p>Select a machine from the list to view detailed insights.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => {
    // Sort machines by energy consumption for the chart
    const sortedMachines = [...metrics.machineMetrics].sort((a, b) => b.dailyEnergy - a.dailyEnergy);
    
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <ChartCard title="Machine-wise Daily Energy Consumption (kWh)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedMachines} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 11 }} 
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="dailyEnergy" radius={[4, 4, 0, 0]}>
                {sortedMachines.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{factory.name}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">{factory.location}</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">{factory.type} Industry</span>
            <span className="text-gray-300">•</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${factory.hasPPA ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
              {factory.hasPPA ? `PPA: ${factory.ppaSource}` : 'Grid Power'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8 min-w-max px-2">
          {['overview', 'machines', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors
                ${activeTab === tab 
                  ? 'border-emerald-500 text-emerald-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'machines' && renderMachines()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default FactoryDashboard;
