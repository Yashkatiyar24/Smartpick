import React from 'react';

const EXAMPLES = [
  "Phone under $500 with a great camera",
  "Gaming laptop with high performance",
  "Wireless headphones, good battery life",
  "Premium tablet for creative work",
  "Budget noise-cancelling headphones",
];

const PreferenceInput = ({ preference, onPreferenceChange, onSubmit, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (preference.trim() && !isLoading) onSubmit();
  };

  return (
    <div id="recommend" className="bg-apple-gray-100 rounded-3xl p-6 sm:p-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-apple-gray-600 tracking-tight">
          What are you looking for?
        </h2>
        <p className="mt-2 text-[15px] text-apple-gray-400">
          Describe your ideal product and our AI will find the best match from our catalog.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
        {/* Input */}
        <div className="relative">
          <textarea
            id="preference-input"
            value={preference}
            onChange={(e) => onPreferenceChange(e.target.value)}
            placeholder="e.g. I need a lightweight laptop for programming under $1500..."
            rows={3}
            maxLength={500}
            disabled={isLoading}
            className="w-full px-5 py-4 rounded-2xl bg-white text-[15px] text-apple-gray-600 placeholder-apple-gray-300 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-apple-blue/30 transition-shadow duration-200 disabled:opacity-50"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.04)' }}
          />
          <span className="absolute bottom-3 right-4 text-[11px] text-apple-gray-300">
            {preference.length}/500
          </span>
        </div>

        {/* Example chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onPreferenceChange(ex)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full text-[12px] text-apple-gray-400 bg-white border border-apple-gray-200/80 hover:border-apple-gray-300 hover:text-apple-gray-500 transition-all duration-200 disabled:opacity-40"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Submit */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={!preference.trim() || isLoading}
            className="btn-apple min-w-[200px]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </>
            ) : (
              'Get Recommendations'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferenceInput;
