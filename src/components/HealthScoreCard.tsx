import React from 'react';
import { Activity, AlertCircle, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';

export const HealthScoreCard: React.FC = () => {
  const { healthScore, openRootCauseModal } = useWorkforce();

  const dimensions = [
    { label: 'Capacity', score: healthScore.capacity, target: '80-90', note: 'Nominal team baseline vs committed project allocations' },
    { label: 'Workload', score: healthScore.workload, target: '75-85', note: 'Distribution balance across teams (Engineering overloaded at 118%)' },
    { label: 'Productivity', score: healthScore.productivity, target: '85+', note: 'Complexity-weighted velocity vs hours invested' },
    { label: 'Quality', score: healthScore.quality, target: '90+', note: 'First-time pass rate & code stability (rework creeping to 9%)' },
    { label: 'Engagement', score: healthScore.engagement, target: '75+', note: 'Team sentiment & sustainable workload pulse' },
    { label: 'Sustainability', score: healthScore.sustainability, target: '75+', note: 'Overtime fatigue & absenteeism risk index' },
  ];

  const getScoreColor = (val: number) => {
    if (val < 65) return 'text-red-600 bg-red-50 border-red-200';
    if (val < 75) return 'text-amber-600 bg-amber-50 border-amber-200';
    if (val < 85) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  };

  const getBarColor = (val: number) => {
    if (val < 65) return 'bg-red-500';
    if (val < 75) return 'bg-amber-500';
    if (val < 85) return 'bg-brand-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-brand-50 text-brand-600 border border-brand-100">
              <Activity className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Workforce Health Score</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {healthScore.statusLabel}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Multivariate composite index evaluating team capacity, output efficiency, quality stability, and burnout risk.
          </p>
        </div>

        <button
          onClick={openRootCauseModal}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Why is Health at {healthScore.overall}?</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
        {/* Main Score Display */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-5 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100 text-center">
          <div className="relative flex items-center justify-center">
            {/* Circular Progress Ring */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="9"
                className="text-slate-100"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="9"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * healthScore.overall) / 100}
                strokeLinecap="round"
                className={healthScore.overall < 70 ? 'text-red-500' : healthScore.overall < 80 ? 'text-amber-500' : 'text-brand-600'}
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                {healthScore.overall}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{healthScore.statusLabel}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 max-w-[200px] leading-relaxed">
              Discrepancy: Working hours up 16% while velocity dropped 7%.
            </p>
          </div>
        </div>

        {/* Sub-Dimension Breakdown */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {dimensions.map((dim) => (
            <div
              key={dim.label}
              className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-700">{dim.label}</span>
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded border ${getScoreColor(dim.score)}`}>
                  {dim.score} / 100
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getBarColor(dim.score)}`}
                  style={{ width: `${dim.score}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 truncate" title={dim.note}>
                {dim.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
