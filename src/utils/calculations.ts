import { Team, HealthScoreBreakdown, ConfigurableWeights, SimulationScenario, Task } from '../types';

export function calculateCapacityUtilization(workloadHours: number, availableHours: number): number {
  if (availableHours <= 0) return 0;
  return Math.round((workloadHours / availableHours) * 100);
}

export function calculateProductivityIndex(completedTasks: number, avgComplexity: number, productiveHours: number): number {
  if (productiveHours <= 0) return 0;
  const weightedThroughput = completedTasks * avgComplexity;
  // normalized to 100-scale baseline
  const baseRate = (weightedThroughput / productiveHours) * 45;
  return Math.min(100, Math.max(10, Math.round(baseRate)));
}

export function calculateOvertimeRisk(overtimeRate: number, consecutiveWeeks: number, utilization: number): 'Critical' | 'High' | 'Monitor' | 'Healthy' {
  if (overtimeRate >= 20 || (overtimeRate >= 15 && consecutiveWeeks >= 3) || utilization >= 115) {
    return 'Critical';
  }
  if (overtimeRate >= 12 || utilization >= 105) {
    return 'High';
  }
  if (overtimeRate >= 6 || utilization >= 95) {
    return 'Monitor';
  }
  return 'Healthy';
}

export function calculateSustainabilityScore(overtimeRate: number, engagementScore: number, reworkRate: number, absenteeismRate: number): number {
  // Higher is healthier (0-100)
  const otPenalty = Math.min(40, overtimeRate * 1.5);
  const reworkPenalty = Math.min(25, reworkRate * 2.5);
  const absentPenalty = Math.min(15, absenteeismRate * 2.5);
  const baseEngagement = engagementScore * 0.6;
  
  const score = Math.round(baseEngagement + 40 - (otPenalty * 0.5 + reworkPenalty * 0.4 + absentPenalty * 0.3));
  return Math.max(20, Math.min(100, score));
}

export function calculateCompositeHealthScore(
  teams: Team[],
  weights: ConfigurableWeights
): HealthScoreBreakdown {
  const totalWeight =
    weights.capacityWeight +
    weights.workloadWeight +
    weights.productivityWeight +
    weights.qualityWeight +
    weights.engagementWeight +
    weights.sustainabilityWeight;

  // Average team metrics
  const avgUtil = teams.reduce((acc, t) => acc + t.capacityUtilization, 0) / teams.length;
  const avgComp = teams.reduce((acc, t) => acc + t.taskCompletionRate, 0) / teams.length;
  const avgQual = teams.reduce((acc, t) => acc + t.qualityScore, 0) / teams.length;
  const avgEng = teams.reduce((acc, t) => acc + t.engagementScore, 0) / teams.length;
  const avgOt = teams.reduce((acc, t) => acc + t.overtimeRate, 0) / teams.length;
  const avgRework = teams.reduce((acc, t) => acc + t.reworkRate, 0) / teams.length;
  const avgAbsent = teams.reduce((acc, t) => acc + t.absenteeismRate, 0) / teams.length;

  // Sub-scores (0-100)
  const capacityScore = Math.max(0, Math.min(100, Math.round(100 - Math.abs(avgUtil - 82) * 1.2)));
  const workloadScore = Math.max(0, Math.min(100, Math.round(100 - Math.max(0, avgUtil - 85) * 1.8)));
  const productivityScore = Math.max(0, Math.min(100, Math.round(avgComp * 0.9 + 5)));
  const qualityScore = Math.max(0, Math.min(100, Math.round(avgQual)));
  const engagementScore = Math.max(0, Math.min(100, Math.round(avgEng)));
  const sustainabilityScore = calculateSustainabilityScore(avgOt, avgEng, avgRework, avgAbsent);

  // Overall weighted composite
  const overall = Math.round(
    (capacityScore * weights.capacityWeight +
      workloadScore * weights.workloadWeight +
      productivityScore * weights.productivityWeight +
      qualityScore * weights.qualityWeight +
      engagementScore * weights.engagementWeight +
      sustainabilityScore * weights.sustainabilityWeight) /
      totalWeight
  );

  let statusLabel = 'Healthy';
  if (overall < 70) {
    statusLabel = 'Critical Risk';
  } else if (overall < 80) {
    statusLabel = 'Needs Attention';
  } else if (overall < 90) {
    statusLabel = 'Good';
  } else {
    statusLabel = 'Optimal';
  }

  return {
    overall,
    statusLabel,
    capacity: capacityScore,
    workload: workloadScore,
    productivity: productivityScore,
    quality: qualityScore,
    engagement: engagementScore,
    sustainability: sustainabilityScore
  };
}

export function simulateWorkloadShift(
  tasksToMove: number,
  fromTeam: Team,
  toTeam: Team,
  avgHoursPerTask: number = 11.5
): {
  fromTeamNewCapacity: number;
  toTeamNewCapacity: number;
  fromTeamOvertimeDelta: number;
  overallOvertimeDelta: number;
  deadlineRiskReduction: number;
  backlogReduction: number;
  productivityGainPct: number;
} {
  const hoursMoved = tasksToMove * avgHoursPerTask;

  const fromNewWorkload = Math.max(fromTeam.availableHours * 0.7, fromTeam.workloadHours - hoursMoved);
  const toNewWorkload = toTeam.workloadHours + hoursMoved;

  const fromTeamNewCapacity = calculateCapacityUtilization(fromNewWorkload, fromTeam.availableHours);
  const toTeamNewCapacity = calculateCapacityUtilization(toNewWorkload, toTeam.availableHours);

  // Overtime reduction model based on exponential fatigue recovery
  const capacityExcessBefore = Math.max(0, fromTeam.capacityUtilization - 100);
  const capacityExcessAfter = Math.max(0, fromTeamNewCapacity - 100);
  const fromTeamOvertimeDelta = Math.round((capacityExcessAfter - capacityExcessBefore) * 1.1);

  const deadlineRiskReduction = Math.min(25, Math.round(tasksToMove * 0.95));
  const backlogReduction = Math.min(30, Math.round(tasksToMove * 0.8));
  const productivityGainPct = Math.round((fromTeam.capacityUtilization - fromTeamNewCapacity) * 0.35);

  return {
    fromTeamNewCapacity,
    toTeamNewCapacity,
    fromTeamOvertimeDelta,
    overallOvertimeDelta: Math.round(fromTeamOvertimeDelta * 0.8),
    deadlineRiskReduction,
    backlogReduction,
    productivityGainPct
  };
}
