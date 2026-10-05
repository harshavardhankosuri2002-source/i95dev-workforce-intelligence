import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Gauge,
  Zap,
  Clock,
  CheckSquare,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { ExecutiveKpi } from '../types';

interface KpiCardProps {
  kpi: ExecutiveKpi;
}

export const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'capacity':
        return Gauge;
      case 'productivity':
        return Zap;
      case 'overtime':
        return Clock;
      case 'completion':
        return CheckSquare;
      case 'backlog':
        return Layers;
      case 'engagement':
        return HeartHandshake;
      default:
        return Gauge;
    }
  };

  const Icon = getIcon(kpi.id);

  const getStatusBadge = () => {
    switch (kpi.status) {
      case 'critical':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'warning':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'healthy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const isDownturn = kpi.changeText.includes('↓') || (kpi.changeText.includes('↑') && (kpi.id === 'overtime' || kpi.id === 'backlog' || kpi.id === 'capacity'));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 hover:shadow-card-hover transition-all hover:border-slate-300 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 tracking-tight">{kpi.label}</span>
          <div className="p-1.5 rounded-md bg-slate-50 text-slate-400 border border-slate-100">
            <Icon className="w-4 h-4 text-brand-600" />
          </div>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            {kpi.value}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-semibold">
            {isDownturn ? (
              <TrendingDown className="w-3.5 h-3.5 text-red-500 shrink-0" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            )}
            <span className={isDownturn ? 'text-red-700 font-bold' : 'text-emerald-700 font-bold'}>
              {kpi.changeText}
            </span>
          </div>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getStatusBadge()}`}>
            {kpi.status}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 truncate" title={kpi.benchmark}>
          {kpi.benchmark}
        </p>
      </div>
    </div>
  );
};
