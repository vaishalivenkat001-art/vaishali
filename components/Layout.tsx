
import React from 'react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  onSwitchRole: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onSwitchRole }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-200">
                  <i className="fas fa-rocket"></i>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">CareerStream <span className="text-indigo-600 italic">AI</span></span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden md:flex items-center gap-4 border-r pr-4 border-gray-200 mr-4">
                   <button 
                    onClick={onSwitchRole}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Switch to {user.role === UserRole.SEEKER ? 'Employer' : 'Seeker'} View
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                {user ? (
                  <>
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{user.role}</p>
                    </div>
                    <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 border border-gray-300">
                      <i className="fas fa-user"></i>
                    </div>
                    <button 
                      onClick={onLogout}
                      className="ml-2 text-gray-400 hover:text-red-600 transition-colors p-2"
                      title="Logout"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                    </button>
                  </>
                ) : (
                  <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md">
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2024 CareerStream AI. Empowering careers with Gemini Intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
