import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-transparent h-16">
      <div className="h-full pl-0 pr-6 flex pt-2 items-center justify-end">
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="p-2 hover:bg-white rounded-lg transition-colors">
            <svg className="w-5 h-5 text-navy-lighter" fill="none" stroke="#043B6C" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <Link to="/settings" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-peach-200">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=FF9933&color=fff`}
                alt={user?.fullName || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-base font-bold text-[#043B6C] leading-[130%] tracking-[-0.18px]">
                Dr. {user?.fullName}
              </div>
              <div className="text-xs text-primary capitalize font-medium leading-[130%] tracking-[-0.18px]">
                {user?.role || 'Medic'}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};