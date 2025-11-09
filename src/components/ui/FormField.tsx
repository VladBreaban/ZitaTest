import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  required,
  error,
  hint,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-navy-lighter">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
        error ? 'ring-2 ring-red-500' : ''
      } ${className}`}
      {...props}
    />
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({ error, className = '', ...props }) => {
  return (
    <textarea
      className={`w-full px-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
        error ? 'ring-2 ring-red-500' : ''
      } ${className}`}
      {...props}
    />
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select: React.FC<SelectProps> = ({ error, className = '', children, ...props }) => {
  return (
    <select
      className={`w-full px-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
        error ? 'ring-2 ring-red-500' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
