
import { Job, UserRole, User, Company } from './types';

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'TechFlow Systems',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TF',
    description: 'Leading the future of cloud computing and developer tools.',
    industry: 'Technology',
    isVerified: true,
    website: 'https://techflow.example'
  },
  {
    id: 'c2',
    name: 'CreativePulse',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CP',
    description: 'A global agency focused on high-end digital experiences.',
    industry: 'Design',
    isVerified: true,
    website: 'https://creativepulse.example'
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    companyId: 'c1',
    companyName: 'TechFlow Systems',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140k - $180k',
    experienceLevel: 'Senior',
    description: 'Lead our dashboard transformation using React and TypeScript.',
    postedAt: '2024-05-15',
    employerId: 'e1',
    category: 'Engineering',
    requirements: ['React', 'TypeScript', 'Tailwind CSS'],
    isFeatured: true
  },
  {
    id: '2',
    title: 'Product Designer',
    companyId: 'c2',
    companyName: 'CreativePulse',
    location: 'Remote',
    type: 'Remote',
    salary: '$110k - $150k',
    experienceLevel: 'Mid',
    description: 'Create user-centric designs for our mobile and web platforms.',
    postedAt: '2024-05-18',
    employerId: 'e2',
    category: 'Design',
    requirements: ['Figma', 'Prototyping'],
    isFeatured: false
  }
];

export const MOCK_USER_SEEKER: User = {
  id: 's1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  role: UserRole.SEEKER,
  skills: ['React', 'TypeScript', 'Node.js'],
  bio: 'Frontend enthusiast with 4 years experience.',
  savedJobIds: ['2']
};

export const MOCK_USER_EMPLOYER: User = {
  id: 'e1',
  name: 'Sarah Connor',
  email: 'sarah@techflow.com',
  role: UserRole.EMPLOYER,
  companyId: 'c1'
};

export const MOCK_USER_ADMIN: User = {
  id: 'admin1',
  name: 'Platform Admin',
  email: 'admin@careerstream.ai',
  role: UserRole.ADMIN
};
