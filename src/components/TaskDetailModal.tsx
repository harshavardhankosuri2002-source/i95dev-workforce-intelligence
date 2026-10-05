import React from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldAlert,
  GitBranch,
  Info,
  Calendar,
  Zap,
  User,
  ExternalLink
} from 'lucide-react';
import { EmployeeTaskDetail, WorkingStageEvent } from '../types';

interface TaskDetailModalProps {
  task: EmployeeTaskDetail | null;
  onClose: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose }) => {
  if (!task) return null;

  const isExternalDelay = task.delayAttribution === 'external_dependency';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
              {task.id}
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {task.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="font-semibold text-slate-700">{task.projectName}</span>
                <span>•</span>
                <span>Type: <strong className="text-slate-700">{task.type}</strong></span>
                <span>•</span>
                <span>Priority: <strong className="text-slate-700">{task.priority}</strong></span>
                <span>•</span>
                <span>Complexity: <strong className="text-blue-700 font-mono">{task.complexity}/5</strong></span>
              </div>
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* AI Observation Banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
            isExternalDelay
              ? 'bg-amber-50/80 border-amber-200 text-amber-900'
              : 'bg-blue-50/80 border-blue-200 text-blue-900'
          }`}>
            <Info className={`w-5 h-5 shrink-0 mt-0.5 ${isExternalDelay ? 'text-amber-600' : 'text-blue-600'}`} />
            <div className="text-sm">
              <div className="font-semibold text-xs tracking-wide uppercase mb-1 flex items-center gap-2">
                <span>AI Attribution Analysis</span>
                {isExternalDelay && (
                  <span className="bg-amber-200/80 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                    External Dependency Delay
                  </span>
                )}
              </div>
              <p className="leading-relaxed">{task.aiObservation}</p>
            </div>
          </div>

          {/* Performance & Duration Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Expected Time</span>
              <span className="text-base font-bold font-mono text-slate-800">{task.expectedDurationHours}h</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Actual Time</span>
              <span className={`text-base font-bold font-mono ${task.actualDurationHours > task.expectedDurationHours ? 'text-amber-700' : 'text-slate-800'}`}>
                {task.actualDurationHours}h
              </span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">SLA Compliance</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                task.slaStatus === 'Met' ? 'bg-emerald-100 text-emerald-800' :
                task.slaStatus === 'Breached' ? 'bg-red-100 text-red-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {task.slaStatus}
              </span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Quality Score</span>
              <span className="text-base font-bold font-mono text-slate-800">{task.qualityPct}%</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Rework Cycles</span>
              <span className={`text-base font-bold font-mono ${task.reworkCycles > 0 ? 'text-amber-700' : 'text-slate-800'}`}>
                {task.reworkCycles}
              </span>
            </div>
          </div>

          {/* Dependencies Callout */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3">
            <GitBranch className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Dependencies & Upstream Services</h4>
              <p className="text-sm font-medium text-slate-800 mt-0.5">{task.dependencies}</p>
            </div>
          </div>

          {/* Complete Working Stages Lifecycle */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Working Stages Lifecycle ({task.workingStages.length} recorded events)
              </h3>
              <span className="text-xs text-slate-500">Only stages that actually occurred are recorded</span>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-5 my-2">
              {task.workingStages.map((stage: WorkingStageEvent, idx: number) => {
                const isBlocked = stage.stage === 'Blocked';
                const isCompleted = stage.stage === 'Completed';

                return (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-white transition ${
                      isBlocked ? 'border-amber-500 bg-amber-100 ring-4 ring-amber-50' :
                      isCompleted ? 'border-emerald-500 bg-emerald-100 ring-4 ring-emerald-50' :
                      'border-blue-500 bg-blue-50'
                    }`} />

                    <div className={`p-4 rounded-xl border transition ${
                      isBlocked ? 'bg-amber-50/60 border-amber-200 shadow-xs' :
                      isCompleted ? 'bg-emerald-50/40 border-emerald-200' :
                      'bg-slate-50/60 border-slate-200'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isBlocked ? 'bg-amber-200 text-amber-900 font-bold' :
                            isCompleted ? 'bg-emerald-200 text-emerald-900' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {stage.stage}
                          </span>
                          <span className="text-xs font-mono font-medium text-slate-600">
                            {stage.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>Duration: <strong className="font-mono text-slate-700">{stage.duration}</strong></span>
                          <span>•</span>
                          <span>Actor: <strong className="text-slate-700">{stage.actor}</strong></span>
                        </div>
                      </div>

                      {stage.comments && (
                        <p className="text-xs text-slate-700 mt-1">{stage.comments}</p>
                      )}

                      {/* Blocked Stage Highlight */}
                      {isBlocked && (
                        <div className="mt-2.5 p-3 rounded-lg bg-amber-100/70 border border-amber-300 text-xs text-amber-900 space-y-1">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <strong>Blocker Reason:</strong> {stage.reason}
                          </div>
                          {stage.impact && (
                            <div className="text-amber-800 pl-5">
                              <strong>Operational Impact:</strong> {stage.impact}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>AI Decision Support: Distinguishes employee performance from systemic external dependencies.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-medium"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
