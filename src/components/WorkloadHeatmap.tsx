import React from 'react';
import { Layers, ArrowUpRight, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { TeamId } from '../types';

export const WorkloadHeatmap: React.FC = () => {
  const { teams, navigateToTeam } = useWorkforce();

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return 'text-red-700 bg-red-100/80 border-red-200';
      case 'High':
        return 'text-amber-700 bg-amber-100/80 border-amber-200';
      case 'Monitor':
        return 'text-blue-700 bg-blue-100/80 border-blue-200';
      case 'Healthy':
        return 'text-emerald-700 bg-emerald-100/80 border-emerald-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getHeatBg = (val: number, type: 'capacity' | 'workload' | 'overtime' | 'completion' | 'quality') => {
    if (type === 'workload') {
      if (val >= 115) return 'bg-red-50 text-red-900 font-bold';
      if (val >= 105) return 'bg-amber-50 text-amber-900 font-semibold';
      if (val >= 90) return 'bg-blue-50 text-blue-900 font-medium';
      return 'bg-emerald-50 text-emerald-900 font-medium';
    }
    if (type === 'overtime') {
      if (val >= 15) return 'bg-red-50 text-red-900 font-bold';
      if (val >= 10) return 'bg-amber-50 text-amber-900 font-semibold';
      return 'bg-emerald-50 text-emerald-900 font-medium';
    }
    if (type === 'completion') {
      if (val < 85) return 'bg-red-50 text-red-900 font-bold';
      if (val < 90) return 'bg-amber-50 text-amber-900 font-medium';
      return 'bg-emerald-50 text-emerald-900 font-bold';
    }
    return 'bg-slate-50/50 text-slate-800';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Team Workload Heatmap</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-departmental capacity saturation vs completion velocity. Click any team row to inspect drilldown telemetry.
          </p>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
          Target Utilization: 85% - 95%
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Team</th>
              <th className="py-3 px-4">Nominal Capacity</th>
              <th className="py-3 px-4">Assigned Workload</th>
              <th className="py-3 px-4">Overtime Trend</th>
              <th className="py-3 px-4">Task Completion</th>
              <th className="py-3 px-4">Quality Score</th>
              <th className="py-3 px-4">Risk Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {teams.map(team => {
              return (
                <tr
                  key={team.id}
                  onClick={() => navigateToTeam(team.id)}
                  className="hover:bg-brand-50/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: team.color }}
                    ></span>
                    <div>
                      <span className="group-hover:text-brand-600 transition-colors font-semibold">
                        {team.name}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {team.headCount} members • Lead: {team.lead}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {team.id === 'engineering' ? '92%' : team.id === 'integration' ? '104%' : team.id === 'qa' ? '76%' : team.id === 'support' ? '68%' : '88%'}
                  </td>

                  <td className={`py-3.5 px-4 font-mono ${getHeatBg(team.capacityUtilization, 'workload')}`}>
                    <span className="px-2 py-0.5 rounded">
                      {team.capacityUtilization}%
                    </span>
                  </td>

                  <td className={`py-3.5 px-4 font-mono ${getHeatBg(team.overtimeRate, 'overtime')}`}>
                    <span className="px-2 py-0.5 rounded">
                      +{team.overtimeRate}%
                    </span>
                  </td>

                  <td className={`py-3.5 px-4 font-mono ${getHeatBg(team.taskCompletionRate, 'completion')}`}>
                    <span className="px-2 py-0.5 rounded">
                      {team.taskCompletionRate}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    {team.qualityScore}%
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getRiskBadge(team.riskLevel)}`}>
                      {team.riskLevel}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 group-hover:text-brand-700 group-hover:underline">
                      Inspect
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
