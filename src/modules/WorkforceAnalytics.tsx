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
  Layers,
  ChevronRight,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';
import { Employee, TeamId } from '../types';

export const WorkforceAnalytics: React.FC = () => {
  const { employees, teams, navigateToTeam, openEmployeeProfile, showToast } = useWorkforce();

  // Filters
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = useMemo(() => {
    return Array.from(new Set(employees.map(e => e.department)));
  }, [employees]);

  const locations = useMemo(() => {
    return Array.from(new Set(employees.map(e => e.location)));
  }, [employees]);

  // Merge sample employees with key showcase data
  const enrichedEmployees = useMemo(() => {
    return [
      {
        id: 'EMP-1042',
        name: 'Arjun Rao',
        role: 'Senior Developer',
        department: 'Digital Commerce',
        teamId: 'integration' as TeamId,
        teamName: 'Integration',
        project: 'Project Alpha',
        workload: 112,
        capacity: 112,
        productivity: 84,
        quality: 91,
        sla: 94,
        overtime: '+18%',
        engagement: 72,
        status: 'At Risk',
        statusColor: 'text-amber-700 bg-amber-50 border-amber-300'
      },
      {
        id: 'EMP-1088',
        name: 'Priya Sharma',
        role: 'QA Analyst',
        department: 'Quality Assurance',
        teamId: 'qa' as TeamId,
        teamName: 'QA',
        project: 'Project Alpha & Beta',
        workload: 82,
        capacity: 82,
        productivity: 93,
        quality: 96,
        sla: 98,
        overtime: '+3%',
        engagement: 84,
        status: 'Healthy',
        statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-300'
      },
      {
        id: 'EMP-1095',
        name: 'Rahul Mehta',
        role: 'Integration Engineer',
        department: 'Digital Commerce',
        teamId: 'integration' as TeamId,
        teamName: 'Integration',
        project: 'ERP Sync Connector',
        workload: 104,
        capacity: 104,
        productivity: 78,
        quality: 87,
        sla: 89,
        overtime: '+14%',
        engagement: 68,
        status: 'At Risk',
        statusColor: 'text-amber-700 bg-amber-50 border-amber-300'
      },
      ...employees.map(e => ({
        id: e.id,
        name: e.name,
        role: e.role,
        department: e.department,
        teamId: e.teamId,
        teamName: e.teamId === 'engineering' ? 'Engineering' : e.teamId === 'integration' ? 'Integration' : e.teamId === 'qa' ? 'QA' : e.teamId === 'support' ? 'Support' : 'Solutions',
        project: e.teamId === 'engineering' ? 'Project Alpha' : e.teamId === 'integration' ? 'Project Beta' : 'Platform Support',
        workload: e.utilizationPct,
        capacity: e.utilizationPct,
        productivity: e.utilizationPct > 115 ? 81 : 89,
        quality: e.qualityRating,
        sla: e.utilizationPct > 115 ? 88 : 95,
        overtime: e.overtimeHoursWeekly > 0 ? `+${Math.round((e.overtimeHoursWeekly / 40) * 100)}%` : '0%',
        engagement: e.engagementIndex,
        status: e.utilizationPct > 115 ? 'At Risk' : e.utilizationPct > 100 ? 'Monitor' : 'Healthy',
        statusColor: e.utilizationPct > 115 ? 'text-amber-700 bg-amber-50 border-amber-300' : e.utilizationPct > 100 ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-300'
      }))
    ];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return enrichedEmployees.filter(e => {
      if (selectedDept !== 'all' && e.department !== selectedDept) return false;
      if (selectedTeam !== 'all' && e.teamId !== selectedTeam) return false;
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
  }, [enrichedEmployees, selectedDept, selectedTeam, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Header & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Workforce & Employee 360° Directory</h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {filteredEmployees.length} personnel
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any employee row to open their complete 360° performance history, working stages, and evidence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authorized Management Scope (No Public Employee Ranking)</span>
          </div>
        </div>
      </div>

      {/* Featured Showcase Quick Links Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Arjun Rao Featured Card */}
        <div
          onClick={() => openEmployeeProfile('EMP-1042')}
          className="p-4 bg-white rounded-2xl border-2 border-blue-300/80 shadow-xs hover:border-blue-500 hover:shadow-md transition cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-bl-lg">
            Featured 360° Profile
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
              AR
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center gap-1.5">
                Arjun Rao
                <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition" />
              </h4>
              <span className="text-xs text-slate-500">Senior Developer · Integration Team</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-slate-100">
            <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Workload: 112% (Over capacity)
            </span>
            <span className="text-slate-600 font-mono font-medium">Overtime: +18%</span>
          </div>
        </div>

        {/* Priya Sharma Featured Card */}
        <div
          onClick={() => openEmployeeProfile('EMP-1088')}
          className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              PS
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition flex items-center gap-1.5">
                Priya Sharma
                <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition" />
              </h4>
              <span className="text-xs text-slate-500">QA Analyst · QA Team</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-slate-100">
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Workload: 82% (Available Buffer)
            </span>
            <span className="text-slate-600 font-mono font-medium">Quality: 96%</span>
          </div>
        </div>

        {/* Rahul Mehta Featured Card */}
        <div
          onClick={() => openEmployeeProfile('EMP-1095')}
          className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold text-sm">
              RM
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition flex items-center gap-1.5">
                Rahul Mehta
                <ChevronRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-0.5 transition" />
              </h4>
              <span className="text-xs text-slate-500">Integration Engineer · Integration Team</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-slate-100">
            <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Workload: 104% (At Risk)
            </span>
            <span className="text-slate-600 font-mono font-medium">Overtime: +14%</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by employee name, role, or ID (e.g. Arjun, EMP-1042)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Team Filter */}
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Teams</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800">{filteredEmployees.length}</strong> employees
        </div>
      </div>

      {/* Main Complete Employee Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200 select-none">
              <tr>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Role & Team</th>
                <th className="py-3.5 px-4">Current Project</th>
                <th className="py-3.5 px-4 text-right">Workload</th>
                <th className="py-3.5 px-4 text-right">Productivity</th>
                <th className="py-3.5 px-4 text-right">Quality</th>
                <th className="py-3.5 px-4 text-right">SLA</th>
                <th className="py-3.5 px-4 text-right">Overtime</th>
                <th className="py-3.5 px-4 text-right">Engagement</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">360° Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => openEmployeeProfile(emp.id)}
                  className="hover:bg-blue-50/60 transition cursor-pointer group"
                >
                  {/* Employee Name & ID */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs group-hover:bg-blue-600 group-hover:text-white transition">
                        {emp.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-700 transition">
                          {emp.name}
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">{emp.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Role & Team */}
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{emp.role}</div>
                    <span className="text-[11px] text-slate-500">{emp.teamName}</span>
                  </td>

                  {/* Current Project */}
                  <td className="py-3 px-4 font-medium text-slate-700">
                    {emp.project}
                  </td>

                  {/* Workload */}
                  <td className="py-3 px-4 text-right font-mono font-bold">
                    <span className={emp.workload > 110 ? 'text-red-600' : emp.workload > 100 ? 'text-amber-600' : 'text-slate-800'}>
                      {emp.workload}%
                    </span>
                  </td>

                  {/* Productivity */}
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">
                    {emp.productivity}
                  </td>

                  {/* Quality */}
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                    {emp.quality}%
                  </td>

                  {/* SLA */}
                  <td className="py-3 px-4 text-right font-mono text-slate-800">
                    {emp.sla}%
                  </td>

                  {/* Overtime */}
                  <td className="py-3 px-4 text-right font-mono font-bold">
                    <span className={emp.overtime !== '0%' ? 'text-red-600' : 'text-slate-400'}>
                      {emp.overtime}
                    </span>
                  </td>

                  {/* Engagement */}
                  <td className="py-3 px-4 text-right font-mono font-medium text-slate-800">
                    {emp.engagement}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${emp.statusColor}`}>
                      {emp.status === 'At Risk' ? '⚠ At Risk' : '● Healthy'}
                    </span>
                  </td>

                  {/* CTA */}
                  <td className="py-3 px-4 text-right">
                    <span className="text-blue-600 group-hover:text-blue-800 font-bold text-xs inline-flex items-center gap-1 group-hover:translate-x-0.5 transition">
                      <span>View 360°</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
