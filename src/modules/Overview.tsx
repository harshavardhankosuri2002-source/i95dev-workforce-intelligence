import React from 'react';
import {
  HealthScoreCard
} from '../components/HealthScoreCard';
import { KpiCard } from '../components/KpiCard';
import { AiInsightBanner } from '../components/AiInsightBanner';
import { RiskCard } from '../components/RiskCard';
import { WorkloadHeatmap } from '../components/WorkloadHeatmap';
import { ResponsibleAiBanner } from '../components/ResponsibleAiBanner';
import { useWorkforce } from '../context/WorkforceContext';
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
import { ShieldAlert, ArrowRight, Sparkles, TrendingDown, Users } from 'lucide-react';

export const Overview: React.FC = () => {
  const { kpis, risks, trends, setActiveTab, openRootCauseModal } = useWorkforce();

  return (
    <div className="space-y-6">
      {/* 1. Main Workforce Health Score */}
      <HealthScoreCard />

      {/* 2. Executive KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {kpis.map(kpi => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* 3. Primary AI Insight Banner */}
      <AiInsightBanner />

      {/* 4. Operational Risks Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-red-50 text-red-600 border border-red-200">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Active Operational Risks</h3>
          </div>
          <button
            onClick={() => setActiveTab('recommendations')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>Review Full AI Action Plan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {risks.map(risk => (
            <RiskCard key={risk.id} risk={risk} />
          ))}
        </div>
      </div>

      {/* 5. Workload Heatmap */}
      <WorkloadHeatmap />

      {/* 6. Macro Performance Trends & Hours Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Workforce Input vs Output Velocity (8-Week Trajectory)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Notice the widening gap: Total hours logged continued to rise while task completion and productivity declined.
            </p>
          </div>
          <button
            onClick={openRootCauseModal}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Analyze Gap Correlation</span>
          </button>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis yAxisId="hours" stroke="#94a3b8" fontSize={11} tickLine={false} domain={[1500, 2050]} />
              <YAxis yAxisId="index" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} domain={[70, 100]} />
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
              <Bar yAxisId="hours" dataKey="workingHours" name="Total Hours Logged" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={28} />
              <Line yAxisId="index" type="monotone" dataKey="productivityIndex" name="Productivity Index" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
              <Line yAxisId="index" type="monotone" dataKey="taskCompletionRate" name="Task Completion SLA %" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="index" type="monotone" dataKey="engagementScore" name="Team Sentiment Pulse" stroke="#6366f1" strokeWidth={2} strokeDasharray="3 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 7. Responsible AI Charter */}
      <ResponsibleAiBanner />
    </div>
  );
};
