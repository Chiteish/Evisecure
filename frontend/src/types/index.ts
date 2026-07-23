export type Role = 'police_officer' | 'forensic_analyst' | 'judge' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  badgeNumber?: string;
  department: string;
  lastLogin: string;
}

export type CaseStatus = 'Open' | 'Under Investigation' | 'Pending Verification' | 'Closed' | 'Archived';
export type CasePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface CaseItem {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  assignedOfficer: string;
  department: string;
  evidenceCount: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export type EvidenceType = 'Image' | 'Video' | 'Audio' | 'Document' | 'Disk Dump' | 'Network Log';
export type EvidenceStatus = 'Pending' | 'Verified' | 'Tampered' | 'Analyzing';

export interface ChainOfCustodyEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  actorRole: string;
  details: string;
  blockchainTxHash?: string;
}

export interface AIAnalysisResult {
  confidenceScore: number; // 0 - 100
  riskLevel: 'Low' | 'Medium' | 'High' | 'Severe';
  status: 'Completed' | 'Processing' | 'Failed';
  analysisDate: string;
  imageTamperingDetected: boolean;
  deepfakeDetected: boolean;
  audioVoiceMatched: boolean;
  recommendations: string[];
  heatmapUrl?: string;
}

export interface EvidenceItem {
  id: string;
  caseId: string;
  caseNumber: string;
  title: string;
  fileType: EvidenceType;
  fileName: string;
  fileSize: string;
  sha256Hash: string;
  uploadedBy: string;
  uploadedAt: string;
  status: EvidenceStatus;
  locationObtained: string;
  custodian: string;
  chainOfCustody: ChainOfCustodyEntry[];
  aiAnalysis?: AIAnalysisResult;
  previewUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'upload' | 'verification' | 'ai' | 'court' | 'case';
  link?: string;
}

export interface DashboardStats {
  totalCases: number;
  activeCases: number;
  pendingVerification: number;
  evidenceUploaded: number;
  aiAnalysisCompleted: number;
  storageUsedGB: number;
  storageTotalGB: number;
}
