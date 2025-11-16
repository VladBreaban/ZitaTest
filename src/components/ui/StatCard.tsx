import React, { useState } from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  trend,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col items-start p-6 gap-[10px] rounded-[12px] transition-colors cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'white' : 'rgba(0, 0, 0, 0.001)',
        boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04)'
      }}
    >
      <div className="flex items-start justify-between w-full">
        <div>
          <p className="text-4xl font-bold mb-1 text-navy">
            {value}
          </p>
          <p className="text-xs text-navy-lighter">
            {label}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={trend.positive ? "#10B981" : "#EF4444"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {trend.positive ? (
                  <>
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </>
                ) : (
                  <>
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                    <polyline points="17 18 23 18 23 12"></polyline>
                  </>
                )}
              </svg>
              <span
                className="text-[10px] font-medium"
                style={{ color: trend.positive ? '#10B981' : '#EF4444' }}
              >
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-light">
          {icon}
        </div>
      </div>
    </div>
  );
};