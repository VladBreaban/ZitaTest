import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
  isWhite?: boolean;
  valueColor?: string;
  labelColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  trend,
  isWhite = false,
  valueColor = '#043B6C',
  labelColor = '#4A6A85',
}) => {
  return (
    <div
      className="flex flex-col items-start p-6 gap-[10px] rounded-[12px] cursor-pointer h-full"
      style={{
        background: isWhite ? 'white' : 'linear-gradient(170deg, #EDEDEF 0%, #EDEDEF 10%, #FFFFFF 100%)',
        boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04),  0px 1px 1px -0.5px rgba(42, 51, 69, 0.04),  0px 3px 3px -1.5px rgba(42, 51, 70, 0.04),  0px 6px 6px -3px rgba(42, 51, 70, 0.04),  0px 12px 12px -6px rgba(14, 63, 126, 0.04),  0px 24px 24px -12px rgba(14, 63, 126, 0.04)',
        minHeight: '120px',
        border: 'inset',
        borderWidth: 1, 
        borderColor: '#ffffff', 
        borderTop: 'none',
        borderLeft: 'none'
      }}
    >
      <div className="w-full">
        <p className="text-4xl font-bold mb-1" style={{ color: valueColor }}>
          {value}
        </p>
        <div className="flex items-center justify-between w-full">
          <p 
            className="font-medium"
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '27px',
              letterSpacing: '-0.18px',
              color: labelColor
            }}
          >
            {label}
          </p>
          {icon && (
            <div 
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '32px',
                height: '32px',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '270px'
              }}
            >
              {icon}
            </div>
          )}
        </div>
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
    </div>
  );
};