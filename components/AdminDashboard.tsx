
import React from 'react';
import { User, Job, Company } from '../types';

interface AdminDashboardProps {
  users: User[];
  jobs: Job[];
  companies: Company[];
  onVerifyCompany: (id: string) => void;
  onModerateJob: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, jobs, companies, onVerifyCompany, onModerateJob }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Control Panel</h1>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Users</p>
              <p className="text-xl font-black text-gray-900">{users.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-building"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Verified</p>
              <p className="text-xl font-black text-gray-900">{companies.filter(c => c.isVerified).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <i className="fas fa-shield-alt text-indigo-500"></i> Company Verification
            </h2>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Pending: {companies.filter(c => !c.isVerified).length}</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
            {companies.map(company => (
              <div key={company.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={company.logo} className="w-10 h-10 rounded-lg border border-gray-200" alt="" />
                  <div>
                    <p className="font-bold text-gray-900">{company.name}</p>
                    <p className="text-xs text-gray-500">{company.industry} • {company.website}</p>
                  </div>
                </div>
                {company.isVerified ? (
                  <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                    <i className="fas fa-check-circle"></i> Verified
                  </span>
                ) : (
                  <button 
                    onClick={() => onVerifyCompany(company.id)}
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                  >
                    Approve
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <i className="fas fa-gavel text-amber-500"></i> Content Moderation
            </h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
            {jobs.map(job => (
              <div key={job.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">{job.title}</p>
                  <p className="text-xs text-gray-500">Posted by {job.companyName} on {job.postedAt}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors"><i className="fas fa-eye"></i></button>
                  <button 
                    onClick={() => onModerateJob(job.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
