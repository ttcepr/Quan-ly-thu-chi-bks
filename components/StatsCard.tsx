import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  colorClass: string;
  bgClass: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, colorClass, bgClass }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${colorClass}`}>{value}</h3>
        {trend && <p className="text-xs text-gray-400 mt-2">{trend}</p>}
      </div>
      <div className={`p-3 rounded-lg ${bgClass} ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
};