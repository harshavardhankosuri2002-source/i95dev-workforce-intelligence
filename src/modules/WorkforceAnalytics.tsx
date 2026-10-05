import React, { useState, useMemo } from 'react';
import {
  Users,
  Filter,
  Search,
  Lock,
  ShieldCheck,
  Download,
  Building,
  MapPin,
  Clock,
  TrendingDown,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { Employee, TeamId } from '../types';

export const WorkforceAnalytics: React.FC = () => {
  const { employees, teams, navigateToTeam, showToast } = useWorkforce();

  // Filters
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [authorizedView, setAuthorizedView] = useState<boolean>(true);

  const departments = useMemo(() => {
    return Array.from(new Set(employees.map(e => e.department)));
  }, [employees]);

  const locations = useMemo(() => {
    return Array.from(new Set(employees.map(e => e.location)));
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(e => {
      if (selectedDept !== 'all' && e.department !== selectedDept) return false;
      if (selectedTeam !== 'all' && e.teamId !== selectedTeam) return false;
      if (selectedLocation !== 'all' && e.location !== selectedLocation) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          e.name.toLowerCase().includes(query) ||
          e.role.toLowerCase().includes(query) ||
          e.id.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [employees, selectedDept, selectedTeam, selectedLocation, searchQuery]);

  // Aggregate Metrics for Current Filter
  const stats = useMemo(() => {
    if (filteredEmployees.length === 0) return { avgUtil: 0, avgHours: 0, avgOt: 0, avgQuality: 0, avgEng: 0 };
    const avgUtil = Math.round(filteredEmployees.reduce((acc, e) => acc + e.utilizationPct, 0) / filteredEmployees.length);
    const avgHours = Math.round(filteredEmployees.reduce((acc, e) => acc + e.assignedHoursWeekly, 0) / filteredEmployees.length);
    const avgOt = (filteredEmployees.reduce((acc, e) => acc + e.overtimeHoursWeekly, 0) / filteredEmployees.length).toFixed(1);
    const avgQuality = Math.round(filteredEmployees.reduce((acc, e) => acc + e.qualityRating, 0) / filteredEmployees.length);
    const avgEng = Math.round(filteredEmployees.reduce((acc, e) => acc + e.engagementIndex, 0) / filteredEmployees.length);
    return { avgUtil, avgHours, avgOt, avgQuality, avgEng };
  }, [filteredEmployees]);

  const handleExport = () => {
    showToast('Workforce capacity dataset exported to CSV.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Privacy Safeguard Alert */}
      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/80 text-blue-900 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 block text-sm">
              Authorized Management & Operations Planning View
            </span>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              This analytics view is restricted to authenticated leadership. <strong>No public employee ranking or gamification leaderboards are permitted.</strong> All telemetry is aggregated to detect structural capacity overload and prevent burnout.
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-300 bg-white hover:bg-blue-50 text-blue-800 text-xs font-semibold shadow-sm transition-all shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Summary</span>
        </button>
      </div>

      {/* Aggregate Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400">Sample Population</span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{filteredEmployees.length} Members</span>
          <span className="text-[10px] text-slate-500 font-medium">Across 5 specialized teams</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400">Avg Utilization</span>
          <span className={`text-2xl font-black block mt-1 ${stats.avgUtil > 105 ? 'text-red-600' : stats.avgUtil > 95 ? 'text-amber-600' : 'text-slate-900'}`}>
            {stats.avgUtil}%
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Target: 80% - 90%</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400">Weekly Hours Logged</span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{stats.avgHours} hrs/wk</span>
          <span className="text-[10px] text-slate-500 font-medium">+ {stats.avgOt}h average overtime</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400">Avg Quality Score</span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{stats.avgQuality}%</span>
          <span className="text-[10px] text-slate-500 font-medium">Target standard: 90%+</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400">Engagement Index</span>
          <span className={`text-2xl font-black block mt-1 ${stats.avgEng < 72 ? 'text-amber-600' : 'text-slate-900'}`}>
            {stats.avgEng} / 100
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Fatigue risk signal</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Dept:</span>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Team Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Team:</span>
            <select
              value={selectedTeam}
              onChange={e => setSelectedTeam(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
            >
              <option value="all">All Teams</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Location:</span>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-brand-500 outline-none"
            >
              <option value="all">All Locations</option>
              {locations.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search role or member..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Workforce Roster Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Workforce Resource Telemetry</h3>
            <p className="text-xs text-slate-500">
              Aggregated work allocation metrics sorted by role profile.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Showing {filteredEmployees.length} resources
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Member / Role</th>
                <th className="py-3 px-4">Team</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Hours Assigned</th>
                <th className="py-3 px-4">Capacity Utilization</th>
                <th className="py-3 px-4">Overtime Logged</th>
                <th className="py-3 px-4">Active Tasks</th>
                <th className="py-3 px-4">Engagement Pulse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map(emp => {
                const team = teams.find(t => t.id === emp.teamId);
                const isOverloaded = emp.utilizationPct >= 115;
                const isWarning = emp.utilizationPct >= 100 && emp.utilizationPct < 115;

                return (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{emp.name}</div>
                      <div className="text-[11px] text-slate-500">{emp.role} • {emp.experienceYears}y exp</div>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => navigateToTeam(emp.teamId)}
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-800"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: team?.color }}></span>
                        <span>{team?.name}</span>
                      </button>
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {emp.location}
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-slate-800">
                      {emp.assignedHoursWeekly}h / 40h
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        isOverloaded
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : isWarning
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {emp.utilizationPct}%
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                      {emp.overtimeHoursWeekly > 0 ? (
                        <span className="text-red-600 font-bold">+{emp.overtimeHoursWeekly}h</span>
                      ) : (
                        <span className="text-slate-400">0h</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-medium font-mono">
                      {emp.tasksAssignedCount} tasks ({emp.tasksCompletedCount} done)
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-xs ${emp.engagementIndex < 70 ? 'text-amber-600' : 'text-slate-800'}`}>
                          {emp.engagementIndex}
                        </span>
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${emp.engagementIndex < 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${emp.engagementIndex}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
