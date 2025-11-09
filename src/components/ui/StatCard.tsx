import React from 'react';

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
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 border border-border">
      <div className="flex items-start justify-between">
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
