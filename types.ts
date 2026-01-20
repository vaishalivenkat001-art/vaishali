
export enum UserRole {
  SEEKER = 'SEEKER',
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  skills?: string[];
  bio?: string;
  companyId?: string;
  savedJobIds?: string[];
  isVerified?: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  isVerified: boolean;
  website: string;
}

export interface ScreeningQuestion {
  id: string;
  question: string;
  type: 'text' | 'yesno';
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  postedAt: string;
  employerId: string;
  category: string;
  requirements: string[];
  experienceLevel: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  screeningQuestions?: ScreeningQuestion[];
  isFeatured?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  seekerName: string;
  seekerEmail: string;
  status: 'Pending' | 'Reviewed' | 'Shortlisted' | 'Rejected' | 'Hired';
  appliedAt: string;
  aiScore?: number;
  aiFeedback?: string;
  answers?: Record<string, string>;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface AppState {
  currentUser: User | null;
  jobs: Job[];
  applications: Application[];
  companies: Company[];
  notifications: Notification[];
}
