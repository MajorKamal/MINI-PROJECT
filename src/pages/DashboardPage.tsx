import React from 'react';
import { useNavigate } from 'react-router-dom';
import { regions } from '../data/regions';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RegionCard from '../components/RegionCard';
import RegionMap from '../components/RegionMap';
import RouteFinder from '../components/RouteFinder';
import { Bus, MapPin, Clock, Info } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary-500 text-white">
          <div className="container mx-auto py-8 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
                Kolkata Bus Timetable
              </h1>
              <p className="text-white/90 mb-6">
                Find bus routes and schedules across different regions of Kolkata. Plan your journey with ease!
              </p>
            </div>
          </div>
        </section>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          {/* Interactive Map Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {regions.map(region => (
              <div 
                key={region.id} 
                className="relative h-72 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => navigate(`/region/${region.id}`)}
              >
                <div className="h-full">
                  <RegionMap
                    center={region.center}
                    zoom={region.zoom}
                    stops={[]}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-2xl text-white font-semibold">{region.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Route finder section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-semibold text-gray-800 flex items-center">
                  <Bus size={24} className="mr-2 text-primary-500" />
                  Find Your Route
                </h2>
                <p className="text-gray-600">Enter start and end locations to discover available bus routes.</p>
              </div>
              
              <RouteFinder />
            </div>
            
            {/* Features section */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-semibold text-gray-800 flex items-center">
                  <Info size={24} className="mr-2 text-primary-500" />
                  App Features
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="p-2 bg-primary-100 rounded-full inline-block mb-3">
                    <Bus size={24} className="text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Bus Routes</h3>
                  <p className="text-gray-600 text-sm">Find all bus routes connecting various parts of Kolkata.</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="p-2 bg-primary-100 rounded-full inline-block mb-3">
                    <MapPin size={24} className="text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Interactive Maps</h3>
                  <p className="text-gray-600 text-sm">Explore bus stops and routes on interactive maps with zoom features.</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="p-2 bg-primary-100 rounded-full inline-block mb-3">
                    <Clock size={24} className="text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Timetables</h3>
                  <p className="text-gray-600 text-sm">Check detailed timetables for weekdays and weekends for all buses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;