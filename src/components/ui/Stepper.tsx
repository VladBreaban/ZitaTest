import React from 'react';

interface Step {
  number: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isInactive = step.number > currentStep;

        return (
          <React.Fragment key={step.number}>
            <div className="flex items-center gap-2" style={{opacity:  isActive || isCompleted ? 1 : 0.5}}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : isCompleted
                    ? 'bg-primary/20 text-primary'
                    : 'bg-gray-200'
                }`}
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: isInactive ? '#4A6A85' : undefined,
                }}
              >
                {step.number}
              </div>
              <span
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: isActive || isCompleted ? 700 : 500,
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: '#043B6C',
                }}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 ${
                  step.number < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
                style={{ width: '100px' }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};