import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 rounded-2xl p-5 animate-fade-up">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-medium text-red-800">Something went wrong</p>
          <p className="text-[13px] text-red-600/80 mt-0.5">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3.5 py-1.5 rounded-full text-[12px] font-medium text-red-700 bg-red-100 hover:bg-red-200 transition-colors flex-shrink-0"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
