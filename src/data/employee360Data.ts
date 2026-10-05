import { Employee360Data } from '../types';

export const arjunRao360: Employee360Data = {
  id: 'EMP-1042',
  name: 'Arjun Rao',
  role: 'Senior Software Engineer',
  department: 'Engineering & Integration',
  teamId: 'integration',
  teamName: 'Integration Team',
  avatarUrl: '',
  currentProject: 'Project Alpha',
  status: 'At Risk',
  workloadRiskScore: 82,
  workloadRiskLabel: 'High workload risk',

  // KPI Summary
  productivityIndex: 84,
  productivityTrendPct: -6,
  capacityUtilization: 112,
  capacityStatus: 'Over capacity',
  qualityScore: 91,
  qualityTrendPct: 2,
  taskCompletionRate: 87,
  taskCompletionTrendPct: -5,
  slaAdherence: 94,
  overtimePct: 18,
  overtimeHoursMonthly: 24,
  absenteeismRate: 2.1,
  engagementScore: 72,
  engagementPreviousScore: 77,
  engagementDelta: -5,

  // Workload specs
  assignedHoursWeekly: 42,
  availableCapacityWeekly: 37.5,
  activeTasksCount: 8,
  highPriorityTasks: 3,
  mediumPriorityTasks: 4,
  lowPriorityTasks: 1,
  projectWorkloadDistribution: [
    { name: 'Project Alpha', percentage: 45, color: '#0066CC' },
    { name: 'Project Beta', percentage: 30, color: '#0A84FF' },
    { name: 'Support', percentage: 15, color: '#F59E0B' },
    { name: 'Internal Tooling', percentage: 10, color: '#64748B' }
  ],

  // Performance Over Time (Last 3m / 6m / 12m)
  timelinePoints: [
    { date: 'Jun 15', productivity: 91, workload: 92, workingHours: 38, overtime: 0, taskCompletion: 95, quality: 92, slaAdherence: 98, tasksCompleted: 16, contextNote: 'Baseline workload, standard sprint cycle' },
    { date: 'Jul 01', productivity: 90, workload: 95, workingHours: 39, overtime: 1, taskCompletion: 94, quality: 93, slaAdherence: 97, tasksCompleted: 17, contextNote: 'Project Alpha kickoff, architecture setup' },
    { date: 'Jul 15', productivity: 89, workload: 98, workingHours: 40, overtime: 2, taskCompletion: 92, quality: 92, slaAdherence: 96, tasksCompleted: 15, contextNote: 'Integration scope expanded with ERP API' },
    { date: 'Aug 01', productivity: 88, workload: 102, workingHours: 41, overtime: 4, taskCompletion: 90, quality: 91, slaAdherence: 96, tasksCompleted: 15, contextNote: 'Concurrent Project Beta integration initiated' },
    { date: 'Aug 15', productivity: 87, workload: 105, workingHours: 42, overtime: 6, taskCompletion: 89, quality: 91, slaAdherence: 95, tasksCompleted: 14, contextNote: 'Overlapping sprint milestones' },
    { date: 'Sep 01', productivity: 85, workload: 109, workingHours: 43.5, overtime: 10, taskCompletion: 88, quality: 90, slaAdherence: 95, tasksCompleted: 13, contextNote: 'External ERP credentials delayed' },
    { date: 'Sep 15', productivity: 84, workload: 112, workingHours: 44, overtime: 14, taskCompletion: 87, quality: 91, slaAdherence: 94, tasksCompleted: 14, contextNote: 'Task switching increased between 3 projects' },
    { date: 'Oct 01', productivity: 82, workload: 115, workingHours: 45, overtime: 18, taskCompletion: 86, quality: 90, slaAdherence: 93, tasksCompleted: 13, contextNote: 'Peak deadline pressure on Project Alpha Phase 2' },
    { date: 'Oct 14', productivity: 79, workload: 118, workingHours: 46, overtime: 16, taskCompletion: 84, quality: 91, slaAdherence: 94, tasksCompleted: 14, contextNote: 'Productivity 79, Workload 118%, Overtime 16 hrs, Tasks completed 14' }
  ],

  // Work Journey / Activity Timeline
  workJourney: [
    {
      id: 'wj-1',
      date: 'October 5',
      timestamp: '09:12',
      type: 'start',
      title: 'Started work',
      details: 'Logged into enterprise workstation (Hybrid / Remote)'
    },
    {
      id: 'wj-2',
      date: 'October 5',
      timestamp: '09:25',
      type: 'assign',
      title: 'Assigned task INV-2841',
      taskId: 'INV-2841',
      priority: 'High',
      complexity: '3/5',
      details: 'Automated Magento to NetSuite Invoice Synchronization bug fix'
    },
    {
      id: 'wj-3',
      date: 'October 5',
      timestamp: '11:40',
      type: 'complete',
      title: 'Completed task INV-2841',
      taskId: 'INV-2841',
      resolutionTime: '2h 15m',
      details: 'Passed unit tests and pushed PR to QA staging environment'
    },
    {
      id: 'wj-4',
      date: 'October 5',
      timestamp: '12:10',
      type: 'assign',
      title: 'Assigned task INC-1942',
      taskId: 'INC-1942',
      priority: 'High',
      complexity: '4/5',
      details: 'Critical webhook timeout on ERP integration payload'
    },
    {
      id: 'wj-5',
      date: 'October 5',
      timestamp: '15:20',
      type: 'escalate',
      title: 'Ticket escalated',
      taskId: 'INC-1942',
      reason: 'Dependency on ERP integration team for OAuth token refresh scope',
      details: 'Flagged blocker to Solutions Architecture Lead'
    },
    {
      id: 'wj-6',
      date: 'October 5',
      timestamp: '17:45',
      type: 'complete',
      title: 'Completed INC-1942',
      taskId: 'INC-1942',
      resolutionTime: '5h 35m (incl. 2h external wait)',
      details: 'Applied exponential backoff and payload compression'
    },
    {
      id: 'wj-7',
      date: 'October 5',
      timestamp: '18:32',
      type: 'logout',
      title: 'Logged out',
      overtime: '1h 32m',
      details: 'Daily hours logged: 9h 20m. Exceeded target by 1.53h.'
    },
    {
      id: 'wj-8',
      date: 'October 4',
      timestamp: '09:00',
      type: 'start',
      title: 'Started work & Standup',
      details: 'Attended Project Alpha Daily Synchronization'
    },
    {
      id: 'wj-9',
      date: 'October 4',
      timestamp: '11:12',
      type: 'complete',
      title: 'Completed API-2841 (API Integration)',
      taskId: 'API-2841',
      resolutionTime: '9.2h total (after 1h 38m external blocker)',
      details: 'Delivered REST API endpoints for customer master catalog'
    },
    {
      id: 'wj-10',
      date: 'October 4',
      timestamp: '14:00',
      type: 'review',
      title: 'Code Review for Priya Sharma (QA)',
      details: 'Reviewed test cases for inventory reservation edge-cases'
    },
    {
      id: 'wj-11',
      date: 'October 3',
      timestamp: '14:32',
      type: 'blocked',
      title: 'Task API-2841 Blocked',
      taskId: 'API-2841',
      reason: 'Waiting for API credentials from client ERP infrastructure team',
      details: 'Impact: +1h 38m estimated idle delay on API-2841'
    }
  ],

  // Comprehensive Task History
  tasks: [
    {
      id: 'API-2841',
      name: 'API Integration - Customer Master Sync',
      projectId: 'proj-01',
      projectName: 'Project Alpha',
      type: 'Integration',
      priority: 'High',
      complexity: 4,
      assignedDate: '2026-10-02',
      startedDate: '2026-10-02 09:30',
      completedDate: '2026-10-04 11:12',
      expectedDurationHours: 8,
      actualDurationHours: 9.2,
      status: 'Completed',
      slaStatus: 'Met',
      qualityPct: 96,
      reworkCycles: 0,
      dependencies: 'ERP API Gateway availability & OAuth secrets',
      delayAttribution: 'external_dependency',
      aiObservation: 'The task took 15% longer than the historical average for similar tasks. The delay appears associated with an external ERP dependency rather than employee performance.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Oct 02, 09:00', duration: '15m', actor: 'Project Manager', comments: 'Assigned during sprint planning' },
        { stage: 'Acknowledged', timestamp: 'Oct 02, 09:15', duration: '15m', actor: 'Arjun Rao', comments: 'Requirements verified' },
        { stage: 'Started', timestamp: 'Oct 02, 09:30', duration: '5h 02m', actor: 'Arjun Rao', comments: 'Commenced schema mapping and endpoints' },
        {
          stage: 'Blocked',
          timestamp: 'Oct 03, 14:32 - 16:10',
          duration: '1h 38m',
          actor: 'ERP Integration Gateway',
          reason: 'Waiting for API credentials',
          impact: '+1h 38m estimated delay',
          comments: 'Sandbox token expired; awaited credentials from client gateway team'
        },
        { stage: 'Development', timestamp: 'Oct 03, 16:10', duration: '2h 50m', actor: 'Arjun Rao', comments: 'Completed token handshake and payload validation' },
        { stage: 'Review', timestamp: 'Oct 04, 09:00', duration: '2h 12m', actor: 'Solutions Architect', comments: 'Peer review and security check' },
        { stage: 'Completed', timestamp: 'Oct 04, 11:12', duration: 'Done', actor: 'System', comments: 'Merged to main integration branch' }
      ]
    },
    {
      id: 'BUG-492',
      name: 'Bug Fix #492 - Inventory Reservation Race Condition',
      projectId: 'proj-01',
      projectName: 'Project Alpha',
      type: 'Bug Fix',
      priority: 'High',
      complexity: 3,
      assignedDate: '2026-10-01',
      startedDate: '2026-10-01 10:00',
      completedDate: '2026-10-02 16:05',
      expectedDurationHours: 4,
      actualDurationHours: 6.1,
      status: 'Completed',
      slaStatus: 'Breached',
      qualityPct: 89,
      reworkCycles: 1,
      dependencies: 'Redis lock manager & QA regression cluster',
      delayAttribution: 'scope_creep',
      aiObservation: 'SLA breached by 2.1h due to unexpected regression discovery during QA edge-case testing under concurrent checkout loads.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Oct 01, 10:00', duration: '30m', actor: 'QA Lead', comments: 'High severity defect reported in checkout' },
        { stage: 'Started', timestamp: 'Oct 01, 10:30', duration: '3h 30m', actor: 'Arjun Rao', comments: 'Reproduced in staging with multi-thread simulator' },
        { stage: 'Review', timestamp: 'Oct 01, 14:00', duration: '1h 15m', actor: 'QA Team', comments: 'Initial fix rejected due to edge case regression' },
        { stage: 'Rework', timestamp: 'Oct 01, 15:15', duration: '1h 45m', actor: 'Arjun Rao', comments: 'Refactored distributed lock implementation' },
        { stage: 'Completed', timestamp: 'Oct 02, 16:05', duration: 'Done', actor: 'System', comments: 'Verified under 10k virtual shoppers' }
      ]
    },
    {
      id: 'SYNC-3011',
      name: 'Data Sync Issue - Multi-Currency Catalog Sync',
      projectId: 'proj-02',
      projectName: 'Project Beta',
      type: 'Integration',
      priority: 'Critical',
      complexity: 5,
      assignedDate: '2026-09-28',
      startedDate: '2026-09-28 11:00',
      completedDate: '2026-09-30 15:00',
      expectedDurationHours: 10,
      actualDurationHours: 12,
      status: 'Completed',
      slaStatus: 'Met',
      qualityPct: 94,
      reworkCycles: 0,
      dependencies: 'Currency conversion feed & ERP pricing rules',
      delayAttribution: 'external_dependency',
      aiObservation: 'Task complexity 5/5. Delivered within acceptable tolerance given multi-currency rate provider downtime on Sep 29.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Sep 28, 11:00', duration: '1h', actor: 'Technical Lead', comments: 'High complexity architecture task' },
        { stage: 'Started', timestamp: 'Sep 28, 12:00', duration: '6h', actor: 'Arjun Rao', comments: 'Implemented transactional pricing batch worker' },
        { stage: 'Blocked', timestamp: 'Sep 29, 10:00 - 11:45', duration: '1h 45m', actor: 'Third Party FX API', reason: 'Provider maintenance window', impact: '+1h 45m delay' },
        { stage: 'Review', timestamp: 'Sep 30, 11:00', duration: '2h', actor: 'Lead Architect', comments: 'Architecture sign-off' },
        { stage: 'Completed', timestamp: 'Sep 30, 15:00', duration: 'Done', actor: 'System', comments: 'Production rollout successful' }
      ]
    },
    {
      id: 'UI-1082',
      name: 'UI Enhancement - B2B Quick Order Grid',
      projectId: 'proj-01',
      projectName: 'Project Alpha',
      type: 'Feature',
      priority: 'Medium',
      complexity: 2,
      assignedDate: '2026-09-26',
      startedDate: '2026-09-26 09:00',
      completedDate: '2026-09-26 11:30',
      expectedDurationHours: 3,
      actualDurationHours: 2.5,
      status: 'Completed',
      slaStatus: 'Met',
      qualityPct: 98,
      reworkCycles: 0,
      dependencies: 'Frontend component library',
      delayAttribution: 'none',
      aiObservation: 'Delivered ahead of estimated duration with 98% quality rating and 0 defect leakage.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Sep 26, 09:00', duration: '10m', actor: 'Product Owner', comments: 'Standard component enhancement' },
        { stage: 'Started', timestamp: 'Sep 26, 09:10', duration: '2h', actor: 'Arjun Rao', comments: 'Completed grid virtualization' },
        { stage: 'Review', timestamp: 'Sep 26, 11:10', duration: '20m', actor: 'Design QA', comments: 'Pixel-perfect approval' },
        { stage: 'Completed', timestamp: 'Sep 26, 11:30', duration: 'Done', actor: 'System', comments: 'Shipped to preview' }
      ]
    },
    {
      id: 'INV-2841',
      name: 'Invoice Sync Bridge - PDF Generation & Tax Hook',
      projectId: 'proj-01',
      projectName: 'Project Alpha',
      type: 'Integration',
      priority: 'High',
      complexity: 3,
      assignedDate: '2026-10-05',
      startedDate: '2026-10-05 09:25',
      completedDate: '2026-10-05 11:40',
      expectedDurationHours: 2.5,
      actualDurationHours: 2.25,
      status: 'Completed',
      slaStatus: 'Met',
      qualityPct: 95,
      reworkCycles: 0,
      dependencies: 'Avalara Tax integration & PDF renderer',
      delayAttribution: 'none',
      aiObservation: 'Optimal resolution time of 2h 15m with flawless tax rate reconciliation.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Oct 05, 09:25', duration: '5m', actor: 'Dispatch Bot', comments: 'Automated routing based on skill matrix' },
        { stage: 'Started', timestamp: 'Oct 05, 09:30', duration: '1h 50m', actor: 'Arjun Rao', comments: 'Wrote hook and PDF template adapter' },
        { stage: 'Review', timestamp: 'Oct 05, 11:20', duration: '20m', actor: 'Finance QA', comments: 'Tax compliance verified' },
        { stage: 'Completed', timestamp: 'Oct 05, 11:40', duration: 'Done', actor: 'System', comments: 'Live in staging' }
      ]
    },
    {
      id: 'INC-1942',
      name: 'ERP Webhook Retry Escalation',
      projectId: 'proj-02',
      projectName: 'Project Beta',
      type: 'Bug Fix',
      priority: 'Critical',
      complexity: 4,
      assignedDate: '2026-10-05',
      startedDate: '2026-10-05 12:10',
      completedDate: '2026-10-05 17:45',
      expectedDurationHours: 4,
      actualDurationHours: 5.58,
      status: 'Completed',
      slaStatus: 'Breached',
      qualityPct: 90,
      reworkCycles: 0,
      dependencies: 'ERP Gateway Token Scope',
      delayAttribution: 'external_dependency',
      aiObservation: 'The 1h 35m delay was directly caused by an upstream OAuth token configuration hold, not engineering execution.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Oct 05, 12:10', duration: '10m', actor: 'SRE Monitor', comments: 'Alert raised for 504 Gateway Timeouts' },
        { stage: 'Started', timestamp: 'Oct 05, 12:20', duration: '3h', actor: 'Arjun Rao', comments: 'Isolated token expiration anomaly' },
        { stage: 'Blocked', timestamp: 'Oct 05, 15:20 - 16:45', duration: '1h 25m', actor: 'ERP Infra Admin', reason: 'Waiting for IAM permission elevation', impact: 'Task stalled' },
        { stage: 'Development', timestamp: 'Oct 05, 16:45', duration: '40m', actor: 'Arjun Rao', comments: 'Applied exponential backoff and retries' },
        { stage: 'Completed', timestamp: 'Oct 05, 17:45', duration: 'Done', actor: 'System', comments: 'Incident resolved' }
      ]
    },
    {
      id: 'ACT-101',
      name: 'SAP BAPI Order Queue Reconciliation',
      projectId: 'proj-01',
      projectName: 'Project Alpha',
      type: 'Integration',
      priority: 'High',
      complexity: 4,
      assignedDate: '2026-10-05',
      startedDate: '2026-10-05 18:00',
      expectedDurationHours: 8,
      actualDurationHours: 1.5,
      status: 'In Progress',
      slaStatus: 'At Risk',
      qualityPct: 92,
      reworkCycles: 0,
      dependencies: 'SAP RFC connection pooling',
      delayAttribution: 'none',
      aiObservation: 'Currently in progress. Candidate for redistribution in workload rebalancing simulation.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Oct 05, 17:50', duration: '10m', actor: 'Lead', comments: 'High priority backlog item' },
        { stage: 'Started', timestamp: 'Oct 05, 18:00', duration: '1h 30m', actor: 'Arjun Rao', comments: 'Initial socket benchmark' }
      ]
    },
    {
      id: 'ACT-102',
      name: 'Catalog Delta Batch Processor',
      projectId: 'proj-02',
      projectName: 'Project Beta',
      type: 'Integration',
      priority: 'Medium',
      complexity: 3,
      assignedDate: '2026-10-05',
      startedDate: '2026-10-06 09:00',
      expectedDurationHours: 6,
      actualDurationHours: 0,
      status: 'In Progress',
      slaStatus: 'Met',
      qualityPct: 95,
      reworkCycles: 0,
      dependencies: 'PostgreSQL read replica',
      delayAttribution: 'none',
      aiObservation: 'Medium-priority task. Ideal candidate to offload to QA/Integration buffer.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Oct 05, 18:15', duration: '15m', actor: 'Lead', comments: 'Scheduled for tomorrow morning' }
      ]
    }
  ],

  // Project Contribution
  projects: [
    {
      projectId: 'proj-01',
      projectName: 'Project Alpha (B2B E-Commerce Core)',
      contributionPct: 42,
      tasksTotal: 32,
      tasksCompleted: 28,
      slaAdherence: 94,
      qualityScore: 93,
      hoursSpent: 168,
      role: 'Lead Integration Architect'
    },
    {
      projectId: 'proj-02',
      projectName: 'Project Beta (ERP Real-Time Connector)',
      contributionPct: 31,
      tasksTotal: 21,
      tasksCompleted: 19,
      slaAdherence: 98,
      qualityScore: 96,
      hoursSpent: 124,
      role: 'Core Integration Specialist'
    },
    {
      projectId: 'proj-03',
      projectName: 'Support & Escalation Triage',
      contributionPct: 15,
      tasksTotal: 14,
      tasksCompleted: 12,
      slaAdherence: 91,
      qualityScore: 89,
      hoursSpent: 60,
      role: 'L3 Escalation Engineer'
    },
    {
      projectId: 'proj-04',
      projectName: 'Internal Platform Tooling',
      contributionPct: 12,
      tasksTotal: 8,
      tasksCompleted: 8,
      slaAdherence: 100,
      qualityScore: 97,
      hoursSpent: 48,
      role: 'Module Author'
    }
  ],

  // Attendance & Working Hours
  attendance: [
    {
      month: 'September',
      workingDays: 22,
      leaveDays: 1,
      unplannedAbsences: 0,
      avgDailyHours: 9.1,
      overtimeHours: 24,
      lateStarts: 1,
      earlyExits: 0
    },
    {
      month: 'August',
      workingDays: 21,
      leaveDays: 1,
      unplannedAbsences: 0,
      avgDailyHours: 8.6,
      overtimeHours: 12,
      lateStarts: 0,
      earlyExits: 0
    },
    {
      month: 'July',
      workingDays: 23,
      leaveDays: 0,
      unplannedAbsences: 0,
      avgDailyHours: 8.1,
      overtimeHours: 4,
      lateStarts: 0,
      earlyExits: 0
    },
    {
      month: 'June',
      workingDays: 21,
      leaveDays: 2,
      unplannedAbsences: 0,
      avgDailyHours: 8.0,
      overtimeHours: 0,
      lateStarts: 0,
      earlyExits: 1
    }
  ],

  // Collaboration & Dependencies
  dependenciesBlockedBy: [
    { name: 'ERP Team (NetSuite/SAP)', count: 2, description: 'Credentials handshake & OAuth token refresh delay' },
    { name: 'QA Staging Cluster', count: 1, description: 'Regression queue wait during peak build cycles' },
    { name: 'Client Approval Gateway', count: 1, description: 'Sign-off on custom tax reconciliation logic' },
    { name: 'API Partner Sandbox', count: 2, description: 'Intermittent sandbox 504 timeouts on FX feed' }
  ],
  collaborationCounts: {
    handoffs: 18,
    reviews: 24,
    escalations: 4,
    crossTeamTasks: 12
  },

  // AI Performance Explanation
  aiExplanation: {
    summary:
      "Arjun's productivity has decreased 6% over the last month while workload increased 19%. The employee is currently operating at approximately 112% estimated capacity and has accumulated 18% more overtime than the previous period. Task quality remains strong at 91%, suggesting the decline is more likely associated with workload pressure than deterioration in work quality. Three of the employee's delayed tasks were associated with external dependencies.",
    conclusion: 'Potential workload imbalance rather than individual performance deterioration.',
    confidence: 89,
    externalDependencyDelayedCount: 3
  },

  // AI Recommendations
  aiRecommendations: [
    {
      id: 'rec-emp-1',
      title: 'Reduce active workload',
      action: 'Move 2 medium-priority tasks (Catalog Delta Batch & Invoice Bridge) to another available team member in Integration/QA buffer.',
      category: 'Workload',
      impact: 'Reduces capacity utilization from 112% to 94%, releasing 6.5 hours of weekly stress.'
    },
    {
      id: 'rec-emp-2',
      title: 'Reduce task switching',
      action: 'Group related Project Alpha SAP integration tickets together to avoid cognitive context-switching penalties.',
      category: 'Workflow',
      impact: 'Estimated +4% recovery in focus time and -1.5h weekly overhead.'
    },
    {
      id: 'rec-emp-3',
      title: 'Review external dependency blocker',
      action: 'Escalate the API credential provisioning bottleneck with the Client ERP Infrastructure team.',
      category: 'Dependency',
      impact: 'Eliminates recurring 1.5h to 2h idle wait states on integration webhooks.'
    },
    {
      id: 'rec-emp-4',
      title: 'Avoid additional overtime next week',
      action: 'Enforce current capacity threshold to prevent cognitive burnout and protect 91% quality rating.',
      category: 'Policy',
      impact: 'Normalizes weekly hours from 46h back to 38.5h target band.'
    }
  ]
};

export const priyaSharma360: Employee360Data = {
  id: 'EMP-1088',
  name: 'Priya Sharma',
  role: 'Senior QA Analyst',
  department: 'Quality Assurance',
  teamId: 'qa',
  teamName: 'QA Team',
  avatarUrl: '',
  currentProject: 'Project Alpha & Beta',
  status: 'Healthy',
  workloadRiskScore: 34,
  workloadRiskLabel: 'Healthy / Low risk',

  productivityIndex: 93,
  productivityTrendPct: 4,
  capacityUtilization: 82,
  capacityStatus: 'Available capacity',
  qualityScore: 96,
  qualityTrendPct: 1,
  taskCompletionRate: 94,
  taskCompletionTrendPct: 2,
  slaAdherence: 98,
  overtimePct: 3,
  overtimeHoursMonthly: 4,
  absenteeismRate: 1.2,
  engagementScore: 84,
  engagementPreviousScore: 82,
  engagementDelta: 2,

  assignedHoursWeekly: 33,
  availableCapacityWeekly: 40,
  activeTasksCount: 5,
  highPriorityTasks: 1,
  mediumPriorityTasks: 3,
  lowPriorityTasks: 1,
  projectWorkloadDistribution: [
    { name: 'Project Alpha QA', percentage: 55, color: '#0066CC' },
    { name: 'Project Beta QA', percentage: 35, color: '#0A84FF' },
    { name: 'Automation Suite', percentage: 10, color: '#10B981' }
  ],

  timelinePoints: [
    { date: 'Jun 15', productivity: 90, workload: 80, workingHours: 38, overtime: 0, taskCompletion: 92, quality: 95, slaAdherence: 97, tasksCompleted: 18, contextNote: 'Automated test suite maintenance' },
    { date: 'Jul 15', productivity: 91, workload: 81, workingHours: 38.5, overtime: 0.5, taskCompletion: 93, quality: 95, slaAdherence: 98, tasksCompleted: 19, contextNote: 'Regression harness for Alpha v1' },
    { date: 'Aug 15', productivity: 92, workload: 82, workingHours: 39, overtime: 1, taskCompletion: 94, quality: 96, slaAdherence: 98, tasksCompleted: 20, contextNote: 'Cypress E2E test execution' },
    { date: 'Sep 15', productivity: 93, workload: 82, workingHours: 39, overtime: 1.5, taskCompletion: 94, quality: 96, slaAdherence: 98, tasksCompleted: 21, contextNote: 'High test coverage, low defect leakage' },
    { date: 'Oct 14', productivity: 93, workload: 82, workingHours: 39, overtime: 1, taskCompletion: 94, quality: 96, slaAdherence: 98, tasksCompleted: 20, contextNote: 'Healthy buffer available for rebalancing' }
  ],

  workJourney: [
    { id: 'pw-1', date: 'October 5', timestamp: '09:00', type: 'start', title: 'Started work', details: 'Automated test run review' },
    { id: 'pw-2', date: 'October 5', timestamp: '10:15', type: 'complete', title: 'Completed E2E Regression Run #381', details: '142 test scenarios passed' },
    { id: 'pw-3', date: 'October 5', timestamp: '14:00', type: 'review', title: 'Reviewed API-2841 staging build', details: 'Signed off on invoice schema validation' },
    { id: 'pw-4', date: 'October 5', timestamp: '17:30', type: 'logout', title: 'Logged out on schedule', details: 'Zero overtime required' }
  ],

  tasks: [
    {
      id: 'QA-501',
      name: 'E2E Checkout Regression Suite',
      projectId: 'proj-01',
      projectName: 'Project Alpha',
      type: 'Feature',
      priority: 'High',
      complexity: 3,
      assignedDate: '2026-10-04',
      startedDate: '2026-10-04 09:30',
      completedDate: '2026-10-05 10:15',
      expectedDurationHours: 6,
      actualDurationHours: 5.2,
      status: 'Completed',
      slaStatus: 'Met',
      qualityPct: 98,
      reworkCycles: 0,
      dependencies: 'None',
      delayAttribution: 'none',
      aiObservation: 'Execution completed 13% faster than historical benchmark with zero test flakiness.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Oct 04, 09:15', duration: '15m', actor: 'Lead' },
        { stage: 'Started', timestamp: 'Oct 04, 09:30', duration: '4h 45m', actor: 'Priya Sharma' },
        { stage: 'Completed', timestamp: 'Oct 05, 10:15', duration: 'Done', actor: 'System' }
      ]
    }
  ],

  projects: [
    { projectId: 'proj-01', projectName: 'Project Alpha (B2B E-Commerce)', contributionPct: 55, tasksTotal: 38, tasksCompleted: 36, slaAdherence: 98, qualityScore: 97, hoursSpent: 110, role: 'Lead QA Engineer' },
    { projectId: 'proj-02', projectName: 'Project Beta (ERP Real-Time Connector)', contributionPct: 35, tasksTotal: 22, tasksCompleted: 21, slaAdherence: 97, qualityScore: 95, hoursSpent: 70, role: 'Senior QA Analyst' }
  ],

  attendance: [
    { month: 'September', workingDays: 22, leaveDays: 0, unplannedAbsences: 0, avgDailyHours: 8.1, overtimeHours: 3, lateStarts: 0, earlyExits: 0 },
    { month: 'August', workingDays: 21, leaveDays: 1, unplannedAbsences: 0, avgDailyHours: 8.0, overtimeHours: 2, lateStarts: 0, earlyExits: 0 }
  ],

  dependenciesBlockedBy: [
    { name: 'Staging Server Reboot', count: 1, description: 'Weekly patch cycle on Wednesday' }
  ],
  collaborationCounts: { handoffs: 22, reviews: 38, escalations: 1, crossTeamTasks: 16 },

  aiExplanation: {
    summary: 'Priya continues to demonstrate high operational consistency with 96% quality rating and 82% capacity utilization. Her current buffer of ~7 hours/week makes her a prime candidate to absorb redistributed test validation tasks.',
    conclusion: 'Team capacity buffer available to absorb tasks from overloaded Engineering members.',
    confidence: 94,
    externalDependencyDelayedCount: 0
  },

  aiRecommendations: [
    {
      id: 'rec-priya-1',
      title: 'Assign verification of Magento API modules',
      action: 'Transfer 2 verification workflows from Engineering to Priya to rebalance team load.',
      category: 'Workload',
      impact: 'Absorbs 5.5 hours, keeping her utilization at an optimal 92%.'
    }
  ]
};

export const rahulMehta360: Employee360Data = {
  id: 'EMP-1095',
  name: 'Rahul Mehta',
  role: 'Integration Engineer',
  department: 'Integration',
  teamId: 'integration',
  teamName: 'Integration Team',
  avatarUrl: '',
  currentProject: 'ERP Sync Connector',
  status: 'At Risk',
  workloadRiskScore: 78,
  workloadRiskLabel: 'Elevated workload risk',

  productivityIndex: 78,
  productivityTrendPct: -8,
  capacityUtilization: 104,
  capacityStatus: 'Over capacity',
  qualityScore: 87,
  qualityTrendPct: -1,
  taskCompletionRate: 83,
  taskCompletionTrendPct: -6,
  slaAdherence: 89,
  overtimePct: 14,
  overtimeHoursMonthly: 19,
  absenteeismRate: 3.2,
  engagementScore: 68,
  engagementPreviousScore: 74,
  engagementDelta: -6,

  assignedHoursWeekly: 41.5,
  availableCapacityWeekly: 40,
  activeTasksCount: 7,
  highPriorityTasks: 3,
  mediumPriorityTasks: 3,
  lowPriorityTasks: 1,
  projectWorkloadDistribution: [
    { name: 'ERP Connector', percentage: 60, color: '#0066CC' },
    { name: 'Support Triage', percentage: 25, color: '#F59E0B' },
    { name: 'Documentation', percentage: 15, color: '#64748B' }
  ],

  timelinePoints: [
    { date: 'Jun 15', productivity: 86, workload: 92, workingHours: 39, overtime: 1, taskCompletion: 90, quality: 89, slaAdherence: 95, tasksCompleted: 14, contextNote: 'Single project focus' },
    { date: 'Jul 15', productivity: 85, workload: 96, workingHours: 40, overtime: 2, taskCompletion: 89, quality: 88, slaAdherence: 93, tasksCompleted: 13, contextNote: 'Secondary support duty added' },
    { date: 'Aug 15', productivity: 82, workload: 100, workingHours: 41, overtime: 6, taskCompletion: 87, quality: 88, slaAdherence: 92, tasksCompleted: 13, contextNote: 'High frequency ticket context switching' },
    { date: 'Sep 15', productivity: 80, workload: 103, workingHours: 42.5, overtime: 12, taskCompletion: 85, quality: 87, slaAdherence: 90, tasksCompleted: 12, contextNote: 'NetSuite batch sync timeout investigations' },
    { date: 'Oct 14', productivity: 78, workload: 104, workingHours: 43, overtime: 14, taskCompletion: 83, quality: 87, slaAdherence: 89, tasksCompleted: 11, contextNote: 'High fatigue, frequent context-switching' }
  ],

  workJourney: [
    { id: 'rw-1', date: 'October 5', timestamp: '09:10', type: 'start', title: 'Started work', details: 'Triaged ERP sync error queues' },
    { id: 'rw-2', date: 'October 5', timestamp: '11:00', type: 'escalate', title: 'Escalated NetSuite Rate Limit', details: 'Third party REST API returned 429 Too Many Requests' },
    { id: 'rw-3', date: 'October 5', timestamp: '16:30', type: 'complete', title: 'Applied Request Throttling', details: 'Mitigated 429 storm with leaky bucket queue' },
    { id: 'rw-4', date: 'October 5', timestamp: '18:45', type: 'logout', title: 'Logged out with Overtime', overtime: '1h 15m', details: 'Worked through queue backlog' }
  ],

  tasks: [
    {
      id: 'INT-330',
      name: 'NetSuite Rate Limiter & Backoff',
      projectId: 'proj-02',
      projectName: 'Project Beta',
      type: 'Integration',
      priority: 'High',
      complexity: 4,
      assignedDate: '2026-10-04',
      startedDate: '2026-10-04 10:00',
      completedDate: '2026-10-05 16:30',
      expectedDurationHours: 6,
      actualDurationHours: 7.8,
      status: 'Completed',
      slaStatus: 'Met',
      qualityPct: 91,
      reworkCycles: 0,
      dependencies: 'NetSuite API sandbox credentials',
      delayAttribution: 'external_dependency',
      aiObservation: 'Prolonged duration was linked to sandbox 429 throttling tests and external network latency.',
      workingStages: [
        { stage: 'Assigned', timestamp: 'Oct 04, 10:00', duration: '30m', actor: 'Lead' },
        { stage: 'Started', timestamp: 'Oct 04, 10:30', duration: '4h', actor: 'Rahul Mehta' },
        { stage: 'Blocked', timestamp: 'Oct 05, 11:00 - 12:30', duration: '1h 30m', actor: 'NetSuite Sandbox', reason: 'Sandbox rate limiting locked tenant', impact: 'Delayed queue drain' },
        { stage: 'Completed', timestamp: 'Oct 05, 16:30', duration: 'Done', actor: 'System' }
      ]
    }
  ],

  projects: [
    { projectId: 'proj-02', projectName: 'Project Beta (ERP Real-Time Connector)', contributionPct: 60, tasksTotal: 25, tasksCompleted: 21, slaAdherence: 90, qualityScore: 88, hoursSpent: 120, role: 'Integration Specialist' },
    { projectId: 'proj-03', projectName: 'Support & Escalation Triage', contributionPct: 25, tasksTotal: 16, tasksCompleted: 13, slaAdherence: 86, qualityScore: 85, hoursSpent: 55, role: 'On-Call Tier 2' }
  ],

  attendance: [
    { month: 'September', workingDays: 22, leaveDays: 1, unplannedAbsences: 1, avgDailyHours: 8.8, overtimeHours: 19, lateStarts: 2, earlyExits: 0 },
    { month: 'August', workingDays: 21, leaveDays: 1, unplannedAbsences: 0, avgDailyHours: 8.5, overtimeHours: 14, lateStarts: 1, earlyExits: 0 }
  ],

  dependenciesBlockedBy: [
    { name: 'NetSuite API Sandbox Quota', count: 3, description: '429 concurrency throttles during load tests' }
  ],
  collaborationCounts: { handoffs: 14, reviews: 19, escalations: 5, crossTeamTasks: 9 },

  aiExplanation: {
    summary: 'Rahul is experiencing chronic context-switching overhead between ERP feature work and high-urgency tier-2 support escalations. Overtime (+14%) is accelerating, and engagement has dipped 6 points.',
    conclusion: 'Shield employee from ad-hoc ticket interruptions to restore sprint flow.',
    confidence: 87,
    externalDependencyDelayedCount: 2
  },

  aiRecommendations: [
    {
      id: 'rec-rahul-1',
      title: 'Rotate support on-call duties',
      action: 'Transfer support triage queue to Solutions/QA rotation for the next 2 sprints.',
      category: 'Workflow',
      impact: 'Reduces context-switching by 40% and normalizes working hours.'
    }
  ]
};

export const employees360Registry: Record<string, Employee360Data> = {
  'EMP-1042': arjunRao360,
  'emp-03': arjunRao360,
  'EMP-1088': priyaSharma360,
  'emp-08': priyaSharma360,
  'EMP-1095': rahulMehta360,
  'emp-05': rahulMehta360
};

export const getAll360Employees = (): Employee360Data[] => {
  return [arjunRao360, priyaSharma360, rahulMehta360];
};

export const getEmployee360ById = (id: string): Employee360Data => {
  if (employees360Registry[id]) {
    return employees360Registry[id];
  }
  return arjunRao360;
};
