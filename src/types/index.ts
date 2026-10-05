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


// ==========================================
// EMPLOYEE 360° DOMAIN TYPES
// ==========================================

export type RoleViewMode = 'manager' | 'employee' | 'admin';

export type TaskLifecycleStage =
  | 'Assigned'
  | 'Acknowledged'
  | 'Started'
  | 'In Progress'
  | 'Blocked'
  | 'Development'
  | 'Review'
  | 'Rework'
  | 'Completed';

export interface WorkingStageEvent {
  stage: TaskLifecycleStage;
  timestamp: string;
  duration: string;
  actor: string;
  reason?: string;
  comments?: string;
  blocker?: string;
  impact?: string;
}

export interface EmployeeTaskDetail {
  id: string; // e.g. 'API-2841'
  name: string;
  projectId: string;
  projectName: string;
  type: 'Feature' | 'Bug Fix' | 'Integration' | 'Refactor' | 'Support';
  priority: TaskPriority;
  complexity: number; // 1-5 scale (e.g. 4/5)
  assignedDate: string;
  startedDate: string;
  completedDate?: string;
  expectedDurationHours: number;
  actualDurationHours: number;
  status: 'Completed' | 'In Progress' | 'Blocked' | 'Review';
  slaStatus: 'Met' | 'Breached' | 'At Risk';
  qualityPct: number;
  reworkCycles: number;
  dependencies: string;
  delayAttribution: 'external_dependency' | 'employee_effort' | 'scope_creep' | 'none';
  aiObservation: string;
  workingStages: WorkingStageEvent[];
}

export interface EmployeeWorkJourneyItem {
  id: string;
  date: string;
  timestamp: string;
  type: 'start' | 'assign' | 'complete' | 'escalate' | 'blocked' | 'logout' | 'review' | 'rework';
  title: string;
  taskId?: string;
  priority?: string;
  complexity?: string;
  resolutionTime?: string;
  reason?: string;
  overtime?: string;
  details?: string;
}

export interface EmployeeProjectContribution {
  projectId: string;
  projectName: string;
  contributionPct: number;
  tasksTotal: number;
  tasksCompleted: number;
  slaAdherence: number;
  qualityScore: number;
  hoursSpent: number;
  role: string;
}

export interface EmployeeMonthlyAttendance {
  month: string;
  workingDays: number;
  leaveDays: number;
  unplannedAbsences: number;
  avgDailyHours: number;
  overtimeHours: number;
  lateStarts: number;
  earlyExits: number;
}

export interface EmployeeTimelinePoint {
  date: string;
  productivity: number;
  workload: number;
  workingHours: number;
  overtime: number;
  taskCompletion: number;
  quality: number;
  slaAdherence: number;
  tasksCompleted: number;
  contextNote: string;
}

export interface Employee360Data {
  id: string; // EMP-1042
  name: string; // Arjun Rao
  role: string; // Senior Software Engineer
  department: string;
  teamId: TeamId;
  teamName: string;
  avatarUrl?: string;
  currentProject: string; // Project Alpha
  status: 'At Risk' | 'Healthy' | 'Monitor';
  workloadRiskScore: number; // 82 (82/100, High workload risk)
  workloadRiskLabel: string; // 'High workload risk'
  
  // KPI Summary
  productivityIndex: number; // 84
  productivityTrendPct: number; // -6
  capacityUtilization: number; // 112
  capacityStatus: string; // 'Over capacity'
  qualityScore: number; // 91
  qualityTrendPct: number; // +2
  taskCompletionRate: number; // 87
  taskCompletionTrendPct: number; // -5
  slaAdherence: number; // 94
  overtimePct: number; // 18 (+18%)
  overtimeHoursMonthly: number; // 24
  absenteeismRate: number; // 2.1%
  engagementScore: number; // 72
  engagementPreviousScore: number; // 77
  engagementDelta: number; // -5
  
  // Workload specs
  assignedHoursWeekly: number; // 42
  availableCapacityWeekly: number; // 37.5
  activeTasksCount: number; // 8
  highPriorityTasks: number; // 3
  mediumPriorityTasks: number; // 4
  lowPriorityTasks: number; // 1
  projectWorkloadDistribution: { name: string; percentage: number; color: string }[];

  // Timeframes & Collections
  timelinePoints: EmployeeTimelinePoint[];
  workJourney: EmployeeWorkJourneyItem[];
  tasks: EmployeeTaskDetail[];
  projects: EmployeeProjectContribution[];
  attendance: EmployeeMonthlyAttendance[];
  
  // Collaboration & Dependencies
  dependenciesBlockedBy: { name: string; count: number; description: string }[];
  collaborationCounts: { handoffs: number; reviews: number; escalations: number; crossTeamTasks: number };

  // AI Narrative & Recommendations
  aiExplanation: {
    summary: string;
    conclusion: string;
    confidence: number;
    externalDependencyDelayedCount: number;
  };
  aiRecommendations: {
    id: string;
    title: string;
    action: string;
    category: 'Workload' | 'Workflow' | 'Dependency' | 'Policy';
    impact: string;
  }[];
}
