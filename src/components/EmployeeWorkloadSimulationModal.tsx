import React, { useState } from 'react';
import {
  X,
  Sliders,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Employee360Data } from '../types';
import { useWorkforce } from '../context/WorkforceContext';

interface EmployeeWorkloadSimulationModalProps {
  employee: Employee360Data | null;
  isOpen: boolean;
  onClose: () => void;
  onPlanApproved: () => void;
}

export const EmployeeWorkloadSimulationModal: React.FC<EmployeeWorkloadSimulationModalProps> = ({
  employee,
  isOpen,
  onClose,
  onPlanApproved
}) => {
  const { showToast } = useWorkforce();
  const [tasksToMove, setTasksToMove] = useState<number>(2);
  const [escalateApiBlocker, setEscalateApiBlocker] = useState<boolean>(true);
  const [enforceOvertimeCap, setEnforceOvertimeCap] = useState<boolean>(true);
  const [isSimulatedApplied, setIsSimulatedApplied] = useState<boolean>(false);

  if (!isOpen || !employee) return null;

  // Dynamic calculations based on slider
  const baselineCapacity = employee.capacityUtilization; // 112%
  const simulatedCapacity = Math.max(86, baselineCapacity - tasksToMove * 9); // 112 - 18 = 94%
  const simulatedOvertimePct = Math.max(3, employee.overtimePct - tasksToMove * 6.5); // 18 - 13 = 5%
  const simulatedAssignedHours = Math.max(32, employee.assignedHoursWeekly - tasksToMove * 3.25); // 42 - 6.5 = 35.5h
  const deadlineRisk = simulatedCapacity <= 95 ? 'Medium' : 'High';

  const handleApplyPlan = () => {
    setIsSimulatedApplied(true);
    showToast(`Workload rebalancing plan approved for ${employee.name}. 2 tasks redistributed to QA/Integration buffer.`, 'success');
    onPlanApproved();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Individual Workload Optimization Simulator
              </h2>
              <p className="text-xs text-slate-500">
                Target: <strong className="text-slate-700">{employee.name}</strong> ({employee.id}) · {employee.role}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Optimization Controls */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-bold text-slate-800 block">
                  Move Medium-Priority Tasks to Available Buffer
                </label>
                <span className="text-xs text-slate-500">
                  Target candidate: Priya Sharma (QA - 82% capacity) or Integration buffer
                </span>
              </div>
              <span className="font-mono text-base font-bold px-3 py-1 bg-white border border-slate-300 rounded-lg text-blue-700">
                {tasksToMove} tasks (~{tasksToMove * 3.25}h effort)
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="4"
              value={tasksToMove}
              onChange={(e) => setTasksToMove(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-blue-300 transition">
                <input
                  type="checkbox"
                  checked={escalateApiBlocker}
                  onChange={(e) => setEscalateApiBlocker(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div className="text-xs">
                  <strong className="text-slate-800 block">Escalate API Credential Blocker</strong>
                  <span className="text-slate-500">Eliminates 1.5h - 2h idle wait states on ERP</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-blue-300 transition">
                <input
                  type="checkbox"
                  checked={enforceOvertimeCap}
                  onChange={(e) => setEnforceOvertimeCap(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div className="text-xs">
                  <strong className="text-slate-800 block">Enforce Overtime Cap for Sprint</strong>
                  <span className="text-slate-500">Prevents fatigue-driven rework on Project Alpha</span>
                </div>
              </label>
            </div>
          </div>

          {/* Before vs After Impact Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Projected Operational Impact (AI Simulation)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Capacity Utilization</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm line-through text-slate-400 font-mono">{baselineCapacity}%</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-lg font-bold font-mono text-emerald-700">{simulatedCapacity}%</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block mt-1">Target 95% satisfied</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Weekly Overtime</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm line-through text-slate-400 font-mono">+{employee.overtimePct}%</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-lg font-bold font-mono text-emerald-700">+{simulatedOvertimePct}%</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block mt-1">↓ 13% reduction</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Assigned Hours</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm line-through text-slate-400 font-mono">{employee.assignedHoursWeekly}h</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-lg font-bold font-mono text-slate-800">{simulatedAssignedHours}h</span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">Available: 37.5h</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Deadline Risk</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs font-semibold text-red-600">High</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-xs font-bold text-amber-700 px-2 py-0.5 rounded-full bg-amber-100">
                    {deadlineRisk}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">Risk mitigated</span>
              </div>
            </div>
          </div>

          {/* AI Simulation Disclaimer */}
          <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>AI Projection Notice:</strong> Projections are calculated from historical queue drain models and empirical task durations. No automated reassignments occur without human authorization.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition font-medium text-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={handleApplyPlan}
            disabled={isSimulatedApplied}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-xs text-white ${
              isSimulatedApplied
                ? 'bg-emerald-600'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-98'
            }`}
          >
            {isSimulatedApplied ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Plan Approved & Applied</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Approve Workload Plan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
