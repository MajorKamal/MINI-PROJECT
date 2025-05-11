import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { busRoutes, getRouteDetails } from '../data/busRoutes';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TimetableView from '../components/TimetableView';
import { RouteDetails } from '../types';
import { Bus, ChevronLeft, Calendar } from 'lucide-react';

const TimetablePage: React.FC = () => {
  const { busId } = useParams<{ busId: string }>();
  const navigate = useNavigate();
  
  const [busRoute, setBusRoute] = useState(busRoutes.find(r => r.id === busId));
  const [routeDetails, setRouteDetails] = useState<RouteDetails | undefined>();
  
  useEffect(() => {
    // Find bus route
    const foundRoute = busRoutes.find(r => r.id === busId);
    
    if (!foundRoute) {
      navigate('/dashboard');
      return;
    }
    
    setBusRoute(foundRoute);
    
    // Get route details
    const details = getRouteDetails(foundRoute.id);
    setRouteDetails(details);
  }, [busId, navigate]);
  
  if (!busRoute || !routeDetails) {
    return null; // Will navigate to dashboard
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <button 
            className="mb-4 text-primary-600 flex items-center hover:underline"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} className="mr-1" />
            Back
          </button>
          
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-gray-800 flex items-center">
              <Bus size={28} className="mr-3 text-primary-500" />
              Bus {busRoute.busNumber} Timetable
            </h1>
            <div className="text-gray-600 mt-2 flex items-center">
              <Calendar size={18} className="mr-2 text-gray-500" />
              <span>Check weekday and weekend schedules below</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Route info sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Route Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Bus Number</h3>
                    <p className="font-medium">{busRoute.busNumber}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Route</h3>
                    <p className="font-medium">{busRoute.startPoint} → {busRoute.endPoint}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Regions Covered</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {busRoute.regions.map(regionId => {
                        const regionName = regions.find(r => r.id === regionId)?.name || regionId;
                        return (
                          <span 
                            key={regionId} 
                            className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                          >
                            {regionName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Number of Stops</h3>
                    <p className="font-medium">{routeDetails.stops.length} stops</p>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-800 text-sm">Note</h3>
                  <p className="text-yellow-700 text-xs mt-1">
                    Times are approximate. Buses may be delayed due to traffic conditions.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Timetable */}
            <div className="md:col-span-3">
              <TimetableView 
                routeDetails={routeDetails}
                busNumber={busRoute.busNumber}
                startPoint={busRoute.startPoint}
                endPoint={busRoute.endPoint}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimetablePage;