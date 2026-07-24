import { create } from 'zustand';
import type { User, Role, NotificationItem, CaseItem, EvidenceItem } from '../types';
import { MOCK_USER, MOCK_NOTIFICATIONS, MOCK_CASES, MOCK_EVIDENCE } from '../constants/mockData';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  role: Role;
  setRole: (role: Role) => void;
  login: (email: string, role: Role) => void;
  logout: () => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  cases: CaseItem[];
  addCase: (newCase: CaseItem) => void;
  updateCase: (updatedCase: CaseItem) => void;
  evidence: EvidenceItem[];
  addEvidence: (newEv: EvidenceItem) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: nextTheme };
  }),
  user: MOCK_USER,
  role: 'police_officer',
  setRole: (role) => set((state) => {
    if (state.user) {
      return { role, user: { ...state.user, role } };
    }
    return { role };
  }),
  login: (email, role) => set({
    user: {
      id: 'usr-' + Math.floor(Math.random() * 1000),
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      department: 'Cyber Forensics Lab',
      lastLogin: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    },
    role,
  }),
  logout: () => set({ user: null }),
  notifications: MOCK_NOTIFICATIONS,
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  cases: MOCK_CASES,
  addCase: (newCase) => set((state) => ({ cases: [newCase, ...state.cases] })),
  updateCase: (updatedCase) => set((state) => ({
    cases: state.cases.map(c => c.id === updatedCase.id ? updatedCase : c)
  })),
  evidence: MOCK_EVIDENCE,
  addEvidence: (newEv) => set((state) => ({ evidence: [newEv, ...state.evidence] })),
}));
