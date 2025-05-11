import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { regions } from '../data/regions';
import { busRoutes, busStops } from '../data/busRoutes';
import { BusRoute, BusStop } from '../types';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RegionMap from '../components/RegionMap';
import BusRouteCard from '../components/BusRouteCard';
import { Bus, ChevronLeft, Search } from 'lucide-react';

const RegionPage: React.FC = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();
  
  const [region, setRegion] = useState(regions.find(r => r.id === regionId));
  const [filteredBusRoutes, setFilteredBusRoutes] = useState<BusRoute[]>([]);
  const [regionStops, setRegionStops] = useState<BusStop[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Set region
    const foundRegion = regions.find(r => r.id === regionId);
    
    if (!foundRegion) {
      navigate('/dashboard');
      return;
    }
    
    setRegion(foundRegion);
    
    // Find bus routes for this region
    const routesInRegion = busRoutes.filter(route => 
      route.regions.includes(foundRegion.id)
    );
    setFilteredBusRoutes(routesInRegion);
    
    // Find bus stops
    // In a real app, stops would be filtered based on geofencing or regionId
    // Here we're just selecting a few stops to demonstrate
    const stopsInRegion = busStops.filter((_, index) => index < 5);
    setRegionStops(stopsInRegion);
  }, [regionId, navigate]);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      // Reset to all routes in region
      const routesInRegion = busRoutes.filter(route => 
        route.regions.includes(region?.id || '')
      );
      setFilteredBusRoutes(routesInRegion);
      return;
    }
    
    // Filter by bus number, start point, or end point
    const lowerQuery = query.toLowerCase();
    
    const filtered = busRoutes.filter(route =>
      route.regions.includes(region?.id || '') && (
        route.busNumber.toLowerCase().includes(lowerQuery) ||
        route.startPoint.toLowerCase().includes(lowerQuery) ||
        route.endPoint.toLowerCase().includes(lowerQuery)
      )
    );
    
    setFilteredBusRoutes(filtered);
  };
  
  if (!region) {
    return null; // Will navigate to dashboard
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header showSearch onSearch={handleSearch} />
      
      <main className="flex-grow">
        {/* Region header */}
        <section 
          className="relative bg-cover bg-center h-48 md:h-64" 
          style={{ backgroundImage: `url(${region.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative z-10">
            <button 
              className="mb-4 text-white flex items-center hover:underline"
              onClick={() => navigate('/dashboard')}
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl md:text-4xl text-white font-bold font-heading">
              {region.name}
            </h1>
            <p className="text-white/90 mt-2">{region.description}</p>
          </div>
        </section>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-heading font-semibold text-gray-800 mb-4">
                Interactive Map
              </h2>
              <RegionMap 
                center={region.center} 
                zoom={region.zoom} 
                stops={regionStops}
              />
              <p className="text-sm text-gray-500 mt-2">
                Zoom in/out to explore bus stops in {region.name}. Click on markers for more information.
              </p>
            </div>
            
            {/* Bus routes section */}
            <div>
              <h2 className="text-2xl font-heading font-semibold text-gray-800 mb-4 flex items-center">
                <Bus size={24} className="mr-2 text-primary-500" />
                Bus Routes
              </h2>
              
              {/* Search input for mobile */}
              <div className="mb-4 lg:hidden">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search bus routes..."
                    className="input pl-9"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
                </div>
              </div>
              
              {filteredBusRoutes.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredBusRoutes.map(route => (
                    <BusRouteCard key={route.id} route={route} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg">
                  <p className="text-gray-500">No bus routes found matching your search.</p>
                  {searchQuery && (
                    <button
                      className="mt-2 text-primary-500 text-sm font-medium"
                      onClick={() => handleSearch('')}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegionPage;