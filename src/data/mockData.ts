import { Team, HealthScoreBreakdown, ExecutiveKpi, OperationalRisk, Recommendation, SimulationScenario, WeeklyTrendData, Project, Employee, Task, ConfigurableWeights } from '../types';

export const initialHealthScore: HealthScoreBreakdown = {
  overall: 72,
  statusLabel: 'Needs Attention',
  capacity: 84,
  workload: 76,
  productivity: 81,
  quality: 89,
  engagement: 70,
  sustainability: 61,
};

export const initialKpis: ExecutiveKpi[] = [
  {
    id: 'capacity',
    label: 'Capacity Utilization',
    value: '87%',
    changeText: '↑ 9% vs previous month',
    isPositive: false,
    status: 'warning',
    description: 'Average workload across all teams relative to target 85% capacity threshold.',
    benchmark: 'Optimal band: 75% - 85%'
  },
  {
    id: 'productivity',
    label: 'Productivity Index',
    value: '81',
    changeText: '↓ 6% vs previous month',
    isPositive: false,
    status: 'critical',
    description: 'Complexity-weighted task throughput per productive working hour.',
    benchmark: 'Target standard: 90+'
  },
  {
    id: 'overtime',
    label: 'Overtime Rate',
    value: '+18%',
    changeText: 'Warning threshold breached',
    isPositive: false,
    status: 'warning',
    description: 'Overtime hours logged beyond standard 40-hour weekly baseline.',
    benchmark: 'Acceptable limit: < 8%'
  },
  {
    id: 'completion',
    label: 'Task Completion',
    value: '82%',
    changeText: '↓ 7% vs 30-day baseline',
    isPositive: false,
    status: 'critical',
    description: 'Ratio of planned sprint tasks completed within scheduled milestone window.',
    benchmark: 'Target SLA: 90%+'
  },
  {
    id: 'backlog',
    label: 'Backlog Volume',
    value: '126',
    changeText: '↑ 14% sprint-over-sprint',
    isPositive: false,
    status: 'warning',
    description: 'Active unassigned or delayed tasks awaiting development capacity.',
    benchmark: 'Healthy limit: < 90 tasks'
  },
  {
    id: 'engagement',
    label: 'Employee Engagement',
    value: '74',
    changeText: '↓ 5% trailing 60 days',
    isPositive: false,
    status: 'warning',
    description: 'Composite team pulse score measuring workload sustainability and sentiment.',
    benchmark: 'Healthy score: > 80'
  }
];

export const initialTeams: Team[] = [
  {
    id: 'engineering',
    name: 'Engineering Team',
    department: 'Digital Commerce',
    headCount: 18,
    capacityUtilization: 118,
    workloadHours: 850,
    availableHours: 720,
    overtimeRate: 21,
    taskCompletionRate: 81,
    qualityScore: 86,
    reworkRate: 9,
    engagementScore: 68,
    absenteeismRate: 4.2,
    slaCompliance: 82,
    riskLevel: 'Critical',
    color: '#DC2626',
    lead: 'Vikram Sharma',
    activeProjects: 6,
    description: 'Core Magento & Adobe Commerce backend development, API integrations, and custom payment services.'
  },
  {
    id: 'integration',
    name: 'Integration Team',
    department: 'Enterprise Middleware',
    headCount: 12,
    capacityUtilization: 110,
    workloadHours: 528,
    availableHours: 480,
    overtimeRate: 14,
    taskCompletionRate: 87,
    qualityScore: 88,
    reworkRate: 6,
    engagementScore: 74,
    absenteeismRate: 2.9,
    slaCompliance: 86,
    riskLevel: 'High',
    color: '#EA580C',
    lead: 'Rachel Vance',
    activeProjects: 5,
    description: 'i95Dev Connect middleware, ERP data synchronizers (SAP, Microsoft Dynamics, NetSuite).'
  },
  {
    id: 'qa',
    name: 'QA & Test Engineering',
    department: 'Quality Engineering',
    headCount: 10,
    capacityUtilization: 83,
    workloadHours: 332,
    availableHours: 400,
    overtimeRate: 4,
    taskCompletionRate: 94,
    qualityScore: 92,
    reworkRate: 3,
    engagementScore: 82,
    absenteeismRate: 2.1,
    slaCompliance: 95,
    riskLevel: 'Healthy',
    color: '#16A34A',
    lead: 'Ananya Desai',
    activeProjects: 4,
    description: 'End-to-end regression testing, performance load testing, and commerce checkout automation.'
  },
  {
    id: 'support',
    name: 'Support & Maintenance',
    department: 'Client Operations',
    headCount: 8,
    capacityUtilization: 71,
    workloadHours: 227,
    availableHours: 320,
    overtimeRate: 2,
    taskCompletionRate: 91,
    qualityScore: 94,
    reworkRate: 2,
    engagementScore: 72,
    absenteeismRate: 3.1,
    slaCompliance: 96,
    riskLevel: 'Healthy',
    color: '#059669',
    lead: 'Marcus Bell',
    activeProjects: 3,
    description: 'Tier-2 and Tier-3 managed support, production hotfixes, security patching, and SLA maintenance.'
  },
  {
    id: 'solutions',
    name: 'Solutions Architecture',
    department: 'Technical Consulting',
    headCount: 6,
    capacityUtilization: 93,
    workloadHours: 223,
    availableHours: 240,
    overtimeRate: 6,
    taskCompletionRate: 89,
    qualityScore: 90,
    reworkRate: 4,
    engagementScore: 79,
    absenteeismRate: 2.5,
    slaCompliance: 90,
    riskLevel: 'Monitor',
    color: '#D97706',
    lead: 'Deepak Verma',
    activeProjects: 4,
    description: 'Solution architecture review, enterprise discovery workshops, and technical blueprint design.'
  }
];

export const initialRisks: OperationalRisk[] = [
  {
    id: 'risk-1',
    severity: 'critical',
    teamId: 'engineering',
    teamName: 'Engineering Team',
    headline: 'Capacity utilization has reached 118%',
    metricDetails: 'Overtime has increased for four consecutive weeks (+21% current).',
    potentialCause: 'High task volume + deadline concentration on Project Alpha and Project Gamma.',
    recommendedAction: 'Redistribute 10–15% of medium-priority work to QA and Integration.',
    recommendationId: 'rec-1'
  },
  {
    id: 'risk-2',
    severity: 'high',
    teamId: 'integration',
    teamName: 'Integration Team',
    headline: 'Backlog increased 21% while completion rate declined 8%',
    metricDetails: 'Sustained throughput drop over last 3 release cycles with 14% overtime.',
    potentialCause: 'Multiple high-complexity ERP connector projects overlapping in Phase 2.',
    recommendedAction: 'Re-sequence connector milestones and unbundle low-priority schema mappings.',
    recommendationId: 'rec-2'
  },
  {
    id: 'risk-3',
    severity: 'monitor',
    teamId: 'support',
    teamName: 'Support Team',
    headline: 'Engagement decreased 11% while overtime increased 8%',
    metricDetails: 'Overtime rising in on-call shifts; average satisfaction index down to 72/100.',
    potentialCause: 'Sustained workload pressure from upstream release hotfixes without cooldown.',
    recommendedAction: 'Enforce on-call rotation rest periods and cap secondary ticket allocations.',
    recommendationId: 'rec-3'
  }
];

export const initialRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    number: 1,
    title: 'Move 12 medium-priority tasks from Engineering to Integration & QA',
    category: 'Redistribution',
    reason: 'Engineering is operating at 118% capacity with rising rework (9%). QA has 17% spare buffer capacity and Integration can absorb middleware unit testing.',
    expectedImpact: {
      capacityBefore: 118,
      capacityAfter: 96,
      overtimeDeltaPct: -18,
      deadlineRiskDeltaPct: -11,
      backlogDeltaPct: -9,
      productivityDeltaPct: +7
    },
    confidence: 93,
    risk: 'Low',
    affectedTeams: ['Engineering Team', 'Integration Team', 'QA & Test Engineering'],
    tasksToMove: 12,
    fromTeamId: 'engineering',
    toTeamId: 'qa',
    status: 'pending',
    evidenceUsed: [
      'Engineering capacity utilization > 110% for 28 consecutive days',
      'QA capacity utilization at 83% (17% available head-room)',
      '14 reassignable tasks identified with compatible skill profiles',
      'Historical correlation: Overtime > 15% correlates with 2.1x rework rate'
    ],
    modelReasoning: 'The optimization model identified a localized capacity bottleneck rather than an aggregate organization shortage. Redistributing 12 tasks normalizes Engineering utilization to 96% while keeping QA comfortably at 89%, eliminating cognitive overload.'
  },
  {
    id: 'rec-2',
    number: 2,
    title: 'Delay 3 low-priority tasks on Project Alpha by 5 working days',
    category: 'Schedule',
    reason: 'Project Alpha deadline clustering on Oct 19 is forcing parallel overtime on non-critical reporting modules.',
    expectedImpact: {
      capacityBefore: 118,
      capacityAfter: 104,
      overtimeDeltaPct: -8,
      deadlineRiskDeltaPct: -14,
      backlogDeltaPct: 0,
      productivityDeltaPct: +4
    },
    confidence: 88,
    risk: 'Low',
    affectedTeams: ['Engineering Team'],
    tasksToMove: 3,
    fromTeamId: 'engineering',
    status: 'pending',
    evidenceUsed: [
      '3 non-blocking analytics export tasks flagged in critical path',
      'Zero downstream customer dependencies for Phase 1 MVP delivery',
      'Relieves 36 engineering hours during peak milestone week'
    ],
    modelReasoning: 'De-clustering the deadline mitigates the risk of missing the primary Oct 19 ERP cutover milestone while preserving team focus on core transactional synchronization.'
  },
  {
    id: 'rec-3',
    number: 3,
    title: 'Enforce overtime cap and avoid additional weekend hours for Engineering next week',
    category: 'Policy',
    reason: 'Four consecutive weeks of overtime (+21%) have triggered fatigue signals: rework has increased from 4% to 9% and absenteeism is creeping upward.',
    expectedImpact: {
      capacityBefore: 118,
      capacityAfter: 110,
      overtimeDeltaPct: -15,
      deadlineRiskDeltaPct: -4,
      backlogDeltaPct: +2,
      productivityDeltaPct: +6
    },
    confidence: 91,
    risk: 'Medium',
    affectedTeams: ['Engineering Team'],
    status: 'pending',
    evidenceUsed: [
      'Fatigue curve threshold exceeded: productive output per hour drops 31% after 48 weekly hours',
      'Rework volume generated in overtime hours is 3.4x higher than standard hours',
      'Team sentiment pulse dropped from 84 to 68 over 4 weeks'
    ],
    modelReasoning: 'Diminishing marginal returns on overtime: additional hours worked are currently generating more bug rework than net forward velocity.'
  },
  {
    id: 'rec-4',
    number: 4,
    title: 'Review resource allocation and cross-functional support for Project Alpha',
    category: 'Resourcing',
    reason: 'Project Alpha consumes 42% of total engineering capacity. Reallocating one senior Solutions Architect to assist technical specifications will unblock 4 junior developers.',
    expectedImpact: {
      capacityBefore: 118,
      capacityAfter: 101,
      overtimeDeltaPct: -11,
      deadlineRiskDeltaPct: -16,
      backlogDeltaPct: -7,
      productivityDeltaPct: +9
    },
    confidence: 85,
    risk: 'Low',
    affectedTeams: ['Engineering Team', 'Solutions Architecture'],
    status: 'pending',
    evidenceUsed: [
      'Junior developers spending 22% of time waiting on architectural clarifications',
      'Solutions Architecture team currently has 7% unallocated advisory bandwidth',
      'Expected turnaround time on API spec blocks reduced from 18h to 3h'
    ],
    modelReasoning: 'Targeting specification quality at the root stage prevents downstream code rework and idle developer wait cycles.'
  }
];

export const initialScenarios: SimulationScenario[] = [
  {
    id: 'A',
    name: 'Scenario A: Workload Redistribution (Recommended)',
    description: 'Rebalance 12 medium-priority tasks from overloaded Engineering to QA & Integration buffers.',
    capacity: '96%',
    overtime: '+5%',
    completion: '89%',
    backlog: 108,
    deadlineRisk: 'Medium',
    sustainabilityScore: 84,
    implementationEffort: 'Low',
    costImpact: ' (Internal rebalancing)'
  },
  {
    id: 'B',
    name: 'Scenario B: Add Temporary Contractor Capacity',
    description: 'Engage 2 senior contract commerce engineers for a 4-week burst to clear the backlog.',
    capacity: '88%',
    overtime: '+2%',
    completion: '92%',
    backlog: 94,
    deadlineRisk: 'Low',
    sustainabilityScore: 89,
    implementationEffort: 'Medium',
    costImpact: '+,500 contractor expense'
  },
  {
    id: 'C',
    name: 'Scenario C: Extend Non-Critical Deadlines',
    description: 'Push Phase-2 milestones on Project Gamma and Project Delta by 10 calendar days.',
    capacity: '101%',
    overtime: '+8%',
    completion: '86%',
    backlog: 116,
    deadlineRisk: 'Low',
    sustainabilityScore: 78,
    implementationEffort: 'Low',
    costImpact: ' (Client alignment required)'
  },
  {
    id: 'D',
    name: 'Scenario D: Reduce Low-Priority Work (Scope Prune)',
    description: 'Deprioritize 18 low-priority enhancement tickets across all active clients.',
    capacity: '94%',
    overtime: '+4%',
    completion: '90%',
    backlog: 102,
    deadlineRisk: 'Low',
    sustainabilityScore: 86,
    implementationEffort: 'Low',
    costImpact: 'Potential minor deferred revenue'
  },
  {
    id: 'E',
    name: 'Scenario E: Maintain Current Plan (Status Quo)',
    description: 'No management intervention; continue current trajectory and overtime.',
    capacity: '118%',
    overtime: '+21%',
    completion: '81%',
    backlog: 126,
    deadlineRisk: 'Critical',
    sustainabilityScore: 61,
    implementationEffort: 'None',
    costImpact: 'High burn rate + SLA penalty risk'
  }
];

export const weeklyTrendHistory: WeeklyTrendData[] = [
  { week: 'Week 1', workingHours: 1620, productivityIndex: 92, overtimeHours: 64, reworkRate: 4.0, taskCompletionRate: 91, taskComplexity: 6.2, backlogCount: 82, engagementScore: 84 },
  { week: 'Week 2', workingHours: 1660, productivityIndex: 90, overtimeHours: 112, reworkRate: 4.5, taskCompletionRate: 89, taskComplexity: 6.6, backlogCount: 88, engagementScore: 83 },
  { week: 'Week 3', workingHours: 1710, productivityIndex: 88, overtimeHours: 160, reworkRate: 5.2, taskCompletionRate: 87, taskComplexity: 7.1, backlogCount: 95, engagementScore: 81 },
  { week: 'Week 4', workingHours: 1765, productivityIndex: 86, overtimeHours: 210, reworkRate: 6.0, taskCompletionRate: 85, taskComplexity: 7.5, backlogCount: 104, engagementScore: 79 },
  { week: 'Week 5', workingHours: 1820, productivityIndex: 85, overtimeHours: 245, reworkRate: 6.8, taskCompletionRate: 84, taskComplexity: 7.9, backlogCount: 112, engagementScore: 76 },
  { week: 'Week 6', workingHours: 1875, productivityIndex: 83, overtimeHours: 280, reworkRate: 7.7, taskCompletionRate: 83, taskComplexity: 8.3, backlogCount: 118, engagementScore: 74 },
  { week: 'Week 7', workingHours: 1915, productivityIndex: 82, overtimeHours: 310, reworkRate: 8.4, taskCompletionRate: 82, taskComplexity: 8.6, backlogCount: 122, engagementScore: 71 },
  { week: 'Week 8', workingHours: 1950, productivityIndex: 81, overtimeHours: 345, reworkRate: 9.1, taskCompletionRate: 81, taskComplexity: 8.9, backlogCount: 126, engagementScore: 68 },
];

export const projectsList: Project[] = [
  { id: 'proj-1', name: 'Project Alpha: SAP S/4HANA & Magento Enterprise Sync', client: 'Global Industrial Supplies Corp', deadline: '2026-10-19', priority: 'Critical', leadTeamId: 'engineering', progressPct: 72, risk: 'Critical', taskCount: 28, complexityIndex: 9.2, deadlinePressure: 94 },
  { id: 'proj-2', name: 'Project Beta: BigCommerce B2B Wholesale Portal', client: 'Apex Medical Hardware', deadline: '2026-10-29', priority: 'High', leadTeamId: 'integration', progressPct: 65, risk: 'High', taskCount: 22, complexityIndex: 7.8, deadlinePressure: 82 },
  { id: 'proj-3', name: 'Project Gamma: Adobe Commerce Headless PWA', client: 'Velocita Luxury Retail', deadline: '2026-11-12', priority: 'Medium', leadTeamId: 'engineering', progressPct: 81, risk: 'Medium', taskCount: 18, complexityIndex: 8.1, deadlinePressure: 68 },
  { id: 'proj-4', name: 'Project Delta: Microsoft Dynamics 365 Connector', client: 'Nordic Logistics Group', deadline: '2026-11-20', priority: 'High', leadTeamId: 'integration', progressPct: 58, risk: 'Medium', taskCount: 19, complexityIndex: 7.4, deadlinePressure: 64 },
  { id: 'proj-5', name: 'Project Epsilon: Custom OMS Middleware & Webhooks', client: 'Zenith Direct Distribution', deadline: '2026-12-05', priority: 'Low', leadTeamId: 'solutions', progressPct: 44, risk: 'Low', taskCount: 14, complexityIndex: 6.5, deadlinePressure: 45 },
  { id: 'proj-6', name: 'Project Zeta: Commerce Regression Test Suite 4.0', client: 'Internal Enterprise R&D', deadline: '2026-11-30', priority: 'Medium', leadTeamId: 'qa', progressPct: 62, risk: 'Low', taskCount: 15, complexityIndex: 5.9, deadlinePressure: 42 }
];

export const reassignableTasks: Task[] = [
  { id: 'task-101', title: 'SAP Order Confirmation Webhook Validation', projectId: 'proj-1', projectName: 'Project Alpha', teamId: 'engineering', complexity: 'Medium', priority: 'High', estimatedHours: 16, actualHours: 18, assignedDate: '2026-09-28', dueDate: '2026-10-12', status: 'In Progress', reworkRequired: false, canReassign: true },
  { id: 'task-102', title: 'Customer Tier Pricing Schema Verification', projectId: 'proj-1', projectName: 'Project Alpha', teamId: 'engineering', complexity: 'Medium', priority: 'Medium', estimatedHours: 12, actualHours: 14, assignedDate: '2026-09-30', dueDate: '2026-10-14', status: 'Backlog', reworkRequired: false, canReassign: true },
  { id: 'task-103', title: 'Inventory Delta Sync Unit Test Execution', projectId: 'proj-1', projectName: 'Project Alpha', teamId: 'engineering', complexity: 'Medium', priority: 'Medium', estimatedHours: 14, actualHours: 8, assignedDate: '2026-10-01', dueDate: '2026-10-15', status: 'In Progress', reworkRequired: false, canReassign: true },
  { id: 'task-104', title: 'B2B Quick Order CSV Parser Sanity Checks', projectId: 'proj-2', projectName: 'Project Beta', teamId: 'engineering', complexity: 'Low', priority: 'Medium', estimatedHours: 10, actualHours: 6, assignedDate: '2026-10-02', dueDate: '2026-10-16', status: 'Backlog', reworkRequired: false, canReassign: true },
  { id: 'task-105', title: 'Shipping Carrier API Error Handling Test Scenarios', projectId: 'proj-2', projectName: 'Project Beta', teamId: 'engineering', complexity: 'Medium', priority: 'Medium', estimatedHours: 12, actualHours: 10, assignedDate: '2026-10-02', dueDate: '2026-10-16', status: 'In Progress', reworkRequired: false, canReassign: true },
  { id: 'task-106', title: 'Multi-Currency Tax Calculation Verification', projectId: 'proj-3', projectName: 'Project Gamma', teamId: 'engineering', complexity: 'Medium', priority: 'Medium', estimatedHours: 14, actualHours: 4, assignedDate: '2026-10-03', dueDate: '2026-10-18', status: 'Backlog', reworkRequired: false, canReassign: true },
  { id: 'task-107', title: 'GraphQL Customer Query Schema Validation', projectId: 'proj-3', projectName: 'Project Gamma', teamId: 'engineering', complexity: 'Medium', priority: 'Low', estimatedHours: 8, actualHours: 2, assignedDate: '2026-10-03', dueDate: '2026-10-19', status: 'Backlog', reworkRequired: false, canReassign: true },
  { id: 'task-108', title: 'Payment Gateway Tokenization Regression Checks', projectId: 'proj-1', projectName: 'Project Alpha', teamId: 'engineering', complexity: 'Medium', priority: 'High', estimatedHours: 18, actualHours: 12, assignedDate: '2026-10-04', dueDate: '2026-10-16', status: 'In Progress', reworkRequired: false, canReassign: true },
  { id: 'task-109', title: 'Product Catalog Attribute Set Mapping Checks', projectId: 'proj-2', projectName: 'Project Beta', teamId: 'engineering', complexity: 'Medium', priority: 'Medium', estimatedHours: 10, actualHours: 0, assignedDate: '2026-10-05', dueDate: '2026-10-20', status: 'Backlog', reworkRequired: false, canReassign: true },
  { id: 'task-110', title: 'Invoice PDF Generator Boundary Testing', projectId: 'proj-3', projectName: 'Project Gamma', teamId: 'engineering', complexity: 'Low', priority: 'Low', estimatedHours: 8, actualHours: 0, assignedDate: '2026-10-05', dueDate: '2026-10-21', status: 'Backlog', reworkRequired: false, canReassign: true },
  { id: 'task-111', title: 'Credit Limit Verification Rule Testing', projectId: 'proj-1', projectName: 'Project Alpha', teamId: 'engineering', complexity: 'Medium', priority: 'Medium', estimatedHours: 12, actualHours: 0, assignedDate: '2026-10-05', dueDate: '2026-10-22', status: 'Backlog', reworkRequired: false, canReassign: true },
  { id: 'task-112', title: 'Customer Address Validation API Error Logging', projectId: 'proj-2', projectName: 'Project Beta', teamId: 'engineering', complexity: 'Low', priority: 'Low', estimatedHours: 6, actualHours: 0, assignedDate: '2026-10-05', dueDate: '2026-10-23', status: 'Backlog', reworkRequired: false, canReassign: true }
];

export const sampleEmployees: Employee[] = [
  { id: 'emp-01', name: 'Vikram Sharma', department: 'Digital Commerce', teamId: 'engineering', role: 'Engineering Lead & Architect', experienceYears: 11, location: 'Hyderabad, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 49, utilizationPct: 122, overtimeHoursWeekly: 9, tasksAssignedCount: 7, tasksCompletedCount: 5, qualityRating: 91, engagementIndex: 72, absenteeismDaysQuarter: 1 },
  { id: 'emp-02', name: 'Pooja Reddy', department: 'Digital Commerce', teamId: 'engineering', role: 'Senior Magento Developer', experienceYears: 7, location: 'Hyderabad, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 50, utilizationPct: 125, overtimeHoursWeekly: 10, tasksAssignedCount: 8, tasksCompletedCount: 6, qualityRating: 88, engagementIndex: 65, absenteeismDaysQuarter: 2 },
  { id: 'emp-03', name: 'Arjun Nair', department: 'Digital Commerce', teamId: 'engineering', role: 'Full Stack Engineer', experienceYears: 4, location: 'Bengaluru, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 48, utilizationPct: 120, overtimeHoursWeekly: 8, tasksAssignedCount: 6, tasksCompletedCount: 4, qualityRating: 84, engagementIndex: 66, absenteeismDaysQuarter: 2 },
  { id: 'emp-04', name: 'Neha Gupta', department: 'Digital Commerce', teamId: 'engineering', role: 'Backend API Developer', experienceYears: 5, location: 'Hyderabad, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 46, utilizationPct: 115, overtimeHoursWeekly: 6, tasksAssignedCount: 7, tasksCompletedCount: 5, qualityRating: 87, engagementIndex: 70, absenteeismDaysQuarter: 1 },
  { id: 'emp-05', name: 'David Miller', department: 'Digital Commerce', teamId: 'engineering', role: 'Senior Commerce Architect', experienceYears: 9, location: 'Atlanta, US', capacityHoursWeekly: 40, assignedHoursWeekly: 47, utilizationPct: 117, overtimeHoursWeekly: 7, tasksAssignedCount: 5, tasksCompletedCount: 4, qualityRating: 92, engagementIndex: 69, absenteeismDaysQuarter: 0 },
  
  { id: 'emp-06', name: 'Rachel Vance', department: 'Enterprise Middleware', teamId: 'integration', role: 'Integration Practice Lead', experienceYears: 10, location: 'Atlanta, US', capacityHoursWeekly: 40, assignedHoursWeekly: 44, utilizationPct: 110, overtimeHoursWeekly: 4, tasksAssignedCount: 6, tasksCompletedCount: 5, qualityRating: 90, engagementIndex: 76, absenteeismDaysQuarter: 1 },
  { id: 'emp-07', name: 'Siddharth Rao', department: 'Enterprise Middleware', teamId: 'integration', role: 'Senior ERP Specialist (SAP)', experienceYears: 8, location: 'Hyderabad, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 46, utilizationPct: 115, overtimeHoursWeekly: 6, tasksAssignedCount: 7, tasksCompletedCount: 5, qualityRating: 89, engagementIndex: 72, absenteeismDaysQuarter: 1 },
  { id: 'emp-08', name: 'Elena Rostova', department: 'Enterprise Middleware', teamId: 'integration', role: 'Middleware Engineer', experienceYears: 5, location: 'Warsaw, PL', capacityHoursWeekly: 40, assignedHoursWeekly: 43, utilizationPct: 107, overtimeHoursWeekly: 3, tasksAssignedCount: 6, tasksCompletedCount: 5, qualityRating: 88, engagementIndex: 75, absenteeismDaysQuarter: 0 },
  
  { id: 'emp-09', name: 'Ananya Desai', department: 'Quality Engineering', teamId: 'qa', role: 'QA Lead', experienceYears: 9, location: 'Hyderabad, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 34, utilizationPct: 85, overtimeHoursWeekly: 1, tasksAssignedCount: 7, tasksCompletedCount: 7, qualityRating: 95, engagementIndex: 85, absenteeismDaysQuarter: 0 },
  { id: 'emp-10', name: 'Kevin Zhang', department: 'Quality Engineering', teamId: 'qa', role: 'Automation QA Engineer', experienceYears: 4, location: 'Bengaluru, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 32, utilizationPct: 80, overtimeHoursWeekly: 0, tasksAssignedCount: 6, tasksCompletedCount: 6, qualityRating: 94, engagementIndex: 82, absenteeismDaysQuarter: 1 },
  { id: 'emp-11', name: 'Meera Kulkarni', department: 'Quality Engineering', teamId: 'qa', role: 'Commerce Test Engineer', experienceYears: 3, location: 'Hyderabad, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 33, utilizationPct: 82, overtimeHoursWeekly: 1, tasksAssignedCount: 6, tasksCompletedCount: 6, qualityRating: 93, engagementIndex: 80, absenteeismDaysQuarter: 1 },

  { id: 'emp-12', name: 'Marcus Bell', department: 'Client Operations', teamId: 'support', role: 'Operations Support Manager', experienceYears: 8, location: 'Atlanta, US', capacityHoursWeekly: 40, assignedHoursWeekly: 29, utilizationPct: 72, overtimeHoursWeekly: 1, tasksAssignedCount: 9, tasksCompletedCount: 8, qualityRating: 94, engagementIndex: 74, absenteeismDaysQuarter: 1 },
  { id: 'emp-13', name: 'Suresh Patel', department: 'Client Operations', teamId: 'support', role: 'Tier-2 Support Specialist', experienceYears: 4, location: 'Hyderabad, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 28, utilizationPct: 70, overtimeHoursWeekly: 0, tasksAssignedCount: 11, tasksCompletedCount: 10, qualityRating: 95, engagementIndex: 71, absenteeismDaysQuarter: 2 },

  { id: 'emp-14', name: 'Deepak Verma', department: 'Technical Consulting', teamId: 'solutions', role: 'Principal Solutions Architect', experienceYears: 14, location: 'Hyderabad, IN', capacityHoursWeekly: 40, assignedHoursWeekly: 37, utilizationPct: 92, overtimeHoursWeekly: 2, tasksAssignedCount: 5, tasksCompletedCount: 4, qualityRating: 93, engagementIndex: 80, absenteeismDaysQuarter: 0 },
  { id: 'emp-15', name: 'Laura Sanchez', department: 'Technical Consulting', teamId: 'solutions', role: 'Enterprise Discovery Consultant', experienceYears: 7, location: 'Atlanta, US', capacityHoursWeekly: 40, assignedHoursWeekly: 38, utilizationPct: 95, overtimeHoursWeekly: 3, tasksAssignedCount: 4, tasksCompletedCount: 4, qualityRating: 91, engagementIndex: 78, absenteeismDaysQuarter: 1 }
];

export const defaultWeights: ConfigurableWeights = {
  capacityWeight: 25,
  workloadWeight: 20,
  productivityWeight: 20,
  qualityWeight: 15,
  engagementWeight: 10,
  sustainabilityWeight: 10,
  overtimeAlertThreshold: 15,
  capacityAlertThreshold: 100,
};
