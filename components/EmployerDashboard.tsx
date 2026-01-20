
import React from 'react';
import { Job, Application } from '../types';

interface EmployerDashboardProps {
  jobs: Job[];
  applications: Application[];
  onOpenPostModal: () => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ jobs, applications, onOpenPostModal }) => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
          <p className="text-gray-500">Manage your postings and review talent.</p>
        </div>
        <button 
          onClick={onOpenPostModal}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <i className="fas fa-plus"></i> Post New Job
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-briefcase text-indigo-500"></i> Active Listings ({jobs.length})
            </h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Posted</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Apps</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{job.title}</div>
                        <div className="text-xs text-gray-500">{job.location} • {job.type}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{job.postedAt}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                          {applications.filter(a => a.jobId === job.id).length}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-indigo-600 p-2"><i className="fas fa-edit"></i></button>
                        <button className="text-gray-400 hover:text-red-600 p-2"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">No active listings</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-paper-plane text-emerald-500"></i> Recent Applications
            </h2>
            <div className="space-y-3">
              {applications.map(app => {
                const job = jobs.find(j => j.id === app.jobId);
                return (
                  <div key={app.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-200 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900">{app.seekerName}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-500 uppercase">{app.status}</span>
                    </div>
                    <p className="text-xs text-indigo-600 font-medium mb-2">Applied for: {job?.title}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 py-1.5 text-[11px] font-bold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        View Resume
                      </button>
                      <button className="flex-1 py-1.5 text-[11px] font-bold border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                        Shortlist
                      </button>
                    </div>
                  </div>
                );
              })}
              {applications.length === 0 && (
                <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center">
                  <p className="text-sm text-gray-400 italic">No applications yet</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
