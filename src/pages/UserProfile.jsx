import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const UserProfile = () => {
  const { user, logout } = useUser();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch country data for favorites
  useEffect(() => {
    const fetchCountryData = async () => {
      if (!user?.favorites || user.favorites.length === 0) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('https://restcountries.com/v3.1/alpha?codes=' + 
          user.favorites.join(','));
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountryData();
  }, [user?.favorites]);
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Not Logged In</h2>
          <p className="text-gray-600 mb-4">Please log in to view your profile</p>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mr-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
   
            </div>
          </div>
          <button
            onClick={logout}
            className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Favorites Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Favorite Countries</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading favorites...</p>
          </div>
        ) : user.favorites && user.favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country) => (
              <div 
                key={country.cca3} 
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gray-200 overflow-hidden">
                  {country.flags && (
                    <img 
                      src={country.flags.png || country.flags.svg} 
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{country.name.common}</h3>
                  <p className="text-sm text-gray-600">{country.region}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-gray-500">Capital: </span>
                    <span className="ml-1">{country.capital?.[0] || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">You haven't added any countries to your favorites yet.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => window.location.href = '/countries'}
            >
              Explore Countries
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;