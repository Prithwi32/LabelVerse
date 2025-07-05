
export enum DataType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO'
}

export enum DatasetStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  COMPLETED = 'COMPLETED'
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  walletAddress: string;
  username?: string;
  joinedAt: string;
  totalScore: number;
  totalContributions: number;
  tokenBalance: number;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  dataType: DataType;
  formatRequirements: string;
  sampleCountGoal: number;
  currentSampleCount: number;
  baseRewardPerSample: number;
  createdAt: string;
  status: DatasetStatus;
}

export interface Contribution {
  dataType: DataType;
  id: string;
  userId: string;
  datasetId: string;
  url: string;
  uploadedAt: string;
  verificationScore: number;
  status: VerificationStatus;
  description?: string;
}

export interface VerificationLog {
  id: string;
  contributionId: string;
  modelUsed: string;
  score: number;
  reason: string;
  verifiedAt: string;
}

export interface RewardTransaction {
  id: string;
  userId: string;
  contributionId: string;
  tokensAwarded: number;
  timestamp: string;
  txHash: string;
}
