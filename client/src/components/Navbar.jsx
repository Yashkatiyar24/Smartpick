import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2">
            <svg className="w-5 h-5 text-apple-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span className="text-sm font-semibold text-apple-gray-600 tracking-tight">SmartPick</span>
          </a>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-7">
            <a href="#products" className="text-xs text-apple-gray-500 hover:text-apple-gray-600 transition-colors">
              Products
            </a>
            <a href="#recommend" className="text-xs text-apple-gray-500 hover:text-apple-gray-600 transition-colors">
              Recommendations
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
