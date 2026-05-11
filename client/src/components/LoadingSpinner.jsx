import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-5 animate-fade-up">
      {/* Simple spinner */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-apple-gray-200" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-apple-blue animate-spin" />
      </div>

      <div className="text-center space-y-1">
        <p className="text-[15px] font-medium text-apple-gray-600">Finding your perfect match</p>
        <p className="text-[13px] text-apple-gray-400">Analyzing preferences against our catalog...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
