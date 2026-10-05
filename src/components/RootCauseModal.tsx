import React from 'react';
import {
  X,
  Sparkles,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Clock,
  HelpCircle,
  FileCheck2
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

export const RootCauseModal: React.FC = () => {
  const {
    isRootCauseModalOpen,
    closeRootCauseModal,
    trends,
    setActiveTab,
    applySimulationScenario
  } = useWorkforce();

  if (!isRootCauseModalOpen) return null;

  const handleApplyRecommendation = () => {
    closeRootCauseModal();
    applySimulationScenario('A');
    setActiveTab('workload');
  };

  const correlationEvidence = [
    {
      metric: 'Working Hours vs Productivity',
      delta: '+16% Hours vs -7% Velocity',
      nature: 'Inverse Divergence',
      explanation: 'Increased input hours are yielding diminishing marginal returns due to cognitive saturation and context switching.'
    },
    {
      metric: 'Overtime vs Code Rework',
      delta: '+18% OT vs +9% Rework',
      nature: 'Strong Correlation (r = 0.88)',
      explanation: 'Work completed after 45+ weekly hours produces 3.4x more test regressions, creating downstream rework cycles.'
    },
    {
      metric: 'Task Complexity Index',
      delta: '+14% Complexity vs +21% Backlog',
      nature: 'Concentration Bottleneck',
      explanation: 'High-complexity enterprise ERP sync tasks (SAP S/4HANA) are concentrated on fewer senior leads without modular delegation.'
    },
    {
      metric: 'Team Sentiment Pulse',
      delta: '-11% Engagement',
      nature: 'Leading Indicator',
      explanation: 'Unrelieved overtime over 4 weeks has depleted recovery buffers, manifesting in early absenteeism spikes.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl my-8 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-brand-950 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  AI Deep Diagnostics
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  High Confidence (91%)
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
                Root Cause Synthesis: Why Hours Are Up But Productivity Is Down
              </h2>
            </div>
          </div>

          <button
            onClick={closeRootCauseModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Executive Core Conclusion */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-900 flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-bold text-sm tracking-tight text-amber-950 mb-1">
                Central Analytical Conclusion
              </div>
              <p className="leading-relaxed text-amber-900">
                The observed performance slump is <strong>not an employee effort or individual productivity deficit</strong>. The empirical telemetry demonstrates a <strong>severe structural capacity and workload concentration imbalance</strong>. Sustained overtime has exceeded the human fatigue threshold, generating high rework rates (+9%) that erase forward development velocity.
              </p>
            </div>
          </div>

          {/* 8-Week Divergence Chart */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  8-Week Metric Divergence (Hours vs Output Quality)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Notice how working hours (bar) continued to climb while productivity index (line) dropped from 92 to 81.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Telemetry: Week 1 to Week 8</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} domain={[1500, 2100]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar yAxisId="left" dataKey="workingHours" name="Total Hours Logged" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="productivityIndex" name="Productivity Index" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="reworkRate" name="Rework Rate %" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistical Evidence Cards */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Telemetry Correlations Identified by Model
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {correlationEvidence.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-card">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800">{item.metric}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {item.nature}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-brand-700 mb-1">
                    {item.delta}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Responsible AI Transparency Note */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Causal Precision Disclaimer:</span> The model detects statistical correlation and historical operational analogues. It does not assert absolute causal determinism. Final intervention decisions remain exclusively in managerial discretion.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={closeRootCauseModal}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            Close Diagnostics
          </button>

          <button
            onClick={handleApplyRecommendation}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-900/20 transition-all"
          >
            <span>Proceed to Workload Rebalancer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
