import React, { useState, useMemo } from 'react';
import {
  FolderKanban,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { Project, RiskLevel } from '../types';

export const ProjectsView: React.FC = () => {
  const { projects, teams, setActiveTab, setSelectedTeamId, showToast } = useWorkforce();
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (filterTeam !== 'all' && p.leadTeamId !== filterTeam) return false;
      if (filterRisk !== 'all' && p.risk !== filterRisk) return false;
      return true;
    });
  }, [projects, filterTeam, filterRisk]);

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <FolderKanban className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Active Projects & Deadline Clustering</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                {projects.length} Active Engagements
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Real-time portfolio surveillance tracking milestone concentration, complexity indices, and team delivery capacity.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2.5">
            <select
              value={filterTeam}
              onChange={e => setFilterTeam(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:ring-1 focus:ring-brand-500"
            >
              <option value="all">All Lead Teams</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <select
              value={filterRisk}
              onChange={e => setFilterRisk(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:ring-1 focus:ring-brand-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="Critical">Critical Risk</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deadline Concentration AI Alert */}
      <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/80 text-amber-900 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-sm text-amber-950 block">
            Critical Deadline Clustering Detected: October 19 – October 29
          </span>
          <p className="text-amber-800 mt-1 leading-relaxed">
            <strong>Project Alpha (SAP S/4HANA Sync)</strong> and <strong>Project Beta (BigCommerce B2B)</strong> deliver major production releases within 10 days of each other. Together they consume <strong>64% of total Engineering and Integration bandwidth</strong>, generating the acute overtime spike (+21%).
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map(proj => {
          const team = teams.find(t => t.id === proj.leadTeamId);
          const isCritical = proj.risk === 'Critical';

          return (
            <div
              key={proj.id}
              className={`bg-white rounded-xl border p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between ${
                isCritical ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-200'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getRiskBadge(proj.risk)}`}>
                    {proj.risk} Risk
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    Due: {proj.deadline}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                  {proj.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Client: {proj.client}
                </p>

                {/* Lead Team Badge */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: team?.color }}></span>
                  <span className="font-semibold">{team?.name}</span>
                  <span className="text-slate-400">• {proj.taskCount} tasks assigned</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3.5 space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                    <span>Milestone Completion</span>
                    <span className="font-mono">{proj.progressPct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isCritical ? 'bg-red-500' : proj.progressPct > 70 ? 'bg-emerald-500' : 'bg-brand-600'
                      }`}
                      style={{ width: `${proj.progressPct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Complexity & Pressure Indexes */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px]">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Complexity Index</span>
                    <span className="font-mono font-bold text-slate-800">{proj.complexityIndex} / 10</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Deadline Pressure</span>
                    <span className={`font-mono font-bold ${proj.deadlinePressure > 80 ? 'text-red-600' : 'text-slate-800'}`}>
                      {proj.deadlinePressure} / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedTeamId(proj.leadTeamId);
                    setActiveTab('teams');
                  }}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  <span>Team Workload</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab('workload')}
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Rebalance Tasks
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
