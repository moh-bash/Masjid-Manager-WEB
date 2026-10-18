import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string; 
  colorClass?: string;
}

export function StatCard({ title, value, icon: Icon, trend, colorClass = "text-primary bg-primary/10" }: StatCardProps) {
  return (
    <div className="flex flex-col py-4 px-6 bg-white border rounded-2xl shadow-sm border-slate-100 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-primary-500">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        {trend && (
          <p className="text-xs text-emerald-600 mt-2 font-medium bg-emerald-50 w-fit px-2 py-1 rounded-md">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}