import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  Team,
  TeamId,
  HealthScoreBreakdown,
  ExecutiveKpi,
  OperationalRisk,
  Recommendation,
  SimulationScenario,
  WeeklyTrendData,
  Project,
  Employee,
  Task,
  ConfigurableWeights,
  AuditEvent
} from '../types';
import {
  initialHealthScore,
  initialKpis,
  initialTeams,
  initialRisks,
  initialRecommendations,
  initialScenarios,
  weeklyTrendHistory,
  projectsList,
  sampleEmployees,
  reassignableTasks,
  defaultWeights
} from '../data/mockData';
import { calculateCompositeHealthScore, simulateWorkloadShift } from '../utils/calculations';

interface WorkforceContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTeamId: TeamId;
  setSelectedTeamId: (teamId: TeamId) => void;
  teams: Team[];
  healthScore: HealthScoreBreakdown;
  kpis: ExecutiveKpi[];
  risks: OperationalRisk[];
  recommendations: Recommendation[];
  scenarios: SimulationScenario[];
  selectedScenarioId: 'A' | 'B' | 'C' | 'D' | 'E';
  setSelectedScenarioId: (id: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  trends: WeeklyTrendData[];
  projects: Project[];
  employees: Employee[];
  tasks: Task[];
  weights: ConfigurableWeights;
  setWeights: React.Dispatch<React.SetStateAction<ConfigurableWeights>>;
  updateWeights: (newWeights: Partial<ConfigurableWeights>) => void;
  isRootCauseModalOpen: boolean;
  openRootCauseModal: () => void;
  closeRootCauseModal: () => void;
  isExplainabilityModalOpen: boolean;
  activeRecommendationForExplain: Recommendation | null;
  openExplainabilityModal: (rec: Recommendation) => void;
  closeExplainabilityModal: () => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  selectedEmployeeId: string | null;
  openEmployeeProfile: (employeeId: string) => void;
  closeEmployeeProfile: () => void;
  approveRecommendation: (id: string) => void;
  dismissRecommendation: (id: string) => void;
  applySimulationScenario: (scenarioId: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  customMoveTasks: (tasksCount: number, fromTeamId: TeamId, toTeamId: TeamId) => void;
  resetToBaseline: () => void;
  isSimulatedActive: boolean;
  auditLog: AuditEvent[];
  navigateToTeam: (teamId: TeamId) => void;
}

const WorkforceContext = createContext<WorkforceContextType | undefined>(undefined);

export const WorkforceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedTeamId, setSelectedTeamId] = useState<TeamId>('engineering');
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [kpis, setKpis] = useState<ExecutiveKpi[]>(initialKpis);
  const [risks, setRisks] = useState<OperationalRisk[]>(initialRisks);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [scenarios] = useState<SimulationScenario[]>(initialScenarios);
  const [selectedScenarioId, setSelectedScenarioId] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [trends] = useState<WeeklyTrendData[]>(weeklyTrendHistory);
  const [projects] = useState<Project[]>(projectsList);
  const [employees] = useState<Employee[]>(sampleEmployees);
  const [tasks, setTasks] = useState<Task[]>(reassignableTasks);
  const [weights, setWeights] = useState<ConfigurableWeights>(defaultWeights);
  const [isSimulatedActive, setIsSimulatedActive] = useState<boolean>(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const openEmployeeProfile = (empId: string) => {
    setSelectedEmployeeId(empId);
  };

  const closeEmployeeProfile = () => {
    setSelectedEmployeeId(null);
  };

  // Modals
  const [isRootCauseModalOpen, setIsRootCauseModalOpen] = useState<boolean>(false);
  const [isExplainabilityModalOpen, setIsExplainabilityModalOpen] = useState<boolean>(false);
  const [activeRecommendationForExplain, setActiveRecommendationForExplain] = useState<Recommendation | null>(null);

  // Toasts
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Audit Log
  const [auditLog, setAuditLog] = useState<AuditEvent[]>([
    {
      id: 'aud-1',
      timestamp: '2026-10-05 09:15',
      user: 'Operations Lead (Demo)',
      role: 'Enterprise Administrator',
      action: 'Baseline Analysis Executed',
      details: 'Workforce health score generated: 72/100 (Needs Attention). Overtime alert triggered for Engineering Team (+21%).',
      approved: true
    }
  ]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const healthScore = useMemo(() => {
    return calculateCompositeHealthScore(teams, weights);
  }, [teams, weights]);

  const openRootCauseModal = () => setIsRootCauseModalOpen(true);
  const closeRootCauseModal = () => setIsRootCauseModalOpen(false);

  const openExplainabilityModal = (rec: Recommendation) => {
    setActiveRecommendationForExplain(rec);
    setIsExplainabilityModalOpen(true);
  };
  const closeExplainabilityModal = () => {
    setIsExplainabilityModalOpen(false);
    setActiveRecommendationForExplain(null);
  };

  const navigateToTeam = (teamId: TeamId) => {
    setSelectedTeamId(teamId);
    setActiveTab('teams');
  };

  const updateWeights = (newWeights: Partial<ConfigurableWeights>) => {
    setWeights(prev => ({ ...prev, ...newWeights }));
    showToast('AI Model scoring weights updated', 'info');
  };

  const approveRecommendation = (recId: string) => {
    const rec = recommendations.find(r => r.id === recId);
    if (!rec) return;

    setRecommendations(prev =>
      prev.map(r => (r.id === recId ? { ...r, status: 'approved' } : r))
    );

    // Apply the operational effect
    if (rec.fromTeamId && rec.toTeamId && rec.tasksToMove) {
      customMoveTasks(rec.tasksToMove, rec.fromTeamId, rec.toTeamId);
    } else {
      setIsSimulatedActive(true);
      setTeams(prev =>
        prev.map(t => {
          if (t.id === 'engineering') {
            return {
              ...t,
              capacityUtilization: 96,
              overtimeRate: 5,
              reworkRate: 4,
              riskLevel: 'Monitor'
            };
          }
          return t;
        })
      );
    }

    setAuditLog(prev => [
      {
        id: 'aud-' + Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        user: 'Enterprise Manager (You)',
        role: 'Operations VP',
        action: 'Recommendation Approved: #' + rec.number + ' ' + rec.title.substring(0, 38) + '...',
        details: 'Plan approved with human-in-the-loop authorization. Rebalancing initiated.',
        approved: true
      },
      ...prev
    ]);

    showToast('Recommendation #' + rec.number + ' approved! Workload plan active.', 'success');
  };

  const dismissRecommendation = (recId: string) => {
    const rec = recommendations.find(r => r.id === recId);
    setRecommendations(prev =>
      prev.map(r => (r.id === recId ? { ...r, status: 'dismissed' } : r))
    );
    showToast('Recommendation #' + (rec ? rec.number : '') + ' dismissed.', 'info');
  };

  const customMoveTasks = (tasksCount: number, fromTeamId: TeamId, toTeamId: TeamId) => {
    const fromTeam = teams.find(t => t.id === fromTeamId);
    const toTeam = teams.find(t => t.id === toTeamId);
    if (!fromTeam || !toTeam) return;

    const sim = simulateWorkloadShift(tasksCount, fromTeam, toTeam);

    setTeams(prev =>
      prev.map(t => {
        if (t.id === fromTeamId) {
          return {
            ...t,
            capacityUtilization: sim.fromTeamNewCapacity,
            overtimeRate: Math.max(2, t.overtimeRate + sim.fromTeamOvertimeDelta),
            riskLevel: sim.fromTeamNewCapacity > 105 ? 'High' : sim.fromTeamNewCapacity > 95 ? 'Monitor' : 'Healthy'
          };
        }
        if (t.id === toTeamId) {
          return {
            ...t,
            capacityUtilization: sim.toTeamNewCapacity,
            riskLevel: sim.toTeamNewCapacity > 105 ? 'High' : 'Healthy'
          };
        }
        return t;
      })
    );

    // Update KPI cards
    setKpis(prev =>
      prev.map(k => {
        if (k.id === 'capacity') return { ...k, value: '82%', changeText: 'Normalized to target band', status: 'healthy', isPositive: true };
        if (k.id === 'overtime') return { ...k, value: '+5%', changeText: '↓ 13% reduction achieved', status: 'healthy', isPositive: true };
        if (k.id === 'productivity') return { ...k, value: '88', changeText: '↑ 7% quality-adjusted velocity', status: 'healthy', isPositive: true };
        if (k.id === 'backlog') return { ...k, value: '108', changeText: '↓ 18 tasks redistributed', status: 'healthy', isPositive: true };
        return k;
      })
    );

    // Update tasks state
    setTasks(prev =>
      prev.map((task, idx) => {
        if (idx < tasksCount && task.teamId === fromTeamId) {
          return { ...task, teamId: toTeamId };
        }
        return task;
      })
    );

    setIsSimulatedActive(true);
    showToast('Simulated moving ' + tasksCount + ' tasks from ' + fromTeam.name + ' to ' + toTeam.name + '.', 'success');
  };

  const applySimulationScenario = (scenarioId: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setSelectedScenarioId(scenarioId);
    if (scenarioId === 'E') {
      resetToBaseline();
      showToast('Restored Status Quo baseline scenario.', 'info');
      return;
    }

    if (scenarioId === 'A') {
      customMoveTasks(12, 'engineering', 'qa');
      showToast('Applied Scenario A: Workload Redistribution.', 'success');
    } else if (scenarioId === 'B') {
      setTeams(prev =>
        prev.map(t =>
          t.id === 'engineering'
            ? { ...t, capacityUtilization: 88, headCount: 20, overtimeRate: 2, riskLevel: 'Healthy' }
            : t
        )
      );
      setIsSimulatedActive(true);
      showToast('Applied Scenario B: Temporary Contractor Capacity engaged.', 'success');
    } else if (scenarioId === 'C') {
      setTeams(prev =>
        prev.map(t =>
          t.id === 'engineering'
            ? { ...t, capacityUtilization: 101, overtimeRate: 8, riskLevel: 'Monitor' }
            : t
        )
      );
      setIsSimulatedActive(true);
      showToast('Applied Scenario C: Extended deadlines on non-critical milestones.', 'success');
    } else if (scenarioId === 'D') {
      setTeams(prev =>
        prev.map(t =>
          t.id === 'engineering'
            ? { ...t, capacityUtilization: 94, overtimeRate: 4, riskLevel: 'Healthy' }
            : t
        )
      );
      setIsSimulatedActive(true);
      showToast('Applied Scenario D: Deprioritized low-priority backlog.', 'success');
    }
  };

  const resetToBaseline = () => {
    setTeams(initialTeams);
    setKpis(initialKpis);
    setRisks(initialRisks);
    setRecommendations(initialRecommendations);
    setTasks(reassignableTasks);
    setIsSimulatedActive(false);
    setSelectedScenarioId('E');
    showToast('Reset all workforce metrics to baseline demo state.', 'info');
  };

  return (
    <WorkforceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedTeamId,
        setSelectedTeamId,
        teams,
        healthScore,
        kpis,
        risks,
        recommendations,
        scenarios,
        selectedScenarioId,
        setSelectedScenarioId,
        trends,
        projects,
        employees,
        tasks,
        weights,
        setWeights,
        updateWeights,
        isRootCauseModalOpen,
        openRootCauseModal,
        closeRootCauseModal,
        isExplainabilityModalOpen,
        activeRecommendationForExplain,
        openExplainabilityModal,
        closeExplainabilityModal,
        toast,
        showToast,
        approveRecommendation,
        dismissRecommendation,
        applySimulationScenario,
        customMoveTasks,
        resetToBaseline,
        isSimulatedActive,
        selectedEmployeeId,
        openEmployeeProfile,
        closeEmployeeProfile,
        auditLog,
        navigateToTeam
      }}
    >
      {children}
    </WorkforceContext.Provider>
  );
};

export const useWorkforce = () => {
  const context = useContext(WorkforceContext);
  if (!context) {
    throw new Error('useWorkforce must be used within a WorkforceProvider');
  }
  return context;
};
