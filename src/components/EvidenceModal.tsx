import React from 'react';
import {
  X,
  FileSearch,
  CheckCircle2,
  Clock,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BarChart2
} from 'lucide-react';
import { Employee360Data } from '../types';

interface EvidenceModalProps {
  employee: Employee360Data | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenWorkloadPlan: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  employee,
  isOpen,
  onClose,
  onOpenWorkloadPlan
}) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Evidence-First AI Inspection
              </h2>
              <p className="text-xs text-slate-500">
                Empirical telemetry behind: &quot;Productivity decreased 6% while workload increased 19%&quot;
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* AI Claim Statement */}
          <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl text-sm text-blue-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-blue-800">
              <Cpu className="w-4 h-4" /> AI Telemetry Assessment (89% Confidence)
            </div>
            <p className="italic text-slate-800">
              &quot;{employee.aiExplanation.summary}&quot;
            </p>
          </div>

          {/* Telemetry Metric Comparison Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              1. Underlying Quantitative Signals
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Productivity Velocity</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-slate-800">{employee.productivityIndex}</span>
                  <span className="text-xs font-bold text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-0.5" /> -6% vs MoM
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Baseline: 90 / 100</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Assigned Workload</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-amber-700">{employee.assignedHoursWeekly} hrs</span>
                  <span className="text-xs font-bold text-amber-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +19%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Target Capacity: {employee.availableCapacityWeekly} hrs</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Capacity Utilization</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-red-600">{employee.capacityUtilization}%</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-100 text-red-700 rounded-md">
                    Overload
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Healthy Threshold: 95%</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Monthly Overtime</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-slate-800">+{employee.overtimeHoursMonthly} hrs</span>
                  <span className="text-xs font-bold text-red-600">+{employee.overtimePct}%</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Sustained over 4 consecutive weeks</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">Task Quality Rating</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-emerald-700">{employee.qualityScore}%</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +2%
                  </span>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Quality did not decline!</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">SLA Adherence</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-slate-800">{employee.slaAdherence}%</span>
                  <span className="text-xs font-medium text-slate-500">14/15 met</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">High execution discipline</span>
              </div>
            </div>
          </div>

          {/* Mathematical Formula Transparency */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider font-bold">
              Formula Transparency & Traceability
            </div>
            <p className="text-emerald-400 font-semibold">
              Productivity Index = (Sum(Complexity-Weighted Completed Tasks) / Actual Working Hours) * 100
            </p>
            <div className="text-slate-300 text-[11px] leading-relaxed pt-1">
              Current Period: (34.8 complexity points / 44 hours) = 0.791 (Normalized: 84 / 100)
              <br />
              Previous Period: (36.0 complexity points / 38 hours) = 0.947 (Normalized: 90 / 100)
              <br />
              <span className="text-amber-400">
                Notice: Output remained virtually stable (34.8 vs 36.0 pts) while hours increased by 6 hrs (+15.8%). The mathematical index dropped because hours escalated without a proportional rise in deliverables.
              </span>
            </div>
          </div>

          {/* Traceable External Blockers Evidence */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              2. Traceable External Blockers (Non-Employee Attributed)
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-3 text-xs">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span>Task API-2841 (Customer Master Sync)</span>
                    <span className="text-amber-700 font-mono">+1h 38m idle wait</span>
                  </div>
                  <p className="text-amber-800 mt-0.5">
                    <strong>Cause:</strong> Client ERP Infrastructure team had expired OAuth sandbox credentials.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-3 text-xs">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span>Task INC-1942 (ERP Webhook Retry)</span>
                    <span className="text-amber-700 font-mono">+1h 25m idle wait</span>
                  </div>
                  <p className="text-amber-800 mt-0.5">
                    <strong>Cause:</strong> Blocked on IAM permission elevation on third-party webhook receiver.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Objective Conclusion */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-950 font-bold block mb-1">
                Audited Conclusion
              </strong>
              The employee maintained high delivery quality (91%) and SLA compliance (94%). The productivity metric decline is a mathematical byproduct of excessive workload (+19%) and external dependency friction, not personal performance slacking.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3 text-xs">
          <span className="text-slate-500 font-medium">All evidence is directly reproducible from audit logs.</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition font-medium text-slate-700"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenWorkloadPlan();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold shadow-xs flex items-center gap-1.5"
            >
              <span>Create Workload Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
