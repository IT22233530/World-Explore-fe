// CountryDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/countryAPI';

/**
 * CountryDetails component displays detailed information about a specific country
 */
const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError('Country not found');
        }
      } catch (err) {
        setError('Failed to load country data');
        console.error('Error fetching country:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [code]);

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <p className="text-gray-600 mt-4">Loading country information...</p>
      </div>
    );
  }

  // Error state
  if (error || !country) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
        <div className="text-center py-10">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{error || 'Country not found'}</h2>
          <p className="mt-2 text-gray-600">We couldn't find the country you're looking for.</p>
          <button
            onClick={handleGoBack}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Extract country data
  const {
    name,
    flags,
    capital = ['N/A'],
    population,
    region,
    subregion,
    languages = {},
    currencies = {},
    borders = [],
    tld = [],
    area,
    timezones = [],
    maps = {},
    car = {},
    coatOfArms = {},
    continents = [],
    fifa,
    independent,
    unMember,
    startOfWeek,
    gini
  } = country;

  // Format currencies
  const formattedCurrencies = Object.values(currencies)
    .map(currency => `${currency.name} (${currency.symbol || 'No symbol'})`)
    .join(', ');

  // Format languages
  const formattedLanguages = Object.values(languages).join(', ');

  // Format gini data (if available)
  const giniData = gini ? Object.entries(gini).map(([year, value]) => `${year}: ${value}%`) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-16">
      {/* Back button */}
      <button
        onClick={handleGoBack}
        className="flex items-center mb-8 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Countries
      </button>

      {/* Country header with flag */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2 relative bg-gray-100">
            <img
              src={flags.svg}
              alt={flags.alt || `Flag of ${name.common}`}
              className="w-full h-full object-cover md:object-contain"
              style={{ minHeight: '300px' }}
            />
            {coatOfArms.svg && (
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-full p-2" title="Coat of Arms">
                <img
                  src={coatOfArms.svg}
                  alt={`Coat of Arms of ${name.common}`}
                  className="h-16 w-16 object-contain"
                />
              </div>
            )}
          </div>
          <div className="p-8 md:p-10 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
              {continents.join(', ')} • {code}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {name.common}
              {name.official !== name.common && (
                <span className="block text-lg text-gray-600 font-normal mt-1">
                  {name.official}
                </span>
              )}
            </h1>

            {/* Native names if available */}
            {name.nativeName && Object.keys(name.nativeName).length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500">Native Names</h3>
                <div className="mt-1 text-gray-700">
                  {Object.values(name.nativeName)
                    .map(n => n.common)
                    .join(', ')}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Capital</h3>
                <div className="mt-1 text-gray-900 font-medium">
                  {capital.join(', ')}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Population</h3>
                <div className="mt-1 text-gray-900 font-medium">
                  {population.toLocaleString()}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Region</h3>
                <div className="mt-1 text-gray-900 font-medium">
                  {region}
                  {subregion && <span className="text-gray-600"> ({subregion})</span>}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Area</h3>
                <div className="mt-1 text-gray-900 font-medium">
                  {area ? `${area.toLocaleString()} km²` : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Country Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Languages */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Languages
                </h3>
                <div className="mt-2 text-gray-700">
                  {formattedLanguages || 'N/A'}
                </div>
              </div>

              {/* Currencies */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Currencies
                </h3>
                <div className="mt-2 text-gray-700">
                  {formattedCurrencies || 'N/A'}
                </div>
              </div>

              {/* Top Level Domain */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Top Level Domain
                </h3>
                <div className="mt-2 text-gray-700">
                  {tld.join(', ') || 'N/A'}
                </div>
              </div>

              {/* Driving Side */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Driving Side
                </h3>
                <div className="mt-2 text-gray-700">
                  {car?.side ? car.side.charAt(0).toUpperCase() + car.side.slice(1) : 'N/A'}
                </div>
              </div>

              {/* Start of Week */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Start of Week
                </h3>
                <div className="mt-2 text-gray-700">
                  {startOfWeek ? startOfWeek.charAt(0).toUpperCase() + startOfWeek.slice(1) : 'N/A'}
                </div>
              </div>

              {/* FIFA Code */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  FIFA Code
                </h3>
                <div className="mt-2 text-gray-700">
                  {fifa || 'Not available'}
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${independent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {independent ? 'Independent' : 'Not Independent'}
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${unMember ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                {unMember ? 'UN Member' : 'Not UN Member'}
              </div>
            </div>
          </div>

          {/* Timezones */}
          {timezones && timezones.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Timezones
              </h2>
              <div className="flex flex-wrap gap-2">
                {timezones.map((timezone, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                    {timezone}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* GINI coefficient if available */}
          {giniData.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                GINI Index (Income Inequality)
              </h2>
              <div className="text-gray-700">
                {giniData.map((item, index) => (
                  <div key={index} className="mb-1">{item}</div>
                ))}
                <p className="text-xs text-gray-500 mt-2">
                  The GINI coefficient measures income inequality (0 = perfect equality, 100 = perfect inequality)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div>
          {/* Border Countries */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Border Countries</h2>
            <div className="flex flex-wrap gap-2">
              {borders && borders.length > 0 ? (
                borders.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                  >
                    {border}
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No bordering countries</p>
              )}
            </div>
          </div>

          {/* Maps */}
          {maps && (maps.googleMaps || maps.openStreetMaps) && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Maps</h2>
              <div className="space-y-3">
                {maps.googleMaps && (
                  <a
                    href={maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.8 19.8c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8c0 .2 0 .5-.1.7-.3-1.3-1.4-2.2-2.7-2.2-1.6 0-2.8 1.3-2.8 2.8 0 1.2.7 2.2 1.7 2.6-.3.1-.7.1-1.1.1-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5c1.6 0 3 1.1 3.4 2.6.3-.8.5-1.7.5-2.6 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c2.2 0 4.1-1 5.3-2.5-.6-.3-1-1-1-1.7.1-.8.4-1.3.8-1.7-.4-.1-.7-.1-1.1-.1z" />
                    </svg>
                    View on Google Maps
                  </a>
                )}
                {maps.openStreetMaps && (
                  <a
                    href={maps.openStreetMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-1.8 19.8c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8c0 .2 0 .5-.1.7-.3-1.3-1.4-2.2-2.7-2.2-1.6 0-2.8 1.3-2.8 2.8 0 1.2.7 2.2 1.7 2.6-.3.1-.7.1-1.1.1-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5c1.6 0 3 1.1 3.4 2.6.3-.8.5-1.7.5-2.6 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c2.2 0 4.1-1 5.3-2.5-.6-.3-1-1-1-1.7.1-.8.4-1.3.8-1.7-.4-.1-.7-.1-1.1-.1z" />
                    </svg>
                    View on OpenStreetMap
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Car Signs */}
          {car?.signs && car.signs.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Car Signs</h2>
              <div className="flex flex-wrap gap-2">
                {car.signs.map((sign, index) => (
                  <span key={index} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-800 font-bold border border-gray-300">
                    {sign}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;