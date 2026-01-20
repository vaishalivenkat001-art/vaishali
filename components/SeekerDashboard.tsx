
import React, { useState } from 'react';
import { User, Job, Application } from '../types';
import JobCard from './JobCard';

interface SeekerDashboardProps {
  user: User;
  jobs: Job[];
  applications: Application[];
  onApply: (job: Job) => void;
  onSave: (id: string) => void;
}

const SeekerDashboard: React.FC<SeekerDashboardProps> = ({ user, jobs, applications, onApply, onSave }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'applications' | 'profile'>('browse');

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-200 w-fit">
        {[
          { id: 'browse', label: 'Explore Jobs', icon: 'fa-search' },
          { id: 'applications', label: 'My Applications', icon: 'fa-paper-plane' },
          { id: 'profile', label: 'Talent Profile', icon: 'fa-id-card' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <i className={`fas ${tab.icon}`}></i> {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between">
              Recommended for you
              <span className="text-xs font-normal text-gray-400">Showing {jobs.length} jobs</span>
            </h2>
            {jobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                user={user} 
                onApply={onApply} 
                isApplied={applications.some(a => a.jobId === job.id)} 
              />
            ))}
          </div>
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Job Match Score</h3>
              <div className="w-24 h-24 rounded-full border-8 border-indigo-50 flex items-center justify-center mx-auto mb-4 relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-indigo-600" strokeDasharray="251.2" strokeDashoffset="50" />
                </svg>
                <span className="text-2xl font-black text-indigo-600">82%</span>
              </div>
              <p className="text-xs text-center text-gray-500">Your profile matches 82% of current market requirements for Frontend roles.</p>
            </div>
            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
                 <p className="text-gray-400 text-xs leading-relaxed">Adding "System Architecture" to your skills could increase your reach by 15%.</p>
               </div>
               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
            </div>
          </aside>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
           <table className="w-full text-left">
             <thead className="bg-gray-50 border-b border-gray-200">
               <tr>
                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Role & Company</th>
                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Applied Date</th>
                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">AI Score</th>
                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {applications.map(app => (
                 <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                   <td className="px-6 py-4">
                     <p className="font-bold text-gray-900">{jobs.find(j => j.id === app.jobId)?.title}</p>
                     <p className="text-xs text-gray-500">{jobs.find(j => j.id === app.jobId)?.companyName}</p>
                   </td>
                   <td className="px-6 py-4 text-sm text-gray-500">{app.appliedAt}</td>
                   <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded text-xs font-black ${app.aiScore && app.aiScore > 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                       {app.aiScore ? `${app.aiScore}%` : 'Pending'}
                     </span>
                   </td>
                   <td className="px-6 py-4">
                     <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">{app.status}</span>
                   </td>
                 </tr>
               ))}
               {applications.length === 0 && (
                 <tr>
                   <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">No applications found.</td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto shadow-sm">
           <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl text-indigo-600 border-4 border-white shadow-lg">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-100">Profile Verified</span>
                </div>
              </div>
           </div>
           
           <div className="space-y-6">
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Biography</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{user.bio || 'Add a bio to attract employers...'}</p>
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Core Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map(skill => (
                    <span key={skill} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-sm font-bold border border-indigo-100">{skill}</span>
                  ))}
                </div>
              </div>
              <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                <i className="fas fa-edit"></i> Edit Public Profile
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;
