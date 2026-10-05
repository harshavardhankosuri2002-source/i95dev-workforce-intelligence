import React from 'react';
import { AlertCircle, AlertTriangle, ArrowRight, ShieldAlert, Clock, CheckCircle } from 'lucide-react';
import { OperationalRisk } from '../types';
import { useWorkforce } from '../context/WorkforceContext';

interface RiskCardProps {
  risk: OperationalRisk;
}

export const RiskCard: React.FC<RiskCardProps> = ({ risk }) => {
  const { setActiveTab, recommendations, openExplainabilityModal, navigateToTeam } = useWorkforce();

  const getSeverityBadge = () => {
    switch (risk.severity) {
      case 'critical':
        return {
          icon: ShieldAlert,
          label: 'Critical Risk',
          border: 'border-red-200',
          bg: 'bg-red-50/50',
          badge: 'bg-red-100 text-red-800 border-red-200',
          accent: 'text-red-600',
          dot: 'bg-red-500'
        };
      case 'high':
        return {
          icon: AlertTriangle,
          label: 'High Attention',
          border: 'border-amber-200',
          bg: 'bg-amber-50/50',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          accent: 'text-amber-600',
          dot: 'bg-amber-500'
        };
      case 'monitor':
        return {
          icon: AlertCircle,
          label: 'Monitor Closely',
          border: 'border-blue-200',
          bg: 'bg-blue-50/50',
          badge: 'bg-blue-100 text-blue-800 border-blue-200',
          accent: 'text-blue-600',
          dot: 'bg-blue-500'
        };
      default:
        return {
          icon: AlertCircle,
          label: 'Operational Note',
          border: 'border-slate-200',
          bg: 'bg-slate-50',
          badge: 'bg-slate-100 text-slate-800 border-slate-200',
          accent: 'text-slate-600',
          dot: 'bg-slate-500'
        };
    }
  };

  const style = getSeverityBadge();
  const Icon = style.icon;

  const handleReview = () => {
    const rec = recommendations.find(r => r.id === risk.recommendationId);
    if (rec) {
      openExplainabilityModal(rec);
    } else {
      setActiveTab('recommendations');
    }
  };

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} p-4 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
            <button
              onClick={() => navigateToTeam(risk.teamId)}
              className="text-xs font-bold text-slate-900 hover:text-brand-600 transition-colors tracking-tight text-left"
            >
              {risk.teamName}
            </button>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
            {style.label}
          </span>
        </div>

        {/* Headline & Details */}
        <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-snug">
          {risk.headline}
        </h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          {risk.metricDetails}
        </p>

        {/* Potential Cause Box */}
        <div className="mt-3 p-2.5 rounded-lg bg-white/80 border border-slate-200/80 text-[11px]">
          <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider mb-0.5">
            Potential Cause:
          </span>
          <span className="text-slate-600 leading-tight">
            {risk.potentialCause}
          </span>
        </div>

        {/* Recommended Action */}
        <div className="mt-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 text-[11px]">
          <span className="font-bold text-brand-800 block text-[10px] uppercase tracking-wider mb-0.5">
            Recommended Action:
          </span>
          <span className="text-slate-700 leading-tight">
            {risk.recommendedAction}
          </span>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
        <button
          onClick={() => navigateToTeam(risk.teamId)}
          className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          View Team Metrics
        </button>
        <button
          onClick={handleReview}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold shadow-sm transition-all group"
        >
          <span>Review Recommendation</span>
          <ArrowRight className="w-3.5 h-3.5 text-brand-600 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
