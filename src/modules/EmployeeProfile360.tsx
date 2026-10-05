import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  User,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  FileSearch,
  Sliders,
  Calendar,
  Layers,
  GitBranch,
  Sparkles,
  Info,
  Briefcase,
  FolderGit2,
  Activity,
  Award,
  AlertCircle,
  BarChart3,
  ListFilter,
  Check,
  Eye,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Employee360Data, EmployeeTaskDetail, RoleViewMode } from '../types';
import { arjunRao360, getEmployee360ById } from '../data/employee360Data';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { EvidenceModal } from '../components/EvidenceModal';
import { EmployeeWorkloadSimulationModal } from '../components/EmployeeWorkloadSimulationModal';
import { useWorkforce } from '../context/WorkforceContext';

interface EmployeeProfile360Props {
  employeeId?: string;
  onBack: () => void;
}

export const EmployeeProfile360: React.FC<EmployeeProfile360Props> = ({
  employeeId = 'EMP-1042',
  onBack
}) => {
  const { showToast } = useWorkforce();
  const [employee, setEmployee] = useState<Employee360Data>(() => getEmployee360ById(employeeId));
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'performance'
    | 'journey'
    | 'tasks'
    | 'projects'
    | 'workload'
    | 'attendance'
    | 'collaboration'
    | 'insights'
  >('overview');

  // Modals
  const [selectedTask, setSelectedTask] = useState<EmployeeTaskDetail | null>(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState<boolean>(false);
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState<boolean>(false);

  // Filters & switches
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '12m'>('6m');
  const [activeMetricKey, setActiveMetricKey] = useState<
    'productivity' | 'workload' | 'workingHours' | 'overtime' | 'taskCompletion' | 'quality' | 'slaAdherence'
  >('productivity');
  const [roleMode, setRoleMode] = useState<RoleViewMode>('manager');
  const [taskFilterStatus, setTaskFilterStatus] = useState<string>('all');

  const filteredTimeline = useMemo(() => {
    if (timeRange === '3m') return employee.timelinePoints.slice(-5);
    if (timeRange === '6m') return employee.timelinePoints.slice(-7);
    return employee.timelinePoints;
  }, [employee.timelinePoints, timeRange]);

  const filteredTasks = useMemo(() => {
    if (taskFilterStatus === 'all') return employee.tasks;
    return employee.tasks.filter((t) => t.status === taskFilterStatus);
  }, [employee.tasks, taskFilterStatus]);

  const handlePlanApproved = () => {
    setEmployee((prev) => ({
      ...prev,
      capacityUtilization: 94,
      capacityStatus: 'Optimal capacity',
      overtimePct: 5,
      status: 'Healthy',
      workloadRiskScore: 54,
      workloadRiskLabel: 'Moderate / Balanced',
      assignedHoursWeekly: 35.5
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. TOP NAV & BREADCRUMB */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workforce Directory</span>
        </button>

        {/* Role-Based Access Switcher & Governance Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs text-xs">
            <span className="text-slate-400 px-2 font-medium">Viewing as:</span>
            {(['manager', 'employee', 'admin'] as RoleViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setRoleMode(mode);
                  showToast(`Switched view to ${mode.toUpperCase()} permission scope`, 'info');
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition ${
                  roleMode === mode
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Non-Surveillance Guarantee</span>
          </div>
        </div>
      </div>

      {/* 2. PERSISTENT EMPLOYEE 360 HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 relative overflow-hidden">
        {/* Subtle accent border at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Employee Avatar & Bio */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-white ring-2 ring-blue-100 shrink-0">
              {employee.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {employee.name}
                </h1>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {employee.id}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  employee.status === 'At Risk'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}>
                  ⚠ {employee.status === 'At Risk' ? 'Workload Risk' : 'Healthy Load'}
                </span>
              </div>

              <p className="text-sm font-medium text-slate-600">
                {employee.role} · <strong className="text-slate-800">{employee.teamName}</strong> ({employee.department})
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  Current Project: <strong className="text-slate-800">{employee.currentProject}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Assigned: <strong className="text-slate-800">{employee.assignedHoursWeekly}h</strong> / {employee.availableCapacityWeekly}h weekly
                </span>
              </div>
            </div>
          </div>

          {/* Top-Right AI Assessment Card */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 md:min-w-[260px] shadow-2xs">
            <div className="relative flex items-center justify-center">
              <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold text-white shadow-sm ${
                employee.workloadRiskScore > 75
                  ? 'bg-gradient-to-br from-amber-500 to-red-600'
                  : 'bg-gradient-to-br from-emerald-500 to-teal-600'
              }`}>
                <span className="text-lg leading-none font-mono">{employee.workloadRiskScore}</span>
                <span className="text-[9px] uppercase tracking-tighter opacity-80">/ 100</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                AI Assessment
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                {employee.workloadRiskLabel}
              </h4>
              <p className="text-[11px] text-slate-500 leading-tight">
                Workforce Risk / Workload Allocation Metric
              </p>
            </div>
          </div>
        </div>

        {/* 3. TABS NAVIGATION */}
        <div className="flex items-center gap-1 border-t border-slate-200 mt-6 pt-3 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'performance', label: 'Performance' },
            { id: 'journey', label: 'Work History' },
            { id: 'tasks', label: 'Tasks (' + employee.tasks.length + ')' },
            { id: 'projects', label: 'Projects' },
            { id: 'workload', label: 'Workload' },
            { id: 'attendance', label: 'Attendance' },
            { id: 'collaboration', label: 'Collaboration' },
            { id: 'insights', label: 'AI Insights' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 shadow-2xs border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. TAB CONTENTS */}

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {/* Productivity */}
            <div
              title="Complexity-weighted completed tasks / productive hours"
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Productivity</span>
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-800">
                {employee.productivityIndex} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
              <div className="flex items-center text-xs font-bold text-red-600 mt-1">
                <TrendingDown className="w-3 h-3 mr-0.5" /> {employee.productivityTrendPct}% MoM
              </div>
            </div>

            {/* Capacity */}
            <div
              title="Assigned workload hours / available contract hours"
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Capacity</span>
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <div className="text-xl font-bold font-mono text-amber-700">
                {employee.capacityUtilization}%
              </div>
              <div className="text-[11px] font-bold text-amber-600 mt-1">
                {employee.capacityStatus}
              </div>
            </div>

            {/* Quality */}
            <div
              title="First-time pass rate without defect rework"
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Quality</span>
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-700">
                {employee.qualityScore}%
              </div>
              <div className="flex items-center text-xs font-bold text-emerald-600 mt-1">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +{employee.qualityTrendPct}%
              </div>
            </div>

            {/* Task Completion */}
            <div
              title="Delivered milestone tasks / assigned targets"
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Completion</span>
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-800">
                {employee.taskCompletionRate}%
              </div>
              <div className="flex items-center text-xs font-bold text-red-600 mt-1">
                <TrendingDown className="w-3 h-3 mr-0.5" /> {employee.taskCompletionTrendPct}%
              </div>
            </div>

            {/* SLA Adherence */}
            <div
              title="Completions delivered within committed SLA limits"
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">SLA Met</span>
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-800">
                {employee.slaAdherence}%
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Target 90%+</div>
            </div>

            {/* Overtime */}
            <div
              title="Hours logged beyond standard 40h workweek"
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Overtime</span>
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <div className="text-xl font-bold font-mono text-red-600">
                +{employee.overtimePct}%
              </div>
              <div className="text-[11px] text-red-600 font-semibold mt-1">
                +{employee.overtimeHoursMonthly}h monthly
              </div>
            </div>

            {/* Absenteeism */}
            <div
              title="Unplanned leave days / total available working days"
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Absenteeism</span>
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-800">
                {employee.absenteeismRate}%
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">Healthy band</div>
            </div>

            {/* Engagement */}
            <div
              title="Composite engagement pulse based on workload strain & schedule consistency"
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs relative group hover:border-blue-300 transition"
            >
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Engagement</span>
                <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-800">
                {employee.engagementScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
              <div className="flex items-center text-xs font-bold text-amber-600 mt-1">
                <TrendingDown className="w-3 h-3 mr-0.5" /> {employee.engagementDelta} pts
              </div>
            </div>
          </div>

          {/* AI Performance Explanation Section */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold">
                    AI-Generated Employee Performance Summary
                  </h3>
                  <span className="text-xs text-blue-200">
                    Confidence: <strong>{employee.aiExplanation.confidence}%</strong> · Analytical Diagnostic
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEvidenceModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5 shadow-xs"
                >
                  <FileSearch className="w-3.5 h-3.5 text-blue-300" />
                  <span>View Evidence</span>
                </button>

                <button
                  onClick={() => setIsSimulationModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Create Workload Plan</span>
                </button>
              </div>
            </div>

            <blockquote className="border-l-3 border-blue-400 pl-4 py-1 text-sm text-slate-200 leading-relaxed italic">
              &quot;{employee.aiExplanation.summary}&quot;
            </blockquote>

            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>
                  <strong>AI Conclusion:</strong> {employee.aiExplanation.conclusion}
                </span>
              </div>
              <span className="text-blue-300 font-mono">
                {employee.aiExplanation.externalDependencyDelayedCount} delayed tasks associated with external dependencies
              </span>
            </div>
          </div>

          {/* Quick Split: Current Workload & Chronological Snapshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Workload Allocation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Current Active Workload ({employee.activeTasksCount} tasks)
                </h3>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {employee.capacityUtilization}% Utilization
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-bold border border-red-200">
                  High: {employee.highPriorityTasks}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-bold border border-amber-200">
                  Medium: {employee.mediumPriorityTasks}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  Low: {employee.lowPriorityTasks}
                </span>
              </div>

              {/* Progress bars */}
              <div className="space-y-3 pt-2">
                {employee.projectWorkloadDistribution.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{item.name}</span>
                      <span className="font-mono">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-600">Assigned Weekly Effort:</span>
                <span className="font-mono font-bold text-slate-900">
                  {employee.assignedHoursWeekly}h assigned vs {employee.availableCapacityWeekly}h capacity
                </span>
              </div>
            </div>

            {/* Recent Activity Journey Snapshot */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Recent Chronological Work Activity
                </h3>
                <button
                  onClick={() => setActiveTab('journey')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                >
                  <span>Full Journey</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {employee.workJourney.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs"
                  >
                    <span className="font-mono font-bold text-blue-700 shrink-0 w-12">
                      {item.timestamp}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800">{item.title}</div>
                      <p className="text-slate-500 mt-0.5 text-[11px]">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PERFORMANCE OVER TIME */}
      {activeTab === 'performance' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Performance Telemetry Over Time
              </h3>
              <p className="text-xs text-slate-500">
                Interactive trend telemetry with granular hover inspection
              </p>
            </div>

            <div className="flex items-center gap-2">
              {(['3m', '6m', '12m'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    timeRange === range
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Last {range}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100">
            {[
              { key: 'productivity', label: 'Productivity Index' },
              { key: 'workload', label: 'Workload Utilization %' },
              { key: 'workingHours', label: 'Working Hours' },
              { key: 'overtime', label: 'Overtime Hours' },
              { key: 'taskCompletion', label: 'Completion Rate %' },
              { key: 'quality', label: 'Quality Score %' },
              { key: 'slaAdherence', label: 'SLA Adherence %' }
            ].map((metric) => (
              <button
                key={metric.key}
                onClick={() => setActiveMetricKey(metric.key as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeMetricKey === metric.key
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>

          {/* Chart Display */}
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredTimeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066CC" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0066CC" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1 font-sans">
                          <div className="font-bold text-blue-400 text-sm">{label}</div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 font-mono">
                            <span>Productivity: <strong className="text-white">{data.productivity}</strong></span>
                            <span>Workload: <strong className="text-amber-400">{data.workload}%</strong></span>
                            <span>Overtime: <strong className="text-red-400">{data.overtime}h</strong></span>
                            <span>Tasks Completed: <strong className="text-emerald-400">{data.tasksCompleted}</strong></span>
                          </div>
                          {data.contextNote && (
                            <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800 italic">
                              {data.contextNote}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={activeMetricKey}
                  stroke="#0066CC"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#metricGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Hover over any data point to reveal the exact contextual notes and telemetry signals.</span>
            <span className="font-bold text-blue-700">Oct 14 Telemetry: Productivity 79, Workload 118%, Overtime 16 hrs</span>
          </div>
        </div>
      )}

      {/* TAB: WORK HISTORY / ACTIVITY TIMELINE */}
      {activeTab === 'journey' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Chronological Employee Work Journey
              </h3>
              <p className="text-xs text-slate-500">
                Audited sequence of assignments, completions, blockers, and escalations
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
              {employee.workJourney.length} recorded events
            </span>
          </div>

          {/* Chronological Journey Flow */}
          <div className="relative pl-8 border-l-2 border-slate-200 space-y-6 my-4">
            {employee.workJourney.map((item, idx) => {
              const isStart = item.type === 'start';
              const isComplete = item.type === 'complete';
              const isEscalate = item.type === 'escalate';
              const isBlocked = item.type === 'blocked';
              const isLogout = item.type === 'logout';

              return (
                <div key={item.id} className="relative group">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition ${
                    isBlocked || isEscalate ? 'border-amber-500 bg-amber-100 ring-4 ring-amber-50' :
                    isComplete ? 'border-emerald-500 bg-emerald-100 ring-4 ring-emerald-50' :
                    isLogout ? 'border-purple-500 bg-purple-100' :
                    'border-blue-500 bg-blue-50'
                  }`} />

                  <div className={`p-4 rounded-xl border transition ${
                    isBlocked || isEscalate ? 'bg-amber-50/70 border-amber-200' :
                    isComplete ? 'bg-emerald-50/40 border-emerald-200' :
                    'bg-slate-50/80 border-slate-200'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                          {item.date} · {item.timestamp}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {item.title}
                        </span>
                      </div>

                      {item.taskId && (
                        <button
                          onClick={() => {
                            const task = employee.tasks.find((t) => t.id === item.taskId);
                            if (task) setSelectedTask(task);
                          }}
                          className="font-mono text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                        >
                          <span>{item.taskId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {item.details && (
                      <p className="text-xs text-slate-600 mt-1">{item.details}</p>
                    )}

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-500 font-medium">
                      {item.resolutionTime && (
                        <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md font-mono font-bold">
                          Resolution Time: {item.resolutionTime}
                        </span>
                      )}
                      {item.overtime && (
                        <span className="text-red-700 bg-red-100/70 px-2 py-0.5 rounded-md font-mono font-bold">
                          Overtime Logged: {item.overtime}
                        </span>
                      )}
                      {item.reason && (
                        <span className="text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md font-semibold">
                          Reason: {item.reason}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: TASKS */}
      {activeTab === 'tasks' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Detailed Task History & Lifecycle Records
              </h3>
              <p className="text-xs text-slate-500">
                Click any task to inspect working stages, timestamped blockers, and AI attribution
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Filter Status:</span>
              <select
                value={taskFilterStatus}
                onChange={(e) => setTaskFilterStatus(e.target.value)}
                className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Tasks</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Task ID</th>
                  <th className="py-3 px-4">Task Name</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Complexity</th>
                  <th className="py-3 px-4">Expected</th>
                  <th className="py-3 px-4">Actual</th>
                  <th className="py-3 px-4">SLA</th>
                  <th className="py-3 px-4">Quality</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedTask(t)}
                    className="hover:bg-blue-50/50 transition cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {t.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {t.name}
                      {t.delayAttribution === 'external_dependency' && (
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                          External Delay
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{t.projectName}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{t.complexity}/5</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{t.expectedDurationHours}h</td>
                    <td className={`py-3 px-4 font-mono font-bold ${
                      t.actualDurationHours > t.expectedDurationHours ? 'text-amber-700' : 'text-slate-700'
                    }`}>
                      {t.actualDurationHours}h
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.slaStatus === 'Met' ? 'bg-emerald-100 text-emerald-800' :
                        t.slaStatus === 'Breached' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {t.slaStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{t.qualityPct}%</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${
                        t.status === 'Completed' ? 'bg-slate-100 text-slate-700' :
                        'bg-blue-100 text-blue-800 font-semibold'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-blue-600 group-hover:text-blue-800 font-bold text-xs inline-flex items-center gap-1">
                        <span>Stages</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Project Portfolio & Delivery Contribution
            </h3>
            <p className="text-xs text-slate-500">
              Breakdown of contribution ratio, tasks delivered, and SLA benchmarks across projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employee.projects.map((proj) => (
              <div
                key={proj.projectId}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-blue-300 transition space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{proj.projectName}</h4>
                    <span className="text-xs text-slate-500 font-medium">Role: {proj.role}</span>
                  </div>
                  <span className="text-base font-bold font-mono text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-lg">
                    {proj.contributionPct}%
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Total Tasks</span>
                    <strong className="font-mono text-slate-800">{proj.tasksTotal}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Completed</span>
                    <strong className="font-mono text-emerald-700">{proj.tasksCompleted}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">SLA Rate</span>
                    <strong className="font-mono text-slate-800">{proj.slaAdherence}%</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Hours Spent</span>
                    <strong className="font-mono text-slate-800">{proj.hoursSpent}h</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: WORKLOAD */}
      {activeTab === 'workload' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Detailed Workload Distribution & Balance Analysis
              </h3>
              <p className="text-xs text-slate-500">
                Analyzing capacity limits and candidate tasks for rebalancing
              </p>
            </div>
            <button
              onClick={() => setIsSimulationModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulate Rebalancing</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Total Assigned Weekly Effort</span>
              <span className="text-2xl font-bold font-mono text-slate-800 mt-1 block">
                {employee.assignedHoursWeekly} hours
              </span>
              <span className="text-xs text-red-600 font-bold block mt-1">
                +{employee.assignedHoursWeekly - employee.availableCapacityWeekly}h over standard
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Available Contractual Capacity</span>
              <span className="text-2xl font-bold font-mono text-slate-800 mt-1 block">
                {employee.availableCapacityWeekly} hours
              </span>
              <span className="text-xs text-slate-500 block mt-1">Target baseline 37.5 - 40h</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Net Utilization Ratio</span>
              <span className="text-2xl font-bold font-mono text-amber-700 mt-1 block">
                {employee.capacityUtilization}%
              </span>
              <span className="text-xs font-bold text-amber-600 block mt-1">
                Threshold: 95% target
              </span>
            </div>
          </div>

          {/* Candidate Tasks for Workload Rebalancing */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Identified Candidate Tasks for Redistribution
            </h4>
            <div className="space-y-2">
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block">Task ACT-102: Catalog Delta Batch Processor (6h)</strong>
                  <span className="text-slate-600">Priority: Medium · Complexity 3/5 · Candidate for QA/Integration Buffer</span>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md font-bold">
                  Recommended for Offload
                </span>
              </div>

              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block">Task INV-2841: Invoice Sync Bridge Verification (2.5h)</strong>
                  <span className="text-slate-600">Priority: High · Complexity 3/5 · Can be paired with Senior QA Analyst</span>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md font-bold">
                  Recommended for Pair Review
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ATTENDANCE & HOURS */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Attendance, Working Hours & Overtime History
            </h3>
            <p className="text-xs text-slate-500">
              Monthly telemetry tracking scheduled working days, overtime hours, and absence metrics
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Month</th>
                  <th className="py-3 px-4">Working Days</th>
                  <th className="py-3 px-4">Leave Days</th>
                  <th className="py-3 px-4">Unplanned Absences</th>
                  <th className="py-3 px-4">Avg Daily Hours</th>
                  <th className="py-3 px-4">Total Overtime</th>
                  <th className="py-3 px-4">Late Starts / Early Exits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employee.attendance.map((att, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-800">{att.month}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{att.workingDays} days</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{att.leaveDays} days</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{att.unplannedAbsences}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{att.avgDailyHours}h</td>
                    <td className="py-3 px-4 font-mono font-bold text-red-600">
                      +{att.overtimeHours}h
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {att.lateStarts} late / {att.earlyExits} early
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: COLLABORATION & DEPENDENCIES */}
      {activeTab === 'collaboration' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Collaboration & Cross-Team Dependency Map
            </h3>
            <p className="text-xs text-slate-500">
              Uncovering organizational bottlenecks and external team dependencies
            </p>
          </div>

          {/* Dependency Flow Diagram */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Organizational Delivery Flow & Handoff Pipeline
            </span>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center w-full sm:w-auto">
                <span className="text-[10px] text-amber-400 block uppercase font-bold">External Dependency</span>
                <strong>Client ERP Team</strong>
                <span className="text-[10px] text-slate-400 block">OAuth / Sandbox</span>
              </div>

              <span className="text-slate-500 font-bold text-base">➔</span>

              <div className="p-3 rounded-xl bg-blue-900 border border-blue-600 text-center w-full sm:w-auto ring-2 ring-blue-500/50">
                <span className="text-[10px] text-blue-300 block uppercase font-bold">Focus Engineer</span>
                <strong>{employee.name}</strong>
                <span className="text-[10px] text-blue-200 block">Integration Arch</span>
              </div>

              <span className="text-slate-500 font-bold text-base">➔</span>

              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center w-full sm:w-auto">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Peer Verification</span>
                <strong>QA Team (Priya)</strong>
                <span className="text-[10px] text-slate-400 block">Regression Suite</span>
              </div>

              <span className="text-slate-500 font-bold text-base">➔</span>

              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center w-full sm:w-auto">
                <span className="text-[10px] text-emerald-400 block uppercase font-bold">Milestone Sign-Off</span>
                <strong>Client Acceptance</strong>
                <span className="text-[10px] text-slate-400 block">Go-Live Prod</span>
              </div>
            </div>
          </div>

          {/* Blockers Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                External Upstream Hold-ups
              </h4>
              <div className="space-y-2 text-xs">
                {employee.dependenciesBlockedBy.map((dep, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between items-start">
                    <div>
                      <strong className="text-slate-800 block">{dep.name}</strong>
                      <span className="text-slate-500 text-[11px]">{dep.description}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {dep.count} tasks
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Collaboration Metrics (Last 30 Days)
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Code Reviews Given</span>
                  <strong className="text-lg font-mono text-slate-800">{employee.collaborationCounts.reviews}</strong>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Task Handoffs</span>
                  <strong className="text-lg font-mono text-slate-800">{employee.collaborationCounts.handoffs}</strong>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Cross-Team Tasks</span>
                  <strong className="text-lg font-mono text-slate-800">{employee.collaborationCounts.crossTeamTasks}</strong>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Escalations Handled</span>
                  <strong className="text-lg font-mono text-amber-700">{employee.collaborationCounts.escalations}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: AI INSIGHTS & RECOMMENDATIONS */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Actionable Workload Optimization Recommendations
                </h3>
                <p className="text-xs text-slate-500">
                  Non-punitive managerial recommendations designed to optimize capacity and mitigate burnout
                </p>
              </div>

              <button
                onClick={() => setIsSimulationModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulate & Apply Plan</span>
              </button>
            </div>

            <div className="space-y-3">
              {employee.aiRecommendations.map((rec, idx) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-300 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        #{idx + 1}
                      </span>
                      <strong className="text-sm font-bold text-slate-900">{rec.title}</strong>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {rec.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700">{rec.action}</p>

                  <div className="text-[11px] font-medium text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <strong>Projected Impact:</strong> {rec.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Modals for Employee 360 */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />

      <EvidenceModal
        employee={employee}
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        onOpenWorkloadPlan={() => {
          setIsEvidenceModalOpen(false);
          setIsSimulationModalOpen(true);
        }}
      />

      <EmployeeWorkloadSimulationModal
        employee={employee}
        isOpen={isSimulationModalOpen}
        onClose={() => setIsSimulationModalOpen(false)}
        onPlanApproved={handlePlanApproved}
      />
    </div>
  );
};
