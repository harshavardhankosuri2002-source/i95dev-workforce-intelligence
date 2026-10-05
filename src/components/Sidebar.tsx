import React from 'react';
import {
  LayoutDashboard,
  Users,
  Sliders,
  Network,
  FolderKanban,
  Sparkles,
  Lightbulb,
  FlaskConical,
  FileText,
  Settings,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, recommendations, risks, isSimulatedActive } = useWorkforce();

  const pendingRecsCount = recommendations.filter(r => r.status === 'pending').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'workforce', label: 'Workforce', icon: Users },
    { id: 'workload', label: 'Workload Planner', icon: Sliders },
    { id: 'teams', label: 'Teams', icon: Network },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'insights', label: 'AI Insights', icon: Sparkles, badge: 'Live' },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, count: pendingRecsCount },
    { id: 'simulations', label: 'Simulations', icon: FlaskConical, activeGlow: isSimulatedActive },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold shadow-md shadow-brand-900/40">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white tracking-tight text-base font-sans">i95 Workforce</span>
            <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">AI</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium leading-none mt-0.5">Capacity & Workload Optimizer</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 py-1.5">
          Operations Cockpit
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-brand-600 text-white font-semibold shadow-sm shadow-brand-700/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white text-brand-700' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {item.count}
                </span>
              )}
              {item.badge && (
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {item.badge}
                </span>
              )}
              {item.activeGlow && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Responsible AI Compliance Badge */}
      <div className="px-3 py-2">
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Responsible AI</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-400">
            Workload optimization only. Non-surveillance policy enforced.
          </p>
        </div>
      </div>

      {/* AI Engine Status Footer */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">Intelligence active</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">v2.4-opt</span>
      </div>
    </aside>
  );
};
