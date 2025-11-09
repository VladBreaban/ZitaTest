import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-transparent h-16 fixed top-0 right-0 left-64 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 bg-white border-0 rounded-lg w-72 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name={user?.fullName || 'User'}&background=FF9933&color=fff"
                alt={user?.fullName || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Dr. {user?.fullName?.split(' ')[1] || user?.fullName}</div>
              <div className="text-xs text-primary capitalize font-medium">{user?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
