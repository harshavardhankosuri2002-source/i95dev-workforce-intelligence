import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, TrendingDown, Layers, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';

export const AiInsightBanner: React.FC = () => {
  const { openRootCauseModal, setActiveTab } = useWorkforce();

  const factors = [
    { label: 'Workload', value: '+22%', trend: 'up', negative: true },
    { label: 'Overtime', value: '+18%', trend: 'up', negative: true },
    { label: 'Task Complexity', value: '+14%', trend: 'up', negative: true },
    { label: 'Completion Rate', value: '-7%', trend: 'down', negative: true },
    { label: 'Rework Rate', value: '+9%', trend: 'up', negative: true },
  ];

  return (
    <div className="rounded-xl border border-brand-200 bg-gradient-to-r from-brand-950 via-slate-900 to-brand-950 text-white p-5 shadow-panel relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-full bg-brand-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Primary AI Insight</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Confidence: <strong className="text-emerald-400 font-bold">91%</strong>
            </span>
            <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
              Multivariate Pattern Match
            </span>
          </div>

          <h3 className="text-base font-bold text-white tracking-tight leading-snug">
            AI detected a potential workload imbalance
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Working hours have increased by <span className="font-semibold text-amber-300">16%</span> over the last four weeks, but quality-adjusted productivity has decreased by <span className="font-semibold text-red-300">7%</span>. Task complexity and deadline concentration appear to be the primary contributors.
          </p>

          {/* Contributing Factor Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mr-1">
              Contributing Factors:
            </span>
            {factors.map(f => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900/80 border border-slate-700/80 text-slate-200"
              >
                <span className="text-slate-400">{f.label}</span>
                <span className={f.negative ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {f.value}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
          <button
            onClick={openRootCauseModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-brand-950 font-bold text-xs shadow-md transition-all group"
          >
            <span>View Root Cause</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-brand-700" />
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-brand-600/40 hover:bg-brand-600/60 border border-brand-500/40 text-white font-semibold text-xs transition-all"
          >
            <span>Review Workload Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
