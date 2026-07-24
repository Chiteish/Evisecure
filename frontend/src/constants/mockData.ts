import type { User, CaseItem, EvidenceItem, NotificationItem, DashboardStats } from '../types';

export const MOCK_USER: User = {
  id: 'usr-101',
  name: 'Det. Sarah Vance',
  email: 's.vance@metropolice.gov',
  role: 'police_officer',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  badgeNumber: 'MPD-88492',
  department: 'Cyber Crime Investigation Division',
  lastLogin: '2026-07-21T18:42:10Z',
};

export const MOCK_STATS: DashboardStats = {
  totalCases: 148,
  activeCases: 32,
  pendingVerification: 14,
  evidenceUploaded: 842,
  aiAnalysisCompleted: 790,
  storageUsedGB: 412.5,
  storageTotalGB: 1000.0,
};

export const MOCK_CASES: CaseItem[] = [
  {
    id: 'case-001',
    caseNumber: 'CR-2026-0892',
    title: 'Financial System Intrusion & Tampering',
    description: 'Unauthorized access to central clearing bank database leading to modified ledger entries.',
    status: 'Under Investigation',
    priority: 'Critical',
    assignedOfficer: 'Det. Sarah Vance',
    department: 'Cyber Crime Division',
    evidenceCount: 18,
    createdAt: '2026-07-10T09:30:00Z',
    updatedAt: '2026-07-20T14:15:00Z',
    tags: ['Cybersecurity', 'Financial', 'Database'],
  },
  {
    id: 'case-002',
    caseNumber: 'CR-2026-0744',
    title: 'Deepfake Executive Extortion',
    description: 'Synthetic audio and video recordings used in attempted C-suite blackmail scheme.',
    status: 'Open',
    priority: 'High',
    assignedOfficer: 'Dr. Marcus Vance',
    department: 'Forensic AI Unit',
    evidenceCount: 9,
    createdAt: '2026-07-12T11:20:00Z',
    updatedAt: '2026-07-21T10:05:00Z',
    tags: ['AI Deepfake', 'Extortion', 'Media Fraud'],
  },
  {
    id: 'case-003',
    caseNumber: 'CR-2026-0610',
    title: 'Port Authority Cargo Manifest Alteration',
    description: 'Suspicious modifications to automated Customs container logs at Pier 14.',
    status: 'Pending Verification',
    priority: 'Medium',
    assignedOfficer: 'Officer David Ross',
    department: 'Maritime Security',
    evidenceCount: 24,
    createdAt: '2026-07-05T08:10:00Z',
    updatedAt: '2026-07-18T16:50:00Z',
    tags: ['Logistics', 'Manifest', 'Customs'],
  },
  {
    id: 'case-004',
    caseNumber: 'CR-2026-0521',
    title: 'State Records Vault Exfiltration',
    description: 'Encrypted flash drive seized during traffic stop containing sensitive government credentials.',
    status: 'Closed',
    priority: 'High',
    assignedOfficer: 'Det. Sarah Vance',
    department: 'Cyber Crime Division',
    evidenceCount: 31,
    createdAt: '2026-06-20T15:00:00Z',
    updatedAt: '2026-07-01T12:00:00Z',
    tags: ['Exfiltration', 'Hardware', 'Credentials'],
  },
];

export const MOCK_EVIDENCE: EvidenceItem[] = [
  {
    id: 'ev-901',
    caseId: 'case-001',
    caseNumber: 'CR-2026-0892',
    title: 'Server Access Log (SQL Dump)',
    fileType: 'Network Log',
    fileName: 'auth_log_2026_07_10.log',
    fileSize: '42.8 MB',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    uploadedBy: 'Det. Sarah Vance',
    uploadedAt: '2026-07-10T10:14:00Z',
    status: 'Verified',
    locationObtained: 'Primary Data Center Server R42',
    custodian: 'Det. Sarah Vance',
    chainOfCustody: [
      {
        id: 'coc-1',
        timestamp: '2026-07-10T10:14:00Z',
        action: 'Evidence Ingested',
        actor: 'Det. Sarah Vance',
        actorRole: 'Police Officer',
        details: 'Initial disk image copy created and cryptographic SHA-256 hash computed.',
        blockchainTxHash: '0x8f3c...9b12a'
      },
      {
        id: 'coc-2',
        timestamp: '2026-07-11T08:30:00Z',
        action: 'AI Verification Analysis',
        actor: 'EviSecure AI Engine v4',
        actorRole: 'Automated Service',
        details: 'Integrity scan verified zero hash drift; log sequence analysis completed.',
        blockchainTxHash: '0x4a12...7e89c'
      }
    ],
    aiAnalysis: {
      confidenceScore: 98.4,
      riskLevel: 'Low',
      status: 'Completed',
      analysisDate: '2026-07-11T08:30:00Z',
      imageTamperingDetected: false,
      deepfakeDetected: false,
      audioVoiceMatched: false,
      recommendations: [
        'Log timestamps exhibit consistent NTP synchronization.',
        'No byte-level anomalies detected in log block headers.',
        'Chain of custody cryptographic signature matches initial state.'
      ]
    }
  },
  {
    id: 'ev-902',
    caseId: 'case-002',
    caseNumber: 'CR-2026-0744',
    title: 'Extortion Call Audio Recording',
    fileType: 'Audio',
    fileName: 'voip_call_intercept_744.wav',
    fileSize: '14.2 MB',
    sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    uploadedBy: 'Dr. Marcus Vance',
    uploadedAt: '2026-07-12T14:22:00Z',
    status: 'Tampered',
    locationObtained: 'Interpreted Cloud Voip Server',
    custodian: 'Dr. Marcus Vance',
    chainOfCustody: [
      {
        id: 'coc-3',
        timestamp: '2026-07-12T14:22:00Z',
        action: 'Ingestion & Analysis Request',
        actor: 'Dr. Marcus Vance',
        actorRole: 'Forensic Analyst',
        details: 'Audio file extracted from VoIP proxy logs.',
        blockchainTxHash: '0x12bc...3d99e'
      }
    ],
    aiAnalysis: {
      confidenceScore: 94.2,
      riskLevel: 'Severe',
      status: 'Completed',
      analysisDate: '2026-07-12T14:25:00Z',
      imageTamperingDetected: false,
      deepfakeDetected: true,
      audioVoiceMatched: true,
      recommendations: [
        'CRITICAL: Neural spectral analysis detected synthetic vocal synthesis (Voice Clone Model ID: ElevenLabs-v2).',
        'Phase discontinuity present around timestamp 00:42.',
        'Recommend flagging evidence as Synthetic / Deepfake in court proceedings.'
      ]
    }
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'AI Tampering Analysis Completed',
    message: 'Deepfake detected in case CR-2026-0744 audio file with 94.2% confidence.',
    timestamp: '10 minutes ago',
    read: false,
    type: 'ai',
    link: '/app/evidence'
  },
  {
    id: 'notif-2',
    title: 'New Case Assigned',
    message: 'You have been assigned as lead officer for Case CR-2026-0892.',
    timestamp: '2 hours ago',
    read: false,
    type: 'case',
    link: '/app/cases'
  },
  {
    id: 'notif-3',
    title: 'Court Review Approved',
    message: 'Judge Elena Vance validated Chain of Custody for Evidence EV-901.',
    timestamp: '1 day ago',
    read: true,
    type: 'court',
    link: '/app/reports'
  }
];
