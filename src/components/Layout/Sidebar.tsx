import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clientService } from '../../services/clientService';
import { useAuth } from '../../contexts/AuthContext';

interface MenuItem {
  icon: React.ReactElement;
  label: string;
  path: string;
  badgeKey?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    icon: <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.3193 9.7956L17.0666 10.0271C17.0572 9.9692 17.0478 9.91133 17.0385 9.84382C16.9917 9.53519 16.9168 9.22657 16.8325 8.93723C18.1151 7.62557 18.2368 5.5327 17.0666 4.18246C16.0835 3.05405 14.5014 2.784 13.1813 3.4109L12.5166 2.66826C14.2673 1.67487 16.4674 1.97386 17.7968 3.50734C19.3509 5.30123 19.1356 8.12709 17.3193 9.7956Z" fill="currentColor"/>
      <path d="M18.5831 11.1746L16.9916 12.6406C17.0571 12.1295 17.1226 11.6858 17.132 11.2132L17.9559 10.4513C20.2121 8.37772 20.493 4.90568 18.5925 2.71637C16.8979 0.75852 14.0238 0.459538 11.8237 1.89658L11.1871 1.17324L11.1777 1.16359C13.7991 -0.649586 17.2912 -0.331316 19.3414 2.0316C21.5883 4.62599 21.2513 8.73457 18.5831 11.1746Z" fill="currentColor"/>
      <path d="M5.51439 9.38071L5.32715 9.06244C5.39268 9.16853 5.45822 9.27462 5.51439 9.38071Z" fill="currentColor"/>
      <path d="M16.4585 7.89559C16.2806 7.47123 16.084 7.10474 15.8968 6.80575C15.9811 6.37175 15.8781 5.89917 15.5785 5.55196C15.3257 5.25298 14.97 5.09867 14.6048 5.07938C14.3333 4.74182 14.0712 4.44284 13.8652 4.20172C14.7265 3.93167 15.6908 4.16314 16.3087 4.87684C17.039 5.72556 17.0671 6.96971 16.4585 7.89559Z" fill="currentColor"/>
      <path d="M5.32715 9.06244L5.51439 9.38071C5.45822 9.27462 5.39268 9.16853 5.32715 9.06244Z" fill="currentColor"/>
      <path d="M16.074 10.9337V10.953C16.0646 10.953 16.0552 10.9626 16.0459 10.9626C15.5403 11.1169 14.9973 11.1748 14.445 11.1362C14.342 11.1266 14.239 11.1169 14.136 11.1073C13.4807 11.0205 12.8347 10.8083 12.2449 10.49C12.1325 10.4322 12.0202 10.3646 11.9172 10.2971C11.8704 10.0657 11.8236 9.82454 11.7581 9.59307C11.6832 9.31338 11.6083 9.03369 11.5146 8.754C11.7861 9.0144 12.0764 9.24587 12.376 9.42912C12.7879 9.68952 13.2279 9.87277 13.6773 9.97886C14.3982 10.1525 15.1284 10.1332 15.7931 9.91135C15.8586 9.89206 15.9242 9.86312 15.9897 9.84383C16.0365 10.2007 16.074 10.5672 16.074 10.9337Z" fill="currentColor"/>
      <path d="M15.672 8.82147C15.569 8.87934 15.466 8.91792 15.363 8.95649C14.7919 9.15903 14.1459 9.15903 13.5281 8.96614C12.9476 8.78289 12.3859 8.4164 11.9365 7.89559L10.9441 6.74789L10.1296 5.80272L9.06236 4.56822C9.01555 4.51035 8.96874 4.46213 8.91257 4.40426C8.7066 4.18244 8.48191 3.99919 8.2385 3.83523C6.89036 2.90935 5.18647 2.89971 4.06303 3.93168C2.69617 5.18547 2.72425 7.50016 4.10984 9.10116C5.1303 10.2778 5.28945 11.9174 4.57794 13.0265C4.45623 13.2097 4.3158 13.3833 4.15665 13.528L3.43577 12.6986C3.61365 12.5346 3.74472 12.3514 3.83834 12.1392C4.16601 11.4159 4.02558 10.4514 3.40768 9.74735C1.61953 7.68341 1.59145 4.70324 3.35151 3.0926C4.98987 1.58805 7.60188 1.80987 9.39003 3.51696C9.5211 3.64234 9.64281 3.76772 9.76451 3.91239L10.5041 4.77075L11.2718 5.65805L11.9646 6.45855L12.6387 7.23012C13.3595 8.05955 14.483 8.27173 15.26 7.77021V7.77986C15.4098 8.08848 15.5315 8.39711 15.6345 8.71538C15.6532 8.7636 15.6626 8.79254 15.672 8.82147Z" fill="currentColor"/>
      <path d="M16.0645 12.1006C16.0551 12.1392 16.0551 12.1778 16.0458 12.2163C15.9896 12.5636 15.896 12.9011 15.7836 13.229C15.5028 13.258 15.2125 13.2676 14.913 13.258C14.6883 13.2483 14.4729 13.2387 14.2389 13.2001C14.1265 13.1808 14.0142 13.1712 13.9019 13.1422C13.6678 13.1036 13.4338 13.0458 13.2091 12.9783C13.181 13.7016 13.0874 14.4057 12.9376 15.0711C12.8159 15.6112 12.6567 16.132 12.4507 16.6336C12.0294 16.7879 11.5894 16.8843 11.1494 16.9325C11.3554 16.5275 11.5426 16.1031 11.6831 15.6691C11.8048 15.3219 11.9077 14.9554 11.9826 14.5793C12.1137 13.962 12.1886 13.3158 12.2073 12.66V12.2646L12.198 11.5605L12.6848 11.7438L12.8252 11.792C13.0499 11.8788 13.2746 11.9463 13.5087 12.0042C13.7521 12.062 13.9861 12.1103 14.2295 12.1392C14.3887 12.1585 14.5385 12.1778 14.6976 12.1778C15.1657 12.226 15.6245 12.1874 16.0645 12.1006Z" fill="currentColor"/>
      <path d="M14.6701 6.84422C14.2769 7.15285 13.6777 7.0564 13.2939 6.6224L12.807 6.05337L12.1611 5.31073L11.4964 4.53917L10.8129 3.74831L10.4197 3.29502C8.23836 0.777789 4.71823 0.324494 2.58369 2.29199C0.439778 4.25948 0.477226 7.90512 2.65858 10.4224C2.83646 10.6249 2.93008 10.866 2.95817 11.0975C2.98626 11.3965 2.89263 11.6954 2.67731 11.898L1.95643 11.0685C0.739364 9.66043 0.0840204 7.96299 0.00912401 6.31377V6.30412C-0.0844965 4.46201 0.542761 2.68741 1.87217 1.46255C4.15651 -0.639962 7.77026 -0.398848 10.3542 1.85798C10.5882 2.07016 10.8223 2.29199 11.0376 2.5331C11.0751 2.57168 11.1125 2.61026 11.1406 2.64883L11.693 3.28538L12.3202 4.00872L12.9568 4.7417L13.5841 5.46505L14.0428 5.9955C14.2582 6.26555 14.4735 6.54524 14.6701 6.84422Z" fill="currentColor"/>
      <path d="M11.1497 12.2163C11.1497 12.4767 11.1404 12.7275 11.131 12.9782C11.1029 13.3351 11.0561 13.6919 10.9999 14.0391C10.794 15.1193 10.4008 16.1224 9.82968 17C9.43648 16.9614 9.04327 16.8843 8.65006 16.7782C8.97774 16.3442 9.24923 15.8812 9.46456 15.399C9.96075 14.2899 10.1761 13.0554 10.1199 11.7823C10.1012 11.4447 10.0731 11.1072 10.0169 10.7696C9.96075 10.4321 9.89522 10.1042 9.8016 9.76659C9.46456 8.52244 8.85603 7.30723 7.99472 6.22704C7.9011 6.1113 7.80748 5.99557 7.71386 5.88948C7.47981 5.61943 7.18958 5.44583 6.89 5.34938C6.4219 5.20471 5.91635 5.29151 5.56059 5.60978C4.97078 6.14024 4.98014 7.13363 5.57931 7.81839C5.804 8.06915 6.0006 8.3392 6.17848 8.61889C6.46871 9.09147 6.70276 9.59299 6.85255 10.1138C6.9649 10.4899 7.03979 10.8661 7.06788 11.2519C7.0866 11.3965 7.0866 11.5508 7.0866 11.6955C7.0866 11.898 7.07724 12.1006 7.05852 12.2935C7.02107 12.631 6.95553 12.9589 6.85255 13.2772C6.83383 13.3544 6.80574 13.4219 6.77765 13.4894C6.59978 13.962 6.347 14.4056 6.01933 14.7818C5.91635 14.9071 5.804 15.0325 5.68229 15.1386C5.42016 14.9071 5.16738 14.6564 4.93333 14.3863L4.90525 14.3574C5.05504 14.2224 5.18611 14.0777 5.29845 13.9234C5.73847 13.3544 5.99124 12.6503 6.04741 11.9173C6.0755 11.5508 6.05678 11.1651 5.99124 10.7889C5.90698 10.3067 5.73847 9.82446 5.49505 9.37116C5.43888 9.26507 5.37335 9.15898 5.30781 9.05289C5.17674 8.84071 5.02695 8.64782 4.85843 8.45493C3.86606 7.30723 3.84733 5.65801 4.83035 4.77071C5.804 3.88341 7.41427 4.08594 8.40665 5.224C8.4441 5.27223 8.49091 5.32045 8.52836 5.36867C8.89348 5.80268 9.23051 6.26561 9.52073 6.7382C10.1012 7.67372 10.5318 8.6864 10.8033 9.72801C10.8876 10.0463 10.9531 10.3742 11.0093 10.7021C11.1029 11.2036 11.1497 11.7051 11.1497 12.2163Z" fill="currentColor"/>
      <path d="M15.3064 14.2995C15.0442 14.7432 14.7165 15.1579 14.3233 15.5147C14.1642 15.6594 13.9957 15.8041 13.8271 15.9294C13.9769 15.3797 14.0893 14.8107 14.1642 14.2224C14.211 14.232 14.2484 14.232 14.2953 14.2416C14.4263 14.2609 14.5668 14.2706 14.6978 14.2802C14.8476 14.2899 15.0068 14.2995 15.1566 14.2995H15.3064Z" fill="currentColor"/>
      <path d="M9.14597 11.9656C9.14597 12.2164 9.13661 12.4671 9.11789 12.7082C8.99618 14.0585 8.50936 15.2737 7.70422 16.2478C7.66677 16.296 7.62932 16.3346 7.59187 16.3828C7.25484 16.2285 6.92717 16.0452 6.60886 15.8331C6.69312 15.7463 6.76801 15.6691 6.84291 15.5727C7.16122 15.1965 7.42336 14.7818 7.62932 14.3285C7.74167 14.0681 7.84465 13.8077 7.91955 13.528C8.0038 13.2097 8.06934 12.8818 8.10679 12.5443C8.14424 12.2163 8.1536 11.8788 8.13487 11.5316C8.11615 11.1844 8.06934 10.8275 7.99444 10.4803C7.91018 10.0945 7.79784 9.69912 7.64805 9.32298C7.34846 8.56106 6.90844 7.82807 6.328 7.1626C6.1314 6.93113 6.12203 6.60321 6.31864 6.41997C6.51524 6.24637 6.83355 6.28494 7.03015 6.50677C7.83529 7.43265 8.43446 8.50319 8.78085 9.62196C8.8932 9.96917 8.97746 10.3164 9.03363 10.6732C9.0898 11.0108 9.12725 11.3483 9.13661 11.6955C9.13661 11.8016 9.14597 11.8788 9.14597 11.9656Z" fill="currentColor"/>
    </svg>,
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

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const [badges, setBadges] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadBadgeCounts();
  }, []);

  const loadBadgeCounts = async () => {
    try {
      const clientsData = await clientService.getClients(undefined, undefined, 1, 1);
      setBadges({
        clientsCount: clientsData.totalCount
      });
    } catch (error) {
      console.error('Failed to load badge counts:', error);
    }
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className={`
      w-64 bg-[#F7F7F9] h-screen fixed left-0 top-0 flex flex-col z-50
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="px-6 py-6">
        <img src="/zitamine_logo.png" alt="Zitamine PRO" className="h-[54px] w-auto" />
      </div>

      <div className="lg:hidden px-4 pb-4">
        <div className="relative">
          <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-4 h-[50px] border border-[#EBEBEB] rounded-[12px] w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            style={{ background: 'rgba(255, 255, 255, 0.8)' }}
          />
        </div>
      </div>

      <nav className="flex-1 pr-4 pt-4 lg:pt-20">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path ||
                          (item.path === '/recommendations' && location.pathname.startsWith('/recommendations'));
          const badgeValue = item.badgeKey ? badges[item.badgeKey] : undefined;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={`flex items-center gap-3 px-4 py-3 mb-1 transition-all duration-200 text-base font-medium leading-[27px] tracking-[-0.18px] rounded-r-[12px] ${
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-[#043B6C] hover:bg-white/80 hover:text-primary hover:shadow-sm hover:translate-x-1'
              }`}
              style={isActive ? {
                boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04)'
              } : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <div className="flex items-center gap-2">
                <span>{item.label}</span>
                {badgeValue !== undefined && badgeValue > 0 && (
                  <span className={`flex-shrink-0 w-5 h-4 rounded-full text-xs flex items-center justify-center font-medium ${
                    isActive ? 'bg-white/30 text-white' : 'bg-[#4CA7F8] text-white'
                  }`}>
                    {badgeValue}
                  </span>
                )}
              </div>
            </Link>
          );
        })}

        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 mb-1 w-full transition-all duration-200 text-base font-medium leading-[27px] tracking-[-0.18px] rounded-r-[12px] text-[#043B6C] hover:bg-white/80 hover:text-primary hover:shadow-sm hover:translate-x-1"
        >
          <span className="flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.75 0.75L17.25 0.75V17.25H11.75M12 9.00001L0.75 9.00001M12 9.00001L8.5 12.5M12 9.00001L8.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </span>
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
};