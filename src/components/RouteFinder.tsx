import React, { useState } from 'react';
import { BusRoute } from '../types';
import { findBusRoutes } from '../data/busRoutes';
import { Search } from 'lucide-react';
import BusRouteCard from './BusRouteCard';

const RouteFinder: React.FC = () => {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = () => {
    if (startPoint && endPoint) {
      const foundRoutes = findBusRoutes(startPoint, endPoint);
      setRoutes(foundRoutes);
      setHasSearched(true);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Find Your Route</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="startPoint" className="label">Start Location</label>
          <input
            id="startPoint"
            type="text"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter starting point"
            className="input"
          />
        </div>
        
        <div>
          <label htmlFor="endPoint" className="label">End Location</label>
          <input
            id="endPoint"
            type="text"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter destination"
            className="input"
          />
        </div>
        
        <button 
          onClick={handleSearch}
          className="btn btn-primary w-full flex items-center justify-center"
          disabled={!startPoint || !endPoint}
        >
          <Search size={18} className="mr-2" />
          Find Buses
        </button>
      </div>
      
      {hasSearched && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">
            {routes.length ? 
              `${routes.length} ${routes.length === 1 ? 'route' : 'routes'} found` : 
              'No routes found'
            }
          </h3>
          
          {routes.length ? (
            <div className="space-y-3">
              {routes.map(route => (
                <BusRouteCard key={route.id} route={route} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>No direct bus routes found for this journey.</p>
              <p className="mt-2 text-sm">Try different locations or nearby bus stops.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteFinder;