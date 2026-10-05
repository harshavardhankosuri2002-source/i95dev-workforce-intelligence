import React, { useMemo } from 'react';
import {
  Network,
  Users,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useWorkforce } from '../context/WorkforceContext';
import { TeamId } from '../types';

export const TeamsDetail: React.FC = () => {
  const {
    teams,
    selectedTeamId,
    setSelectedTeamId,
    trends,
    employees,
    tasks,
    setActiveTab,
    openExplainabilityModal,
    recommendations
  } = useWorkforce();

  const currentTeam = useMemo(() => {
    return teams.find(t => t.id === selectedTeamId) || teams[0];
  }, [teams, selectedTeamId]);

  const teamEmployees = useMemo(() => {
    return employees.filter(e => e.teamId === currentTeam.id);
  }, [employees, currentTeam]);

  const teamTasks = useMemo(() => {
    return tasks.filter(t => t.teamId === currentTeam.id);
  }, [tasks, currentTeam]);

  // Specific team health score calculation
  const teamHealthScore = useMemo(() => {
    if (currentTeam.id === 'engineering') return 68;
    if (currentTeam.id === 'integration') return 76;
    if (currentTeam.id === 'solutions') return 84;
    if (currentTeam.id === 'qa') return 92;
    return 91;
  }, [currentTeam]);

  return (
    <div className="space-y-6">
      {/* Team Selector Tab Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
          Select Team:
        </span>
        {teams.map(t => {
          const isSelected = t.id === currentTeam.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTeamId(t.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : ''}`}
                style={!isSelected ? { backgroundColor: t.color } : {}}
              ></span>
              <span>{t.name}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-brand-700 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {t.capacityUtilization}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Team Header & Health Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTeam.color }}></span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{currentTeam.name}</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {currentTeam.department}
              </span>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                currentTeam.riskLevel === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                currentTeam.riskLevel === 'High' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {currentTeam.riskLevel} Risk
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {currentTeam.description}
            </p>
          </div>

          {/* Team Health Metric */}
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Team Health</span>
              <span className="text-2xl font-black text-slate-900 font-sans">{teamHealthScore} <span className="text-xs font-normal text-slate-400">/ 100</span></span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-200 flex items-center justify-center font-bold text-xs font-mono" style={{ borderColor: currentTeam.color }}>
              {currentTeam.capacityUtilization}%
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-5">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Capacity</span>
            <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{currentTeam.capacityUtilization}%</span>
            <span className="text-[10px] text-slate-500">Utilization</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Workload</span>
            <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{currentTeam.workloadHours}h</span>
            <span className="text-[10px] text-slate-500">Assigned</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Baseline</span>
            <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{currentTeam.availableHours}h</span>
            <span className="text-[10px] text-slate-500">Available</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Overtime</span>
            <span className={`text-base font-bold font-mono mt-0.5 block ${currentTeam.overtimeRate > 10 ? 'text-red-600' : 'text-slate-900'}`}>
              +{currentTeam.overtimeRate}%
            </span>
            <span className="text-[10px] text-slate-500">Weekly rate</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Completion</span>
            <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{currentTeam.taskCompletionRate}%</span>
            <span className="text-[10px] text-slate-500">Milestone SLA</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Quality</span>
            <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{currentTeam.qualityScore}%</span>
            <span className="text-[10px] text-slate-500">First-pass</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Rework Rate</span>
            <span className={`text-base font-bold font-mono mt-0.5 block ${currentTeam.reworkRate > 7 ? 'text-red-600' : 'text-slate-900'}`}>
              {currentTeam.reworkRate}%
            </span>
            <span className="text-[10px] text-slate-500">Bug churn</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Engagement</span>
            <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{currentTeam.engagementScore}</span>
            <span className="text-[10px] text-slate-500">Pulse / 100</span>
          </div>
        </div>
      </div>

      {/* AI Explanation Callout */}
      <div className="p-5 rounded-xl border border-brand-200 bg-brand-50/70 text-brand-950 flex items-start gap-4 shadow-sm">
        <Sparkles className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm tracking-tight text-brand-950">
              AI Operational Diagnosis: {currentTeam.name}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-800 border border-brand-200">
              Confidence: 93%
            </span>
          </div>
          <p className="leading-relaxed text-slate-700">
            {currentTeam.id === 'engineering' ? (
              <>
                Productivity declined <strong>6%</strong> despite a <strong>19% increase in working hours</strong>. The strongest statistical correlation detected (r = 0.88) is between <strong>increased task complexity on Project Alpha</strong> and <strong>rising code rework (9%)</strong>. Fatigue accumulated over 4 consecutive weeks of overtime is a <em>likely contributor</em> to milestone drag.
              </>
            ) : currentTeam.id === 'integration' ? (
              <>
                Backlog volume climbed <strong>21%</strong> while delivery completion slipped <strong>8%</strong>. Telemetry indicates overlapping high-complexity ERP schema mappings as a <em>potential contributor</em> to the throughput stall.
              </>
            ) : (
              <>
                Team operations are in a stable, healthy band with nominal capacity utilization at <strong>{currentTeam.capacityUtilization}%</strong>. This team possesses verified buffer headroom capable of absorbing cross-departmental testing and validation workload.
              </>
            )}
          </p>

          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-brand-200/60">
            <button
              onClick={() => setActiveTab('workload')}
              className="font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1"
            >
              <span>Simulate Rebalancing {currentTeam.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 8-Week Trend Charts */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">8-Week Telemetry Trend History</h3>
            <p className="text-xs text-slate-500">Tracking capacity saturation vs output stability over trailing sprint cycles.</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Weekly resolution</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 400]} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 15]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '11px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar yAxisId="left" dataKey="overtimeHours" name="Overtime Hours Logged" fill="#f87171" radius={[4, 4, 0, 0]} barSize={24} />
              <Line yAxisId="right" type="monotone" dataKey="reworkRate" name="Rework / Bug Rate %" stroke="#ea580c" strokeWidth={3} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="taskComplexity" name="Complexity Index" stroke="#6366f1" strokeWidth={2} strokeDasharray="3 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Member Workload Allocation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Member Workload & Capacity Allocations</h3>
            <p className="text-xs text-slate-500">Authorized leadership view. Aggregate team-level balance diagnostics.</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">{teamEmployees.length} Members</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {teamEmployees.map(emp => (
            <div key={emp.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">{emp.name}</span>
                  <span className="text-[11px] text-slate-500">{emp.role}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  emp.utilizationPct > 115 ? 'bg-red-50 text-red-700 border-red-200' :
                  emp.utilizationPct > 100 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {emp.utilizationPct}% cap
                </span>
              </div>

              <div className="space-y-1 mt-2 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Weekly Logged:</span>
                  <span className="font-mono font-semibold text-slate-800">{emp.assignedHoursWeekly}h ({emp.overtimeHoursWeekly > 0 ? `+${emp.overtimeHoursWeekly}h OT` : 'no OT'})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tasks Assigned:</span>
                  <span className="font-mono font-semibold text-slate-800">{emp.tasksAssignedCount} active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Engagement Pulse:</span>
                  <span className={`font-mono font-semibold ${emp.engagementIndex < 70 ? 'text-amber-600' : 'text-slate-800'}`}>
                    {emp.engagementIndex} / 100
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
