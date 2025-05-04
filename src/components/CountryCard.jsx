// CountryCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * CountryCard component displays a country's information in a card format
 * Enhanced with modern animations and color palette from colorhunt.co: #222831, #393E46, #00ADB5, #EEEEEE
 * 
 * @param {Object} props
 * @param {Object} props.country - Country data object
 * @param {boolean} props.compact - Optional flag for compact display mode
 */
const CountryCard = ({ country, compact = false }) => {
  const name = country.name.common;
  const capital = country.capital?.[0] || 'N/A';
  const region = country.region;
  const population = country.population.toLocaleString();
  const flag = country.flags.svg;
  const code = country.cca3;
  const { user, addToFavorites, removeFromFavorites } = useUser(); // Get user and favorite functions from context
  
  // State to track if this country is in user's favorites
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Additional data for expanded view
  const subregion = country.subregion || 'N/A';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currency = country.currencies ? 
    Object.values(country.currencies).map(c => c.name).join(', ') : 
    'N/A';

  // Check if country is in favorites when component mounts or user changes
  useEffect(() => {
    if (user && user.favorites && user.favorites.includes(code)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, code]);

  // Toggle favorite status using the context functions
  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Prevent event bubbling
    
    if (!user) {
      alert('You must be logged in to manage favorites.');
      return;
    }

    setIsUpdating(true);
    
    // Use the context functions to manage favorites
    if (isFavorite) {
      removeFromFavorites(code)
        .then(success => {
          if (success) {
            setIsFavorite(false);
          } else {
            alert('Failed to remove from favorites. Please try again.');
          }
        })
        .finally(() => {
          setIsUpdating(false);
        });
    } else {
      addToFavorites(code)
        .then(success => {
          if (success) {
            setIsFavorite(true);
          } else {
            alert('Failed to add to favorites. Please try again.');
          }
        })
        .finally(() => {
          setIsUpdating(false);
        });
    }
  };

  return (
    <Link 
      to={`/country/${code}`} 
      className="group relative block overflow-hidden bg-white rounded-xl shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      aria-label={`View details about ${name}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#EEEEEE',
        borderTop: '4px solid #00ADB5'
      }}
    >
      {/* Country Flag with enhanced animations */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 z-10 transition-opacity duration-300 group-hover:opacity-40"
          style={{ background: isHovered ? 'linear-gradient(to top, #222831, transparent)' : 'none' }}
        />
        
        <img 
          src={flag} 
          alt={`Flag of ${name}`} 
          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=Flag+Not+Available";
          }}
          style={{ filter: isHovered ? 'brightness(1.05)' : 'brightness(1)' }}
        />
        
        {/* Country code badge */}
        <div 
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:translate-x-0"
          style={{ 
            background: '#222831', 
            color: '#EEEEEE',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
          }}
        >
          {code}
        </div>
        
        {/* Country name overlay on hover */}
        <div 
          className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end z-20 transition-all duration-500 ease-in-out"
          style={{
            background: isHovered ? 'linear-gradient(to top, rgba(34, 40, 49, 0.9) 0%, rgba(34, 40, 49, 0) 100%)' : 'linear-gradient(to top, rgba(34, 40, 49, 0.7) 0%, rgba(34, 40, 49, 0) 100%)',
            opacity: isHovered ? 1 : 0.8,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <h3 
            className="text-2xl font-bold mb-1 transition-all duration-500"
            style={{ 
              color: '#EEEEEE',
              textShadow: '0px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {name}
          </h3>
        </div>
        
        {/* Favorite Button with enhanced animations */}
        {user && (
          <button
            onClick={toggleFavorite}
            disabled={isUpdating}
            className="absolute top-3 left-3 p-3 rounded-full z-20 transition-all duration-300 ease-in-out transform hover:scale-110"
            style={{
              background: isFavorite ? '#00ADB5' : 'rgba(238, 238, 238, 0.9)',
              color: isFavorite ? '#EEEEEE' : '#222831',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              opacity: isUpdating ? 0.6 : 1
            }}
            aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          >
            {isFavorite ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Country Information with enhanced styling */}
      <div className="p-6" style={{ background: '#EEEEEE' }}>        
        <div className="space-y-3 mb-4">
          {/* Basic Info with Animated Icons */}
          <div className="flex items-center text-sm group-hover:translate-x-1 transition-all duration-300 ease-in-out" style={{ color: '#393E46' }}>
            <div 
              className="h-8 w-8 mr-3 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" 
              style={{ background: '#00ADB5', color: '#EEEEEE' }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <span className="font-bold" style={{ color: '#222831' }}>Capital</span>
              <p className="font-medium">{capital}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm group-hover:translate-x-1 transition-all duration-300 ease-in-out" style={{ color: '#393E46' }}>
            <div 
              className="h-8 w-8 mr-3 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" 
              style={{ background: '#00ADB5', color: '#EEEEEE' }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="font-bold" style={{ color: '#222831' }}>Region</span>
              <p className="font-medium">{region} {subregion !== 'N/A' && !compact && <span className="opacity-70">({subregion})</span>}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm group-hover:translate-x-1 transition-all duration-300 ease-in-out" style={{ color: '#393E46' }}>
            <div 
              className="h-8 w-8 mr-3 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" 
              style={{ background: '#00ADB5', color: '#EEEEEE' }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <span className="font-bold" style={{ color: '#222831' }}>Population</span>
              <p className="font-medium">{population}</p>
            </div>
          </div>
          
          {/* Extended Info (only shown when not in compact mode) */}
          {!compact && (
            <>
              {languages !== 'N/A' && (
                <div className="flex items-center text-sm group-hover:translate-x-1 transition-all duration-300 ease-in-out" style={{ color: '#393E46' }}>
                  <div 
                    className="h-8 w-8 mr-3 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" 
                    style={{ background: '#00ADB5', color: '#EEEEEE' }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold" style={{ color: '#222831' }}>Languages</span>
                    <p className="font-medium">{languages}</p>
                  </div>
                </div>
              )}
              
              {currency !== 'N/A' && (
                <div className="flex items-center text-sm group-hover:translate-x-1 transition-all duration-300 ease-in-out" style={{ color: '#393E46' }}>
                  <div 
                    className="h-8 w-8 mr-3 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" 
                    style={{ background: '#00ADB5', color: '#EEEEEE' }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold" style={{ color: '#222831' }}>Currency</span>
                    <p className="font-medium">{currency}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Favorite Status Indicator - Enhanced */}
        {user && isFavorite && (
          <div 
            className="mt-1 mb-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-105"
            style={{ 
              background: '#222831', 
              color: '#EEEEEE'
            }}
          >
            <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            In your favorites
          </div>
        )}
      </div>
      
      {/* View Details Button - Enhanced */}
      <div 
        className="px-6 py-4 flex justify-between items-center transition-all duration-300"
        style={{ 
          background: '#393E46', 
          color: '#EEEEEE',
          transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
          opacity: isHovered ? 1 : 0.95
        }}
      >
        <div className="text-sm font-bold flex items-center">
          Explore {name}
          <svg 
            className="h-5 w-5 ml-2 transform transition-all duration-500 ease-in-out" 
            style={{
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              opacity: isHovered ? 1 : 0.8
            }}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        
        {/* Country mini badge */}
        <span 
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ease-in-out" 
          style={{ 
            background: '#00ADB5', 
            color: '#EEEEEE',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {code}
        </span>
      </div>
      
      {/* Animated Border Effect on Hover */}
      <div 
        className="absolute inset-0 border-2 rounded-xl pointer-events-none transition-all duration-500 ease-in-out"
        style={{ 
          borderColor: isHovered ? '#00ADB5' : 'transparent',
          opacity: isHovered ? 1 : 0
        }}
      />
    </Link>
  );
};

export default CountryCard;