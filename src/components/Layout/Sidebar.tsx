import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clientService } from '../../services/clientService';

interface MenuItem {
  icon: React.ReactElement;
  label: string;
  path: string;
  badgeKey?: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
    label: 'My Recommendations',
    path: '/recommendations'
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    label: 'My Clients',
    path: '/clients',
    badgeKey: 'clientsCount'
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>,
    label: 'Payouts',
    path: '/payouts'
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    label: 'Settings',
    path: '/settings'
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [badges, setBadges] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadBadgeCounts();
  }, []);

  const loadBadgeCounts = async () => {
    try {
      // Fetch client count
      const clientsData = await clientService.getClients(undefined, undefined, 1, 1);
      setBadges({
        clientsCount: clientsData.totalCount
      });
    } catch (error) {
      console.error('Failed to load badge counts:', error);
    }
  };

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 flex flex-col z-50 border-r border-border">
      <div className="px-6 py-6">
        <img src="/zitamine_logo.png" alt="Zitamine PRO" className="h-7" />
      </div>

      <nav className="flex-1 px-3 py-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path ||
                          (item.path === '/recommendations' && location.pathname.startsWith('/recommendations'));
          const badgeValue = item.badgeKey ? badges[item.badgeKey] : undefined;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-xl transition-all text-sm ${
                isActive
                  ? 'bg-primary text-white font-semibold shadow-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {badgeValue !== undefined && badgeValue > 0 && (
                <span className={`flex-shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium ${
                  isActive ? 'bg-white/30 text-white' : 'bg-primary text-white'
                }`}>
                  {badgeValue}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
