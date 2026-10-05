import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Lock, Users2, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

export const ResponsibleAiBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const pillars = [
    {
      icon: Users2,
      title: 'Human-in-the-Loop',
      description: 'Zero automated management actions. All workload shifts and schedule adjustments require explicit manager approval.'
    },
    {
      icon: EyeOff,
      title: 'Non-Surveillance Policy',
      description: 'No keystroke logging, webcam monitoring, or individual employee stack ranking. Analysis is strictly operational.'
    },
    {
      icon: Lock,
      title: 'Role-Based Privacy',
      description: 'Employee-level attributes are restricted to authorized line managers. Executives see team-level capacity aggregations.'
    },
    {
      icon: FileText,
      title: 'Audit & Explainability',
      description: 'Every recommendation cites transparent empirical telemetry. All simulation adjustments are logged in immutable audit records.'
    }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 tracking-tight">Responsible AI Operational Charter</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                Enterprise Certified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              This system is designed for workload and operational planning, not automated employee evaluation or disciplinary decisions.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0"
        >
          <span>{isExpanded ? 'Hide Governance Details' : 'View AI Governance Safeguards'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in duration-200">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="p-3 rounded-lg border border-slate-100 bg-slate-50/80 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                  <Icon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{p.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
