import React from 'react';
import {
  Settings as SettingsIcon,
  Sliders,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Lock,
  FileText,
  AlertTriangle,
  Users2
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { defaultWeights } from '../data/mockData';

export const Settings: React.FC = () => {
  const {
    weights,
    updateWeights,
    setWeights,
    auditLog,
    showToast
  } = useWorkforce();

  const handleSliderChange = (key: keyof typeof weights, value: number) => {
    updateWeights({ [key]: value });
  };

  const handleResetWeights = () => {
    setWeights(defaultWeights);
    showToast('Reset AI scoring weights to enterprise default baseline.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <SettingsIcon className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">System & AI Model Configuration</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                Model Telemetry v2.4
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Transparent, tunable weights powering the Workforce Health Index calculation and operational alert trigger thresholds.
            </p>
          </div>

          <button
            onClick={handleResetWeights}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </div>

      {/* Model Weights Tuner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Workforce Health Index Composite Weights</h3>
            <p className="text-xs text-slate-500">
              Weights reflect operational priorities across capacity, workload balance, velocity, quality, engagement, and fatigue.
            </p>
          </div>
          <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
            Total Sum: {weights.capacityWeight + weights.workloadWeight + weights.productivityWeight + weights.qualityWeight + weights.engagementWeight + weights.sustainabilityWeight}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <div className="flex justify-between font-bold text-slate-800 mb-1.5">
              <span>Capacity Weight:</span>
              <span className="font-mono text-brand-700">{weights.capacityWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={weights.capacityWeight}
              onChange={e => handleSliderChange('capacityWeight', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <span className="text-[10px] text-slate-400 block mt-1">Nominal utilization vs headcount</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <div className="flex justify-between font-bold text-slate-800 mb-1.5">
              <span>Workload Balance Weight:</span>
              <span className="font-mono text-brand-700">{weights.workloadWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={weights.workloadWeight}
              onChange={e => handleSliderChange('workloadWeight', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <span className="text-[10px] text-slate-400 block mt-1">Cross-team variance distribution</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <div className="flex justify-between font-bold text-slate-800 mb-1.5">
              <span>Productivity Weight:</span>
              <span className="font-mono text-brand-700">{weights.productivityWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={weights.productivityWeight}
              onChange={e => handleSliderChange('productivityWeight', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <span className="text-[10px] text-slate-400 block mt-1">Complexity-weighted task completion SLA</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <div className="flex justify-between font-bold text-slate-800 mb-1.5">
              <span>Quality & Rework Weight:</span>
              <span className="font-mono text-brand-700">{weights.qualityWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.qualityWeight}
              onChange={e => handleSliderChange('qualityWeight', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <span className="text-[10px] text-slate-400 block mt-1">First-pass test success and bug churn</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <div className="flex justify-between font-bold text-slate-800 mb-1.5">
              <span>Engagement Pulse Weight:</span>
              <span className="font-mono text-brand-700">{weights.engagementWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              value={weights.engagementWeight}
              onChange={e => handleSliderChange('engagementWeight', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <span className="text-[10px] text-slate-400 block mt-1">Team sentiment and workload sustainability</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
            <div className="flex justify-between font-bold text-slate-800 mb-1.5">
              <span>Sustainability & Fatigue Weight:</span>
              <span className="font-mono text-brand-700">{weights.sustainabilityWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              value={weights.sustainabilityWeight}
              onChange={e => handleSliderChange('sustainabilityWeight', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <span className="text-[10px] text-slate-400 block mt-1">Overtime trends and absenteeism risk</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
          <strong>Methodological Transparency:</strong> Weights represent operational heuristics configured by management. They are not presented as immutable scientific laws. Adjust weights to align with your organization's business cycle.
        </div>
      </div>

      {/* Audit History Log */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Decision Support Audit Log</h3>
            <p className="text-xs text-slate-500">Immutable trace of manager approvals, simulation trials, and workload reallocations.</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">{auditLog.length} Records</span>
        </div>

        <div className="space-y-2">
          {auditLog.map(log => (
            <div key={log.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 flex items-start justify-between text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <span className="text-[10px] font-mono text-slate-400">• {log.timestamp}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{log.details}</p>
                <span className="text-[10px] text-slate-400 block">Operator: {log.user} ({log.role})</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                Audited & Logged
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
