/**
 * ProductCard — Apple-style clean product card.
 * 
 * Minimal design with generous whitespace,
 * clean typography, and subtle hover elevation.
 */

import React, { useState } from 'react';

const ProductCard = ({ product, isRecommended = false, confidence, matchReason, animationDelay = 0 }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < full ? 'text-amber-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-[11px] text-apple-gray-400 ml-1">{rating}</span>
      </div>
    );
  };

  const getConfidenceLabel = (score) => {
    if (score >= 85) return { text: 'Excellent match', color: 'text-green-600 bg-green-50' };
    if (score >= 65) return { text: 'Good match', color: 'text-amber-700 bg-amber-50' };
    return { text: 'Possible match', color: 'text-orange-600 bg-orange-50' };
  };

  return (
    <div
      className={`card overflow-hidden animate-fade-up ${isRecommended ? 'ring-1 ring-apple-blue/20' : ''}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-apple-gray-100 overflow-hidden">
        {!imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-apple-gray-100 animate-pulse" />
            )}
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl font-bold text-apple-gray-300">
              {product.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
          </div>
        )}

        {/* Recommended badge */}
        {isRecommended && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${getConfidenceLabel(confidence).color}`}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>
              {getConfidenceLabel(confidence).text}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-apple-blue uppercase tracking-wide">
            {product.category}
          </span>
          {renderStars(product.rating)}
        </div>

        {/* Name */}
        <h3 className="text-base font-semibold text-apple-gray-600 leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-apple-gray-400 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5">
          {product.specs?.slice(0, 3).map((spec, i) => (
            <span key={i} className="px-2 py-0.5 rounded-md text-[11px] text-apple-gray-500 bg-apple-gray-100">
              {spec}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="pt-2 flex items-end justify-between border-t border-apple-gray-200/60">
          <div>
            <span className="text-[11px] text-apple-gray-400">From</span>
            <p className="text-lg font-semibold text-apple-gray-600 -mt-0.5">
              ${product.price.toLocaleString()}
            </p>
          </div>

          {/* Confidence score for recommended */}
          {isRecommended && confidence !== undefined && (
            <div className="text-right">
              <span className="text-[11px] text-apple-gray-400">Confidence</span>
              <p className="text-lg font-semibold text-apple-blue -mt-0.5">{confidence}%</p>
            </div>
          )}
        </div>

        {/* Match reason */}
        {isRecommended && matchReason && (
          <p className="text-[12px] text-apple-gray-400 leading-relaxed pt-1">
            {matchReason}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
