import React, { useState } from 'react';
import {
  Sparkles,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Layers,
  Clock,
  Zap,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Activity
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';

export const AiInsights: React.FC = () => {
  const { openRootCauseModal, setActiveTab, openExplainabilityModal, recommendations } = useWorkforce();
  const [selectedAnomaly, setSelectedAnomaly] = useState<string>('anom-1');

  const anomalies = [
    {
      id: 'anom-1',
      title: 'Diminishing Marginal Return on Overtime',
      severity: 'Critical',
      confidence: 93,
      detectedDate: '2026-10-04',
      headline: 'Working hours rose 16% over 4 weeks, but velocity dropped 7%',
      findings: 'Telemetry across 18 developers shows that after 45 weekly hours, error injection rates multiply by 3.4x. Each hour of overtime is currently costing 1.4 hours of next-sprint rework.',
      contributingFactors: ['Engineering Overtime: +21%', 'Rework Rate: 9.1%', 'Task Complexity: 8.9/10'],
      recommendedFix: 'Enforce 45h hard cap and shift 12 secondary validation tasks to QA.'
    },
    {
      id: 'anom-2',
      title: 'Milestone Clustering & Phase-2 Synchronization Drag',
      severity: 'High',
      confidence: 89,
      detectedDate: '2026-10-02',
      headline: 'Overlapping deadlines on Project Alpha & Beta consuming 64% capacity',
      findings: 'Two tier-1 enterprise clients have parallel go-live windows within a 10-day span. Senior architects are context-switching across 3 frameworks simultaneously.',
      contributingFactors: ['Deadline Concentration: 94/100', 'Backlog Volume: +21%', 'Integration Overtime: +14%'],
      recommendedFix: 'Stagger intermediate validation signoffs by 5 business days.'
    },
    {
      id: 'anom-3',
      title: 'QA Buffer Bandwidth Underutilization',
      severity: 'Opportunity',
      confidence: 95,
      detectedDate: '2026-10-01',
      headline: 'QA Team has 17% spare buffer capacity with 94% SLA adherence',
      findings: 'QA engineers possess verified automation skills capable of absorbing unit test execution and schema checks currently clogging senior developers.',
      contributingFactors: ['QA Utilization: 83%', 'QA Quality Score: 92%', 'Reassignable Tasks: 14 identified'],
      recommendedFix: 'Execute Workload Plan #1 to reassign 12 verification tasks to QA.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Operational Intelligence Engine</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                Active Telemetry Monitoring
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Automated anomaly detection comparing current operational metrics against historical baseline distributions and predictive burnout indicators.
            </p>
          </div>

          <button
            onClick={openRootCauseModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-900/20 transition-all shrink-0"
          >
            <Activity className="w-4 h-4" />
            <span>Open Root Cause Engine</span>
          </button>
        </div>
      </div>

      {/* Main Narrative Insight Card */}
      <div className="p-5 rounded-xl border border-brand-200 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white shadow-panel">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
              Core Diagnostic Thesis
            </span>
            <span className="text-[11px] text-slate-400">Model Verification Confidence: <strong>91%</strong></span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
            The output slump is an operational workload imbalance, not individual developer inefficiency.
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Data across all 5 operational teams indicates that total productive hours are being consumed by bug rework and context-switching overhead caused by milestone clustering. Applying strategic workload rebalancing from Engineering into QA will recover an estimated <strong>14% net productive velocity</strong>.
          </p>
        </div>
      </div>

      {/* Anomaly Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {anomalies.map(anom => {
          const isCritical = anom.severity === 'Critical';
          const isHigh = anom.severity === 'High';

          return (
            <div
              key={anom.id}
              className={`bg-white rounded-xl border p-5 shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all ${
                isCritical ? 'border-red-200 bg-red-50/20' : isHigh ? 'border-amber-200 bg-amber-50/20' : 'border-emerald-200 bg-emerald-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isCritical ? 'bg-red-100 text-red-800 border-red-200' : isHigh ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {anom.severity}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Confidence: <strong className="text-slate-700">{anom.confidence}%</strong>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                  {anom.title}
                </h4>
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  {anom.headline}
                </p>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  {anom.findings}
                </p>

                {/* Factors */}
                <div className="mt-3.5 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Detected Signals:
                  </span>
                  {anom.contributingFactors.map((factor, i) => (
                    <div key={i} className="text-[11px] text-slate-700 font-mono bg-white p-1.5 rounded border border-slate-200/80">
                      • {factor}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <div className="text-[11px] text-brand-900 font-semibold mb-2">
                  <strong>Fix:</strong> {anom.recommendedFix}
                </div>
                <button
                  onClick={() => {
                    const rec = recommendations[0];
                    if (rec) openExplainabilityModal(rec);
                  }}
                  className="w-full py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Inspect Action Plan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
