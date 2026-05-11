import React from 'react';
import ProductCard from './ProductCard';

const RecommendationResults = ({ recommendations, onClear }) => {
  const { recommendedProducts, reason } = recommendations;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-apple-gray-600 tracking-tight">
            Recommended for you
          </h2>
          <p className="text-[13px] text-apple-gray-400 mt-0.5">
            {recommendedProducts.length} product{recommendedProducts.length !== 1 ? 's' : ''} matched your preferences
          </p>
        </div>
        <button onClick={onClear} className="btn-ghost text-[13px]">
          Clear results
        </button>
      </div>

      {/* AI Reasoning */}
      {reason && (
        <div className="bg-apple-gray-100 rounded-2xl p-5">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-apple-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-apple-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-medium text-apple-gray-400 uppercase tracking-wider mb-1">Why these picks</p>
              <p className="text-[14px] text-apple-gray-500 leading-relaxed">{reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Products grid */}
      {recommendedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              isRecommended
              confidence={product.confidence}
              matchReason={product.matchReason}
              animationDelay={i * 100}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-apple-gray-400 text-[15px]">No matching products found. Try a different description.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationResults;
