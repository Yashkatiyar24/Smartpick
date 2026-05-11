import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('All')}
        className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
          activeCategory === 'All'
            ? 'bg-apple-gray-600 text-white'
            : 'bg-apple-gray-100 text-apple-gray-500 hover:bg-apple-gray-200'
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
            activeCategory === cat
              ? 'bg-apple-gray-600 text-white'
              : 'bg-apple-gray-100 text-apple-gray-500 hover:bg-apple-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
