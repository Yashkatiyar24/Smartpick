/**
 * App.jsx — SmartPick AI
 * 
 * Apple-inspired product recommendation app.
 * Clean, minimal design with generous whitespace.
 */

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import PreferenceInput from './components/PreferenceInput';
import LoadingSpinner from './components/LoadingSpinner';
import RecommendationResults from './components/RecommendationResults';
import ErrorMessage from './components/ErrorMessage';

const API_BASE = '/api';

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [preference, setPreference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(res.data);
    } catch {
      setError('Unable to load products. Make sure the backend is running.');
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specs?.some(s => s.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [products, searchQuery, activeCategory]);

  const handleGetRecommendations = async () => {
    if (!preference.trim()) return;
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const res = await axios.post(`${API_BASE}/recommend`, {
        preference: preference.trim(),
        products,
      });
      setRecommendations(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendations. Check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ——— Hero ——— */}
      <section className="section-light">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 pt-20 pb-12 text-center">
          <p className="text-apple-blue text-[13px] font-medium tracking-wide mb-3 animate-fade-up">
            Powered by AI
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-apple-gray-600 tracking-tight animate-fade-up" style={{ animationDelay: '80ms' }}>
            Find your perfect
            <br />
            product.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-apple-gray-400 max-w-lg mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '160ms' }}>
            Tell us what you need in your own words. Our AI matches you with the right product, instantly.
          </p>
        </div>
      </section>

      {/* ——— AI Input ——— */}
      <section className="section-light pb-16">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
          <PreferenceInput
            preference={preference}
            onPreferenceChange={setPreference}
            onSubmit={handleGetRecommendations}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* ——— Loading / Error / Results ——— */}
      {(isLoading || error || recommendations) && (
        <section className="section-light pb-16">
          <div className="max-w-[980px] mx-auto px-4 sm:px-6">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} onRetry={handleGetRecommendations} />}
            {recommendations && !isLoading && (
              <RecommendationResults
                recommendations={recommendations}
                onClear={() => { setRecommendations(null); setError(null); }}
              />
            )}
          </div>
        </section>
      )}

      {/* ——— Products Section ——— */}
      <section id="products" className="section-muted">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-16 space-y-8">
          {/* Section title */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-apple-gray-600 tracking-tight">
              Explore all products.
            </h2>
            <p className="mt-2 text-[15px] text-apple-gray-400">
              {products.length} products across {categories.length} categories.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <div className="flex-1" />
            <span className="text-[13px] text-apple-gray-400 hidden sm:block">
              Showing {filteredProducts.length} of {products.length}
            </span>
          </div>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Grid */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card overflow-hidden">
                  <div className="aspect-[4/3] bg-apple-gray-100 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-apple-gray-100 rounded w-16 animate-pulse" />
                    <div className="h-4 bg-apple-gray-100 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-apple-gray-100 rounded w-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} animationDelay={i * 60} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <p className="text-[17px] font-medium text-apple-gray-600">No results found</p>
              <p className="text-[13px] text-apple-gray-400">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="btn-ghost text-[13px]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ——— Footer ——— */}
      <footer className="section-light border-t border-apple-gray-200/60">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-6">
          <p className="text-[11px] text-apple-gray-400 text-center">
            SmartPick AI · Built with React, Tailwind CSS, Express & OpenAI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
