import React from 'react';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers,
  Clock,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { SimulationScenario } from '../types';

export const SimulationLab: React.FC = () => {
  const {
    scenarios,
    selectedScenarioId,
    applySimulationScenario,
    resetToBaseline,
    isSimulatedActive
  } = useWorkforce();

  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <FlaskConical className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Executive Simulation Lab</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
                Scenario Stress Testing
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Stress-test operational strategies in sandbox mode before committing to team restructuring or project re-sequencing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isSimulatedActive && (
              <button
                onClick={resetToBaseline}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset to Status Quo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scenario Picker Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {scenarios.map(s => {
          const isSelected = s.id === selectedScenarioId;
          return (
            <button
              key={s.id}
              onClick={() => applySimulationScenario(s.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-600 ring-2 ring-brand-500/20 bg-brand-50/50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    Scenario {s.id}
                  </span>
                  {s.id === 'A' && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Recommended
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                  {s.name.split(':')[1] || s.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                  {s.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Capacity:</span>
                <span className="font-mono font-bold text-slate-800">{s.capacity}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Comparative Matrix: Current vs Recommended vs Selected Scenario */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Scenario Comparative Performance Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Direct comparison of operational variables across potential intervention models.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 italic">
            AI projections are estimates based on historical and simulated data.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Operational Dimension</th>
                <th className="py-3 px-4 bg-slate-100/70 text-slate-700">Current (Status Quo)</th>
                <th className="py-3 px-4 bg-brand-50/70 text-brand-900 font-black">Scenario A (Recommended)</th>
                <th className="py-3 px-4">Scenario B (Contractors)</th>
                <th className="py-3 px-4">Scenario C (Extend Deadlines)</th>
                <th className="py-3 px-4">Scenario D (Reduce Scope)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Engineering Capacity</td>
                <td className="py-3.5 px-4 bg-slate-50/40 font-mono text-red-600 font-bold">118% (Critical)</td>
                <td className="py-3.5 px-4 bg-brand-50/30 font-mono text-emerald-700 font-bold">96% (Optimal)</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">88%</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">101%</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">94%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Overtime Rate</td>
                <td className="py-3.5 px-4 bg-slate-50/40 font-mono text-red-600 font-bold">+21% (Severe)</td>
                <td className="py-3.5 px-4 bg-brand-50/30 font-mono text-emerald-700 font-bold">+5% (Healthy)</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">+2%</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">+8%</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">+4%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Milestone Completion SLA</td>
                <td className="py-3.5 px-4 bg-slate-50/40 font-mono text-slate-700">81%</td>
                <td className="py-3.5 px-4 bg-brand-50/30 font-mono text-emerald-700 font-bold">89%</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">92%</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">86%</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">90%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Active Backlog Volume</td>
                <td className="py-3.5 px-4 bg-slate-50/40 font-mono text-red-600">126 Tasks</td>
                <td className="py-3.5 px-4 bg-brand-50/30 font-mono text-emerald-700 font-bold">108 Tasks</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">94 Tasks</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">116 Tasks</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">102 Tasks</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Deadline Slippage Risk</td>
                <td className="py-3.5 px-4 bg-slate-50/40 font-mono text-red-600 font-bold">Critical</td>
                <td className="py-3.5 px-4 bg-brand-50/30 font-mono text-amber-700 font-bold">Medium</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold">Low</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold">Low</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold">Low</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Sustainability Index</td>
                <td className="py-3.5 px-4 bg-slate-50/40 font-mono text-red-600 font-bold">61 / 100</td>
                <td className="py-3.5 px-4 bg-brand-50/30 font-mono text-emerald-700 font-bold">84 / 100</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">89 / 100</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">78 / 100</td>
                <td className="py-3.5 px-4 font-mono text-slate-800">86 / 100</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Direct Financial Cost</td>
                <td className="py-3.5 px-4 bg-slate-50/40 font-mono text-slate-700">$0 (High burn)</td>
                <td className="py-3.5 px-4 bg-brand-50/30 font-mono text-emerald-700 font-bold">$0 (Zero extra cost)</td>
                <td className="py-3.5 px-4 font-mono text-red-600 font-semibold">+$14,500/mo</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">$0</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">Minor deferred</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Selected Scenario Execution Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-bold text-slate-800">Active Selected Scenario:</span>{' '}
            <span className="text-brand-700 font-semibold">{currentScenario.name}</span>
          </div>

          <button
            onClick={() => applySimulationScenario(selectedScenarioId)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply Selected Scenario to Live Model</span>
          </button>
        </div>
      </div>
    </div>
  );
};
