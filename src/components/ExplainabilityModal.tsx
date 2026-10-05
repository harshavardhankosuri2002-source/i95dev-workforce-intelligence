import React from 'react';
import {
  X,
  Lightbulb,
  CheckCircle2,
  Clock,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';

export const ExplainabilityModal: React.FC = () => {
  const {
    isExplainabilityModalOpen,
    closeExplainabilityModal,
    activeRecommendationForExplain,
    approveRecommendation,
    dismissRecommendation,
    setActiveTab,
    applySimulationScenario
  } = useWorkforce();

  if (!isExplainabilityModalOpen || !activeRecommendationForExplain) return null;

  const rec = activeRecommendationForExplain;

  const handleApprove = () => {
    approveRecommendation(rec.id);
    closeExplainabilityModal();
  };

  const handleSimulate = () => {
    closeExplainabilityModal();
    applySimulationScenario('A');
    setActiveTab('workload');
  };

  const handleDismiss = () => {
    dismissRecommendation(rec.id);
    closeExplainabilityModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300">
                  AI Explainability Panel
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Confidence: {rec.confidence}%
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
                Why this recommendation?
              </h2>
            </div>
          </div>

          <button
            onClick={closeExplainabilityModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs">
          {/* Recommendation Title */}
          <div className="p-3.5 rounded-xl border border-brand-200 bg-brand-50/60 text-slate-900">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                {rec.number}
              </span>
              <span className="font-bold text-sm text-brand-950">{rec.title}</span>
            </div>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed pl-7">
              {rec.reason}
            </p>
          </div>

          {/* Model Reasoning */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <span>Model Reasoning & Pattern Analysis</span>
            </h4>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 leading-relaxed">
              {rec.modelReasoning}
            </div>
          </div>

          {/* Evidence Used */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <span>Empirical Evidence Evaluated</span>
            </h4>
            <div className="space-y-1.5">
              {rec.evidenceUsed.map((evidence, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-100 bg-white text-slate-700 shadow-card">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{evidence}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projected Impact Matrix */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
              Projected Impact If Approved (AI Simulation)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/80 text-center">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">Engineering Load</span>
                <span className="text-sm font-bold text-slate-900">
                  {rec.expectedImpact.capacityBefore}% → {rec.expectedImpact.capacityAfter}%
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Normalized band</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/80 text-center">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">Overtime Delta</span>
                <span className="text-sm font-bold text-emerald-600">
                  {rec.expectedImpact.overtimeDeltaPct}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Fatigue reduction</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/80 text-center">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">Deadline Risk</span>
                <span className="text-sm font-bold text-emerald-600">
                  {rec.expectedImpact.deadlineRiskDeltaPct}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Lower SLA breach</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/80 text-center">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">Productivity Gain</span>
                <span className="text-sm font-bold text-emerald-600">
                  +{rec.expectedImpact.productivityDeltaPct}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Quality-adjusted</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 italic mt-2 text-center">
              AI projections are mathematical estimates based on historical and simulated regression data.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={handleDismiss}
            className="px-3 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            Dismiss Recommendation
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulate}
              className="px-4 py-2 rounded-lg border border-brand-300 text-brand-700 bg-brand-50 hover:bg-brand-100 text-xs font-bold transition-colors"
            >
              Simulate in Planner
            </button>
            <button
              onClick={handleApprove}
              className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              Approve Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
