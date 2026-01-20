
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import SeekerDashboard from './components/SeekerDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import AdminDashboard from './components/AdminDashboard';
import PostJobModal from './components/PostJobModal';
import { User, Job, Application, UserRole, Company } from './types';
import { INITIAL_JOBS, MOCK_USER_SEEKER, MOCK_USER_EMPLOYER, MOCK_USER_ADMIN, MOCK_COMPANIES } from './constants';
import { scoreApplication } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(MOCK_USER_SEEKER);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<Application[]>([]);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleApply = async (job: Job) => {
    if (!user) return;
    
    // Simulate AI scoring on application
    const mockResume = "Experienced software engineer with skills in React and Node.js. Worked at GlobalTech for 3 years.";
    const analysis = await scoreApplication(mockResume, job.description);

    const newApp: Application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: job.id,
      seekerId: user.id,
      seekerName: user.name,
      seekerEmail: user.email,
      status: 'Pending',
      appliedAt: new Date().toISOString().split('T')[0],
      aiScore: analysis.score,
      aiFeedback: analysis.feedback
    };
    
    setApplications(prev => [newApp, ...prev]);
    alert(`Application submitted! AI Match Score: ${analysis.score}%`);
  };

  const handlePostJob = (jobData: Partial<Job>) => {
    const company = companies.find(c => c.id === user?.companyId);
    const newJob: Job = {
      ...jobData as Job,
      id: Math.random().toString(36).substr(2, 9),
      companyId: user?.companyId || '',
      companyName: company?.name || 'Unknown',
      postedAt: new Date().toISOString().split('T')[0],
      employerId: user?.id || ''
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const handleVerifyCompany = (id: string) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, isVerified: true } : c));
  };

  const handleModerateJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const switchRole = () => {
    if (user?.role === UserRole.SEEKER) setUser(MOCK_USER_EMPLOYER);
    else if (user?.role === UserRole.EMPLOYER) setUser(MOCK_USER_ADMIN);
    else setUser(MOCK_USER_SEEKER);
  };

  return (
    <Layout user={user} onLogout={() => setUser(null)} onSwitchRole={switchRole}>
      {user?.role === UserRole.SEEKER && (
        <SeekerDashboard 
          user={user} 
          jobs={jobs} 
          applications={applications.filter(a => a.seekerId === user.id)}
          onApply={handleApply}
          onSave={() => {}}
        />
      )}
      
      {user?.role === UserRole.EMPLOYER && (
        <>
          <EmployerDashboard 
            jobs={jobs.filter(j => j.employerId === user.id)} 
            applications={applications.filter(a => jobs.find(j => j.id === a.jobId)?.employerId === user.id)}
            onOpenPostModal={() => setIsPostModalOpen(true)}
          />
          <PostJobModal 
            isOpen={isPostModalOpen}
            onClose={() => setIsPostModalOpen(false)}
            onPost={handlePostJob}
            employerId={user.id}
            company={companies.find(c => c.id === user.companyId)?.name || 'Your Company'}
          />
        </>
      )}

      {user?.role === UserRole.ADMIN && (
        <AdminDashboard 
          users={[MOCK_USER_SEEKER, MOCK_USER_EMPLOYER]} 
          jobs={jobs} 
          companies={companies}
          onVerifyCompany={handleVerifyCompany}
          onModerateJob={handleModerateJob}
        />
      )}
      
      {!user && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-200 shadow-xl">
          <i className="fas fa-rocket text-6xl text-indigo-600 mb-6 animate-bounce"></i>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome to CareerStream AI</h2>
          <p className="text-gray-500 mb-8">The most intelligent job portal on the web.</p>
          <button 
            onClick={() => setUser(MOCK_USER_SEEKER)}
            className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            Get Started
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
