import React, { useState, useMemo } from 'react';
import {
  Sliders,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRightLeft,
  Info
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { TeamId } from '../types';
import { simulateWorkloadShift } from '../utils/calculations';

export const WorkloadPlanner: React.FC = () => {
  const {
    teams,
    tasks,
    customMoveTasks,
    resetToBaseline,
    isSimulatedActive,
    showToast,
    openExplainabilityModal,
    recommendations
  } = useWorkforce();

  // Rebalancing state
  const [tasksToShift, setTasksToShift] = useState<number>(12);
  const [fromTeamId, setFromTeamId] = useState<TeamId>('engineering');
  const [toTeamId, setToTeamId] = useState<TeamId>('qa');

  const fromTeam = useMemo(() => teams.find(t => t.id === fromTeamId)!, [teams, fromTeamId]);
  const toTeam = useMemo(() => teams.find(t => t.id === toTeamId)!, [teams, toTeamId]);

  // Projected impact
  const projection = useMemo(() => {
    return simulateWorkloadShift(tasksToShift, fromTeam, toTeam);
  }, [tasksToShift, fromTeam, toTeam]);

  const handleApplyShift = () => {
    customMoveTasks(tasksToShift, fromTeamId, toTeamId);
  };

  const reassignableEngineeringTasks = tasks.filter(t => t.teamId === 'engineering' && t.canReassign);

  return (
    <div className="space-y-6">
      {/* Top Planner Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <Sliders className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Workload Balancer & Capacity Planner</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 uppercase tracking-wider">
                Interactive Model
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Dynamically model moving medium-priority backlog and unit testing from saturated teams to departments with verified buffer bandwidth.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isSimulatedActive && (
              <button
                onClick={resetToBaseline}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset to Baseline</span>
              </button>
            )}
            <button
              onClick={handleApplyShift}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-900/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Workload Rebalance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Team Capacity Progress Comparison */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Team Capacity vs Target Threshold</h3>
            <p className="text-xs text-slate-500">Target operational capacity is calibrated at 85% - 95% nominal availability.</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Nominal 100% = Standard 40h/week</span>
        </div>

        <div className="space-y-4">
          {teams.map(team => {
            const isOverloaded = team.capacityUtilization >= 105;
            const isBuffer = team.capacityUtilization <= 85;

            return (
              <div key={team.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: team.color }}></span>
                    <span className="font-bold text-xs text-slate-900">{team.name}</span>
                    <span className="text-[11px] text-slate-500">
                      ({team.workloadHours}h assigned / {team.availableHours}h baseline)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isOverloaded && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 uppercase">
                        Overloaded (+{team.capacityUtilization - 100}%)
                      </span>
                    )}
                    {isBuffer && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                        Available Buffer ({100 - team.capacityUtilization}%)
                      </span>
                    )}
                    <span className="font-mono font-black text-xs text-slate-800">
                      {team.capacityUtilization}%
                    </span>
                  </div>
                </div>

                {/* Dual Progress Bars */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        team.capacityUtilization > 110
                          ? 'bg-red-500'
                          : team.capacityUtilization > 100
                          ? 'bg-amber-500'
                          : 'bg-brand-600'
                      }`}
                      style={{ width: `${Math.min(100, (team.capacityUtilization / 130) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>0%</span>
                    <span className="text-slate-500 font-semibold">Target: 95%</span>
                    <span>130% Cap</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Simulation Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900">Workload Shift Simulator</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 uppercase">
                Scenario Model
              </span>
            </div>

            {/* Shift Parameters */}
            <div className="space-y-4 text-xs">
              {/* Slider for Tasks */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-800">
                    Volume of Tasks to Rebalance:
                  </label>
                  <span className="font-mono text-sm font-black text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                    {tasksToShift} Tasks (~{Math.round(tasksToShift * 11.5)} hrs)
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="16"
                  step="1"
                  value={tasksToShift}
                  onChange={e => setTasksToShift(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>2 tasks</span>
                  <span>Recommended: 12 tasks</span>
                  <span>16 tasks</span>
                </div>
              </div>

              {/* Source & Destination Selectors */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    From Overloaded Team:
                  </label>
                  <select
                    value={fromTeamId}
                    onChange={e => setFromTeamId(e.target.value as TeamId)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 text-xs focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="engineering">Engineering Team (118%)</option>
                    <option value="integration">Integration Team (110%)</option>
                    <option value="solutions">Solutions Team (93%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    To Absorbing Team:
                  </label>
                  <select
                    value={toTeamId}
                    onChange={e => setToTeamId(e.target.value as TeamId)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 text-xs focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="qa">QA & Test Engineering (83%)</option>
                    <option value="support">Support Team (71%)</option>
                    <option value="integration">Integration Team (110%)</option>
                  </select>
                </div>
              </div>

              {/* Reassignable Task Sample */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 block mb-2">
                  Sample Identified Reassignable Tasks ({reassignableEngineeringTasks.length} eligible):
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {reassignableEngineeringTasks.slice(0, 5).map(task => (
                    <div key={task.id} className="p-2 rounded bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px]">
                      <div className="truncate mr-2">
                        <span className="font-semibold text-slate-800">{task.title}</span>
                        <span className="block text-[10px] text-slate-400">{task.projectName} • {task.complexity} complexity</span>
                      </div>
                      <span className="font-mono text-slate-600 shrink-0 font-bold">{task.estimatedHours}h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={handleApplyShift}
              className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Execute Rebalancing Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Projected Impact Cards */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-panel p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-300" />
                <h3 className="text-sm font-bold text-white">Projected Operational Impact</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AI Projection
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 mb-4">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  {fromTeam.name} Capacity
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-white">
                    {fromTeam.capacityUtilization}% → {projection.fromTeamNewCapacity}%
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-1">
                  ↓ Normalized to target band
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Overtime Reduction
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-emerald-400">
                    {projection.fromTeamOvertimeDelta}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold block mt-1">
                  Mitigates code rework rate
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Deadline Slippage Risk
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-emerald-400">
                    -{projection.deadlineRiskReduction}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold block mt-1">
                  Lower milestone breach risk
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Backlog Clearance
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-emerald-400">
                    -{projection.backlogReduction} Tasks
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold block mt-1">
                  Throughput acceleration
                </span>
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-bold text-white block mb-0.5">Model Recommendation Rationale:</span>
              Absorbing {tasksToShift} verification and schema check tasks into QA increases QA utilization from {toTeam.capacityUtilization}% to {projection.toTeamNewCapacity}%, which remains well inside healthy thresholds while removing cognitive fatigue from Engineering leads.
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Disclaimer: AI projections are mathematical models based on historical patterns.</span>
            <button
              onClick={() => {
                const rec = recommendations[0];
                if (rec) openExplainabilityModal(rec);
              }}
              className="text-brand-300 hover:text-white underline font-medium"
            >
              Why this plan?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
