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
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step.number === currentStep
                  ? 'bg-primary text-white'
                  : step.number < currentStep
                  ? 'bg-primary/20 text-primary'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number}
            </div>
            <span
              className={`text-sm font-medium ${
                step.number === currentStep
                  ? 'text-navy'
                  : step.number < currentStep
                  ? 'text-navy-lighter'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 ${
                step.number < currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
