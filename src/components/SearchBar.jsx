// SearchBar.jsx
import React, { useState, useRef } from 'react';

/**
 * Enhanced SearchBar component with improved UX and accessibility
 * 
 * @param {Object} props
 * @param {string} props.value - Current search input value
 * @param {function} props.onChange - Handler function for input changes
 * @param {function} props.onSearch - Optional handler for search submission
 * @param {string} props.placeholder - Custom placeholder text (optional)
 * @param {boolean} props.autoFocus - Whether the input should autofocus (optional)
 */
const SearchBar = ({ 
  value, 
  onChange, 
  onSearch,
  placeholder = "Search by country name...",
  autoFocus = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-md mb-4 relative"
      role="search"
      aria-label="Search countries"
    >
      <div className={`
        flex items-center w-full overflow-hidden
        bg-white rounded-lg shadow-sm
        border-2 transition-all duration-200
        ${isFocused ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300 hover:border-gray-400'}
      `}>
        {/* Search Icon */}
        <div className="pl-3 text-gray-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="p-3 w-full outline-none text-gray-700 placeholder-gray-400"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          aria-label={placeholder}
        />
        
        {/* Clear Button - Only appears when there's content to clear */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center h-8 w-8 mr-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-gray-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
        
        {/* Search Button */}
        {onSearch && (
          <button
            type="submit"
            className="flex items-center justify-center h-full px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
            aria-label="Submit search"
          >
            Search
          </button>
        )}
      </div>

      {/* Optional helper text that could be added based on state */}
      {value.length > 0 && value.length < 2 && (
        <p className="text-xs text-gray-500 mt-1 ml-1">
          Please enter at least 2 characters
        </p>
      )}
    </form>
  );
};

export default SearchBar;