import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { getCountryByCode } from '../services/countryAPI';
import CountryCard from '../components/CountryCard';
import { Link } from 'react-router-dom';

const Favourite = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a memoized fetchFavorites function
  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get the user ID from user object (adjust property name if needed)
      const userId = user.userId || user.id;
      
      if (!userId) {
        setError("User ID not available");
        setLoading(false);
        return;
      }

      // Get favorite country codes
      const res = await fetch(`http://localhost:5000/api/users/favorites/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if needed
        }
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch favorites: ${res.status}`);
      }

      const countryCodes = await res.json();
      
      if (countryCodes.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      // Fetch country details for each code
      const countryPromises = countryCodes.map(code => getCountryByCode(code));
      const countryResponses = await Promise.all(countryPromises);
      
      // Filter out any failed requests and extract the first item from each response
      const countries = countryResponses
        .filter(response => response && response.length > 0)
        .map(response => response[0]);

      setFavorites(countries);
    } catch (err) {
      console.error('Failed to load favorite countries:', err);
      setError('Failed to load favorite countries. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load favorites when component mounts or user changes
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Function to remove a favorite and refresh the list
  const handleRemoveFavorite = (countryCode) => {
    // Update UI optimistically
    setFavorites(prev => prev.filter(country => country.cca3 !== countryCode));
    
    // Refresh the favorites list after a short delay
    setTimeout(() => {
      fetchFavorites();
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Favorite Countries</h1>
        <Link 
          to="/" 
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Countries
        </Link>
      </div>

      {/* Authentication Check */}
      {!user && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You need to be logged in to view your favorites.
                <Link to="/login" className="font-medium underline text-yellow-700 hover:text-yellow-600 ml-1">
                  Log in now
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-600">Loading your favorite countries...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && user && favorites.length === 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-indigo-100">
            <svg className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="mt-6 text-lg font-medium text-gray-900">No favorites yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Explore countries and add them to your favorites to see them here.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Explore Countries
            </Link>
          </div>
        </div>
      )}

      {/* Favorites Grid */}
      {!loading && !error && favorites.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((country) => (
            <CountryCard 
              key={country.cca3} 
              country={country} 
              onFavoriteToggle={handleRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;