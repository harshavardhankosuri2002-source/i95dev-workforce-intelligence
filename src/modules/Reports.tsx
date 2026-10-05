import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';

export const Reports: React.FC = () => {
  const { healthScore, kpis, teams, risks, recommendations, showToast } = useWorkforce();
  const [reportDate] = useState<string>('Monday, October 5, 2026');

  const handleDownloadCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Current Value,Benchmark,Status\\n' +
      kpis.map(k => `"${k.label}","${k.value}","${k.benchmark}","${k.status}"`).join('\\n') +
      '\\n\\nTeam,Capacity,Workload,Overtime,Quality,Risk\\n' +
      teams.map(t => `"${t.name}","${t.capacityUtilization}%","${t.workloadHours}h","+${t.overtimeRate}%","${t.qualityScore}%","${t.riskLevel}"`).join('\\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `i95_Workforce_Weekly_Report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Weekly Workforce Report downloaded as CSV.', 'success');
  };

  const handleDownloadJson = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      reportTitle: 'i95Dev Weekly Workforce Operational Intelligence Report',
      workforceHealth: healthScore,
      executiveKpis: kpis,
      teams: teams,
      activeRisks: risks,
      aiRecommendations: recommendations
    };

    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `i95_Workforce_Report_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Executive telemetry dataset exported as JSON.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <FileText className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Executive Operations Report</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                Sprint 41 Weekly Brief
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Synthesized management briefing for Vice Presidents of Operations and Practice Directors covering organizational capacity, output velocity, and risk mitigation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Briefing</span>
            </button>
            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>CSV Data</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Full JSON Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-8 space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-extrabold text-base text-brand-900 tracking-tight">i95 Workforce Intelligence</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 font-bold">
                CONFIDENTIAL • OPERATIONS BRIEF
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Weekly Workforce Health & Capacity Synthesis
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Reporting Window: Trailing 30 Days • Generated: {reportDate}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Health Score</span>
            <span className="text-3xl font-black text-amber-600 font-sans">{healthScore.overall} <span className="text-xs text-slate-400">/ 100</span></span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 block mt-1">
              {healthScore.statusLabel}
            </span>
          </div>
        </div>

        {/* Executive Summary Narrative */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs leading-relaxed text-slate-700 space-y-2">
          <span className="font-bold text-slate-900 block text-sm">
            1. Executive Summary & Anomaly Briefing
          </span>
          <p>
            During the trailing 4-week window, organizational working hours increased by <strong>16%</strong> (averaging 345 overtime hours/week), yet delivery completion rates declined by <strong>7%</strong> and productivity fell from 92 to <strong>81</strong>.
          </p>
          <p>
            Diagnostic telemetry confirms that this drop is localized rather than company-wide: the <strong>Engineering Team</strong> has operated at <strong>118% capacity</strong> for four consecutive weeks due to parallel go-lives on Project Alpha and Project Gamma. This sustained saturation has pushed code rework from 4.0% to <strong>9.1%</strong>, eroding net velocity. Conversely, the <strong>QA Team (83% capacity)</strong> has verified buffer availability capable of relieving secondary verification backlog.
          </p>
        </div>

        {/* Section 2: Core KPI Performance */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            2. Core Workforce Health Indicators
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {kpis.map(k => (
              <div key={k.id} className="p-3 rounded-lg border border-slate-100 bg-white shadow-card">
                <span className="text-[10px] text-slate-400 font-bold uppercase block truncate">{k.label}</span>
                <span className="text-lg font-black text-slate-900 block my-1 font-sans">{k.value}</span>
                <span className="text-[10px] font-semibold text-slate-600 block">{k.changeText}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Departmental Capacity & Risk Breakdown */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            3. Departmental Capacity Breakdown
          </h3>
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Team</th>
                <th className="py-2.5 px-3">Headcount</th>
                <th className="py-2.5 px-3">Workload Hours</th>
                <th className="py-2.5 px-3">Utilization</th>
                <th className="py-2.5 px-3">Overtime Rate</th>
                <th className="py-2.5 px-3">Quality</th>
                <th className="py-2.5 px-3">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teams.map(t => (
                <tr key={t.id}>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{t.name}</td>
                  <td className="py-2.5 px-3">{t.headCount} members</td>
                  <td className="py-2.5 px-3 font-mono">{t.workloadHours}h / {t.availableHours}h</td>
                  <td className="py-2.5 px-3 font-mono font-bold">{t.capacityUtilization}%</td>
                  <td className="py-2.5 px-3 font-mono">+{t.overtimeRate}%</td>
                  <td className="py-2.5 px-3 font-mono">{t.qualityScore}%</td>
                  <td className="py-2.5 px-3 font-semibold">
                    <span className={t.riskLevel === 'Critical' ? 'text-red-600' : t.riskLevel === 'High' ? 'text-amber-600' : 'text-emerald-600'}>
                      {t.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 4: Recommended Action Plan */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            4. Recommended Management Interventions (Decision Support)
          </h3>
          <div className="space-y-2 text-xs">
            {recommendations.slice(0, 3).map((r, i) => (
              <div key={r.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <span className="font-bold text-slate-900">{r.title}</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{r.reason}</p>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                    Projected Impact: Capacity {r.expectedImpact.capacityBefore}% → {r.expectedImpact.capacityAfter}%, Overtime {r.expectedImpact.overtimeDeltaPct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible AI Compliance Footer */}
        <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Operational decision-support only. Non-surveillance compliance verified.</span>
          </div>
          <span>i95 Workforce Intelligence Enterprise Suite</span>
        </div>
      </div>
    </div>
  );
};
