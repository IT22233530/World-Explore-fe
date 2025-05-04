// Home.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { getAllCountries, getCountriesByRegion, getCountryByName } from '../services/countryAPI';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import { debounce } from 'lodash'; // Assuming lodash is installed, or implement your own debounce

/**
 * Home component serving as the main country explorer page
 * Provides country search, filtering, and display functionality
 */
const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortMethod, setSortMethod] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Debounced search handler to prevent excessive API calls
  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearch(term);
    }, 500),
    []
  );

  // Fetch countries based on search and region filters
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        let data;
        if (search) {
          data = await getCountryByName(search);
        } else if (region) {
          data = await getCountriesByRegion(region);
        } else {
          data = await getAllCountries();
        }
        setCountries(data);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, region]);

  // Sort countries based on selected method
  const sortedCountries = [...countries].sort((a, b) => {
    switch (sortMethod) {
      case 'name':
        return a.name.common.localeCompare(b.name.common);
      case 'population':
        return b.population - a.population;
      case 'area':
        return b.area - a.area;
      default:
        return 0;
    }
  });

  // Reset filters
  const handleResetFilters = () => {
    setSearch('');
    setRegion('');
    setSortMethod('name');
  };

  // Handle region change
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setSearch(''); // Clear search when changing region
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#222831] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
        <div className="mb-10 text-center slide-in-top">
          <h1 className="text-5xl font-extrabold text-[#00ADB5] mb-3 tracking-tight">
            Country Explorer
          </h1>
          <p className="text-[#222831] max-w-2xl mx-auto opacity-80 text-lg">
            Discover information about countries around the world. Search, filter, and explore!
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-[#EEEEEE] rounded-xl shadow-lg p-6 mb-10 slide-in-bottom border-l-4 border-[#00ADB5]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <SearchBar 
                value={search} 
                onChange={debouncedSearch} 
                placeholder="Search for a country..." 
                autoFocus
                className="bg-[#222831] border-2 border-[#00ADB5] text-[#EEEEEE] placeholder-gray-400 focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Region Filter */}
              <div className="relative">
                <select 
                  value={region}
                  onChange={handleRegionChange}
                  className="appearance-none bg-[#EEEEEE] border-2 border-[#00ADB5] rounded-lg py-2 pl-3 pr-10 w-full sm:w-48 text-[#222831] focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300 hover:shadow-glow"
                  aria-label="Filter by region"
                >
                  <option value="">All Regions</option>
                  <option value="Africa">Africa</option>
                  <option value="Americas">Americas</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#00ADB5]">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Sort Method */}
              <div className="relative">
                <select 
                  value={sortMethod}
                  onChange={(e) => setSortMethod(e.target.value)}
                  className="appearance-none bg-[#EEEEEE] border-2 border-[#00ADB5] rounded-lg py-2 pl-3 pr-10 w-full sm:w-48 text-[#222831] focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300 hover:shadow-glow"
                  aria-label="Sort countries by"
                >
                  <option value="name">Sort by Name</option>
                  <option value="population">Sort by Population</option>
                  <option value="area">Sort by Area</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#00ADB5]">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Row - Reset & View Toggle */}
          <div className="flex justify-between items-center">
            {/* Active Filter Indicators */}
            <div className="flex items-center gap-2">
              {(search || region) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center text-sm text-[#00ADB5] hover:text-[#EEEEEE] transition-colors duration-300 group"
                  aria-label="Reset all filters"
                >
                  <svg className="h-4 w-4 mr-1 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reset filters
                </button>
              )}
              
              {/* Filter indicators */}
              {(search || region) && (
                <div className="text-sm text-gray-400">
                  {search && <span className="mr-2">Search: "{search}"</span>}
                  {region && <span>Region: {region}</span>}
                </div>
              )}
            </div>
            
            {/* View Toggle Buttons */}
            <div className="flex items-center space-x-2 bg-[#222831] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-[#00ADB5] text-[#222831]'
                    : 'text-gray-400 hover:text-[#00ADB5]'
                }`}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-[#00ADB5] text-[#222831]'
                    : 'text-gray-400 hover:text-[#00ADB5]'
                }`}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="loader">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[#393E46] border-l-4 border-red-500 p-6 mb-8 rounded-lg shake-animation">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-base text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sortedCountries.length === 0 && (
          <div className="text-center py-16 bg-[#393E46] rounded-xl shadow-lg border border-[#393E46] fade-in">
            <svg className="mx-auto h-16 w-16 text-gray-400 pulse-animation" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-[#EEEEEE]">No countries found</h3>
            <p className="mt-2 text-base text-gray-400">
              {search ? `No results for "${search}"` : 'Try adjusting your search or filters'}
            </p>
            <div className="mt-8">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center px-6 py-3 border-2 border-[#00ADB5] text-base font-medium rounded-lg shadow-glow text-[#222831] bg-[#00ADB5] hover:bg-transparent hover:text-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00ADB5] transition-all duration-300"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}

        {/* Countries Display - Grid View */}
        {viewMode === 'grid' && !loading && !error && sortedCountries.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 fade-in countries-grid">
            {sortedCountries.map((country, index) => (
              <div 
                key={country.cca3}
                className="country-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CountryCard country={country} />
              </div>
            ))}
          </div>
        )}

        {/* Countries Display - List View */}
        {viewMode === 'list' && !loading && !error && sortedCountries.length > 0 && (
          <div className="bg-[#EEEEEE] overflow-hidden shadow-lg rounded-xl divide-y divide-gray-700 countries-list">
            {sortedCountries.map((country, index) => (
              <div 
                key={country.cca3} 
                className="flex items-center px-5 py-5 sm:px-6 hover:bg-[#2C3039] transition-colors duration-300 country-row"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="country-flag overflow-hidden rounded-md border-2 border-[#00ADB5] shadow-glow-sm">
                  <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="h-12 w-20 object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="ml-5 flex-1">
                  <h3 className="text-lg font-medium text-[#2C3039]  hover:text-[#EEEEEE]">{country.name.common}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#EEEEEE]">
                    <span>Population: {country.population.toLocaleString()}</span>
                    <span>Region: {country.region}</span>
                    <span>Capital: {country.capital?.[0] || 'N/A'}</span>
                  </div>
                </div>
                <div>
                  <a 
                    href={`/country/${country.cca3}`} 
                    className="group flex items-center space-x-1 text-[#00ADB5] hover:text-[#EEEEEE] font-medium transition-colors duration-300"
                  >
                    <span>Details</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && sortedCountries.length > 0 && (
          <div className="mt-6 text-sm text-gray-400 text-right fade-in">
            Showing {sortedCountries.length} {sortedCountries.length === 1 ? 'country' : 'countries'}
          </div>
        )}
      </div>
      
      {/* Add custom styles for animations */}

    </div>
  );
};

export default Home;