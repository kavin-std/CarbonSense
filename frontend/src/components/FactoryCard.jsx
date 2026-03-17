import React from 'react';
import { Factory, MapPin, Zap } from 'lucide-react';

const FactoryCard = ({ factory }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <Factory className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{factory.name}</h3>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{factory.type}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          {factory.location}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Zap className="w-4 h-4 text-gray-400" />
          {factory.hasPPA ? (
            <span className="text-emerald-600 font-medium">PPA: {factory.ppaSource}</span>
          ) : (
            <span>Grid Power</span>
          )}
        </div>
        
        <div className="pt-3 border-t border-gray-50 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Daily Emissions</p>
            <p className="font-semibold text-gray-900 flex items-center gap-1">
              {factory.emissions?.toLocaleString() || 0} <span className="text-xs font-normal text-gray-500">kg CO₂</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Daily Energy</p>
            <p className="font-semibold text-gray-900 flex items-center gap-1">
              {factory.energy?.toLocaleString() || 0} <span className="text-xs font-normal text-gray-500">kWh</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryCard;
