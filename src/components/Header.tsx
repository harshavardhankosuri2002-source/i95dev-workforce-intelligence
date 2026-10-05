import React from 'react';
import {
  Search,
  Calendar,
  Sparkles,
  RotateCcw,
  Shield,
  HelpCircle,
  Bell,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';

export const Header: React.FC = () => {
  const {
    activeTab,
    isSimulatedActive,
    resetToBaseline,
    openRootCauseModal,
    recommendations,
    risks
  } = useWorkforce();

  const titleMap: Record<string, { title: string; subtitle: string }> = {
    overview: {
      title: 'Operations Overview',
      subtitle: 'Real-time capacity utilization, operational risk signals, and productivity health'
    },
    workforce: {
      title: 'Workforce Analytics',
      subtitle: 'Departmental capacity, overtime patterns, and aggregated sustainability metrics'
    },
    workload: {
      title: 'Workload Planner & Rebalancer',
      subtitle: 'Interactive task reallocation simulator with live capacity projection'
    },
    teams: {
      title: 'Team Deep Dive',
      subtitle: 'Granular 8-week performance trends, task complexity, and rework correlations'
    },
    projects: {
      title: 'Active Projects Portfolio',
      subtitle: 'Deadline clustering, project complexity indexes, and delivery SLA risks'
    },
    insights: {
      title: 'AI Intelligence Hub',
      subtitle: 'Anomaly detection, correlation analysis, and predictive operational alerts'
    },
    recommendations: {
      title: 'Workload Optimization Plan',
      subtitle: 'Actionable decision-support plans with expected impact and confidence scoring'
    },
    simulations: {
      title: 'Simulation Lab',
      subtitle: 'Side-by-side comparative modeling of operational intervention scenarios'
    },
    reports: {
      title: 'Executive Management Reports',
      subtitle: 'Weekly workforce health synthesis, SLA compliance, and exportable briefings'
    },
    settings: {
      title: 'System & Model Configuration',
      subtitle: 'AI composite score weights, risk thresholds, and responsible governance settings'
    }
  };

  const current = titleMap[activeTab] || {
    title: 'Workforce Intelligence',
    subtitle: 'Capacity & Workload Optimization'
  };

  const criticalCount = risks.filter(r => r.severity === 'critical').length;
  const pendingCount = recommendations.filter(r => r.status === 'pending').length;

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-30 shrink-0">
      <div className="flex items-center justify-between gap-4">
        {/* Title & Context */}
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">{current.title}</h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
              DEMO / SIMULATED ENVIRONMENT
            </span>
            {isSimulatedActive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 animate-pulse">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                SIMULATION SCENARIO ACTIVE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate mt-0.5">{current.subtitle}</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Simulation Reset Button if active */}
          {isSimulatedActive && (
            <button
              onClick={resetToBaseline}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Baseline</span>
            </button>
          )}

          {/* Quick Root Cause Drilldown */}
          <button
            onClick={openRootCauseModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-semibold shadow-sm transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600 group-hover:rotate-12 transition-transform" />
            <span>Explain Root Cause</span>
          </button>

          {/* Date Range Selector (Static Display for Enterprise context) */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-600 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Trailing 8 Weeks (Q3/Q4)</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-brand-800 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              HL
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">Harsha L.</div>
              <div className="text-[10px] text-slate-500 leading-tight">Operations Director</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
