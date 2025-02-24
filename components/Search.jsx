"use client";

import { useState, useCallback, useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import debounce from 'lodash/debounce';

const Search = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery) => {
        startTransition(() => {
          onSearch?.(searchQuery);
        });
      }, 300),
    [onSearch]
  );

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    onSearch?.('');
  }, [onSearch]);

  return (
    <div className="search-container">
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 300 : 40 }}
        className="search-wrapper"
      >
        <button
          className="search-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close search" : "Open search"}
        >
          <SearchIcon size={20} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder={placeholder}
              className="search-input"
              autoFocus
            />
          )}
        </AnimatePresence>
        {isOpen && query && (
          <button
            className="clear-button"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </motion.div>
      {isPending && (
        <div className="search-loading" aria-hidden="true">
          Searching...
        </div>
      )}
    </div>
  );
};

export default Search; 