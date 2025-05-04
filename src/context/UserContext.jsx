// src/contexts/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    // Get favorites from localStorage if they exist
    const storedFavorites = localStorage.getItem('userFavorites');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return {
          userId: decoded.id,
          name: decoded.name,
          role: decoded.role,
          token,
          favorites // Initialize favorites from localStorage
        };
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('userFavorites');
      }
    }
    return null;
  });

  // When user or favorites change, update localStorage
  useEffect(() => {
    if (user && user.favorites) {
      localStorage.setItem('userFavorites', JSON.stringify(user.favorites));
    }
  }, [user?.favorites]);

  // When app loads, fetch user favorites from API if user is logged in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user && user.userId && user.token) {
        try {
          const response = await fetch('http://localhost:5000/api/users/favorites', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            // Update user with favorites from API
            if (data.favorites) {
              setUser(currentUser => ({
                ...currentUser,
                favorites: data.favorites
              }));
            }
          }
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };
    
    fetchFavorites();
  }, [user?.userId]);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser({
        userId: decoded.id,
        name: decoded.name,
        role: decoded.role,
        token,
        favorites: [] // Initialize with empty favorites when logging in
      });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userFavorites');
  };

  // Function to add a country to favorites
  const addToFavorites = async (countryCode) => {
    if (!user) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/users/favorites/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          userId: user.userId,
          countryCode
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update user context with new favorites
        if (data.user && data.user.favorites) {
          setUser({
            ...user,
            favorites: data.user.favorites
          });
        } else if (data.favorites) {
          setUser({
            ...user,
            favorites: data.favorites
          });
        } else {
          // Fallback: add to current favorites
          setUser({
            ...user,
            favorites: [...(user.favorites || []), countryCode]
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  };

  // Function to remove a country from favorites
  const removeFromFavorites = async (countryCode) => {
    if (!user) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/users/favorites/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          userId: user.userId,
          countryCode
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update user context with new favorites
        if (data.user && data.user.favorites) {
          setUser({
            ...user,
            favorites: data.user.favorites
          });
        } else if (data.favorites) {
          setUser({
            ...user,
            favorites: data.favorites
          });
        } else {
          // Fallback: remove from current favorites
          setUser({
            ...user,
            favorites: (user.favorites || []).filter(fav => fav !== countryCode)
          });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  };

  const isAuthenticated = !!user;

  // Pass setUser and favorite functions to the provider
  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      isAuthenticated,
      addToFavorites,
      removeFromFavorites
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export { UserContext };