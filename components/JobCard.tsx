
import React, { useState, useEffect } from 'react';
import { Job, User, UserRole } from '../types';
import { getMatchInsights } from '../services/geminiService';

interface JobCardProps {
  job: Job;
  user: User | null;
  onApply: (job: Job) => void;
  isApplied: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, user, onApply, isApplied }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchInsight = async () => {
    if (!user || user.role !== UserRole.SEEKER || !user.skills) return;
    setLoadingInsight(true);
    const text = await getMatchInsights(user.skills, job.requirements);
    setInsight(text);
    setLoadingInsight(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 mb-4 overflow-hidden relative group">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded">
              {job.type}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
            {/* Fix: changed job.company to job.companyName */}
            <span className="flex items-center gap-1"><i className="fas fa-building text-gray-400"></i> {job.companyName}</span>
            <span className="flex items-center gap-1"><i className="fas fa-map-marker-alt text-gray-400"></i> {job.location}</span>
            <span className="flex items-center gap-1 font-medium text-emerald-600 font-mono tracking-tight">{job.salary}</span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.requirements.slice(0, 4).map((req, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200">
                {req}
              </span>
            ))}
          </div>

          {user?.role === UserRole.SEEKER && (
             <div className="mt-4 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100/50">
               <div className="flex items-center justify-between mb-1">
                 <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-1">
                   <i className="fas fa-magic"></i> AI Match Insight
                 </span>
                 {!insight && !loadingInsight && (
                    <button 
                      onClick={fetchInsight}
                      className="text-[10px] font-bold text-indigo-600 hover:underline"
                    >
                      Get Analysis
                    </button>
                 )}
               </div>
               {loadingInsight ? (
                 <div className="flex items-center gap-2 text-xs text-indigo-400 animate-pulse">
                    <i className="fas fa-spinner fa-spin"></i> Analyzing your profile...
                 </div>
               ) : insight ? (
                 <p className="text-xs text-indigo-800 italic leading-relaxed">"{insight}"</p>
               ) : (
                 <p className="text-[10px] text-indigo-400">Analyze your compatibility with this role.</p>
               )}
             </div>
          )}
        </div>

        <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <button 
            disabled={isApplied || user?.role === UserRole.EMPLOYER}
            onClick={() => onApply(job)}
            className={`flex-1 sm:w-28 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              isApplied 
                ? 'bg-emerald-100 text-emerald-700 cursor-default' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm active:scale-95'
            }`}
          >
            {isApplied ? (
              <span className="flex items-center justify-center gap-1">
                <i className="fas fa-check"></i> Applied
              </span>
            ) : 'Apply Now'}
          </button>
          <button className="flex-1 sm:w-28 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
