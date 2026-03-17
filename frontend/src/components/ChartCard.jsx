import React from 'react';

const ChartCard = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="w-full h-64">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
