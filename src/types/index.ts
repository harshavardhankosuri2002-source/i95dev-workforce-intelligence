export type TeamId = 'engineering' | 'integration' | 'qa' | 'support' | 'solutions';

export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Monitor' | 'Healthy';

export interface Team {
  id: TeamId;
  name: string;
  department: string;
  headCount: number;
  capacityUtilization: number; // e.g. 118 for 118%
  workloadHours: number;
  availableHours: number;
  overtimeRate: number; // e.g. 21 for +21%
  taskCompletionRate: number; // e.g. 81 for 81%
  qualityScore: number; // e.g. 86 for 86%
  reworkRate: number; // e.g. 9 for 9%
  engagementScore: number; // e.g. 70 for 70%
  absenteeismRate: number; // e.g. 3.8%
  slaCompliance: number; // e.g. 84%
  riskLevel: RiskLevel;
  color: string;
  lead: string;
  activeProjects: number;
  description: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  teamId: TeamId;
  role: string;
  experienceYears: number;
  location: string;
  capacityHoursWeekly: number;
  assignedHoursWeekly: number;
  utilizationPct: number;
  overtimeHoursWeekly: number;
  tasksAssignedCount: number;
  tasksCompletedCount: number;
  qualityRating: number;
  engagementIndex: number;
  absenteeismDaysQuarter: number;
}

export type TaskComplexity = 'High' | 'Medium' | 'Low';
export type TaskPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type TaskStatus = 'In Progress' | 'Backlog' | 'Review' | 'Completed' | 'Blocked';

export interface Task {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  teamId: TeamId;
  complexity: TaskComplexity;
  priority: TaskPriority;
  estimatedHours: number;
  actualHours: number;
  assignedDate: string;
  dueDate: string;
  status: TaskStatus;
  reworkRequired: boolean;
  assignedEmployeeId?: string;
  canReassign: boolean;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  deadline: string;
  priority: TaskPriority;
  leadTeamId: TeamId;
  progressPct: number;
  risk: RiskLevel;
  taskCount: number;
  complexityIndex: number; // 1-10 scale
  deadlinePressure: number; // 1-100 scale
}

export interface HealthScoreBreakdown {
  overall: number; // 72
  statusLabel: string; // 'Needs Attention'
  capacity: number; // 84
  workload: number; // 76
  productivity: number; // 81
  quality: number; // 89
  engagement: number; // 70
  sustainability: number; // 61
}

export interface ExecutiveKpi {
  id: string;
  label: string;
  value: string | number;
  changeText: string;
  isPositive: boolean;
  status: 'critical' | 'warning' | 'neutral' | 'healthy';
  description: string;
  benchmark: string;
}

export interface OperationalRisk {
  id: string;
  severity: 'critical' | 'high' | 'monitor';
  teamId: TeamId;
  teamName: string;
  headline: string;
  metricDetails: string;
  potentialCause: string;
  recommendedAction: string;
  recommendationId: string;
}

export interface Recommendation {
  id: string;
  number: number;
  title: string;
  category: 'Redistribution' | 'Schedule' | 'Policy' | 'Resourcing';
  reason: string;
  expectedImpact: {
    capacityBefore: number;
    capacityAfter: number;
    overtimeDeltaPct: number;
    deadlineRiskDeltaPct: number;
    backlogDeltaPct: number;
    productivityDeltaPct: number;
  };
  confidence: number;
  risk: 'Low' | 'Medium' | 'High';
  affectedTeams: string[];
  tasksToMove?: number;
  fromTeamId?: TeamId;
  toTeamId?: TeamId;
  status: 'pending' | 'approved' | 'dismissed' | 'simulating';
  evidenceUsed: string[];
  modelReasoning: string;
}

export interface SimulationScenario {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  name: string;
  description: string;
  capacity: string;
  overtime: string;
  completion: string;
  backlog: number;
  deadlineRisk: RiskLevel;
  sustainabilityScore: number;
  implementationEffort: 'None' | 'Low' | 'Medium' | 'High';
  costImpact: string;
}

export interface WeeklyTrendData {
  week: string;
  workingHours: number;
  productivityIndex: number;
  overtimeHours: number;
  reworkRate: number;
  taskCompletionRate: number;
  taskComplexity: number;
  backlogCount: number;
  engagementScore: number;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  approved: boolean;
}

export interface ConfigurableWeights {
  capacityWeight: number;
  workloadWeight: number;
  productivityWeight: number;
  qualityWeight: number;
  engagementWeight: number;
  sustainabilityWeight: number;
  overtimeAlertThreshold: number;
  capacityAlertThreshold: number;
}
