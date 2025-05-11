import React from 'react';
import { Bus, MapPin, Clock, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-3">
              <Bus size={24} className="text-accent-500" />
              <span className="text-lg font-heading font-bold">Kolkata Bus</span>
            </div>
            <p className="text-gray-400 max-w-xs text-sm">
              Your easy way to navigate Kolkata's bus system. Find routes, check timetables, and plan your journey.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-accent-500 font-heading font-medium mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Routes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Timetables</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-accent-500 font-heading font-medium mb-3">Popular Areas</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">North Kolkata</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">South Kolkata</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Central Kolkata</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Behala</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 mt-6 md:mt-0">
              <h3 className="text-accent-500 font-heading font-medium mb-3">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-400">
                  <MapPin size={16} className="mr-2 text-primary-400" />
                  Kolkata, West Bengal
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone size={16} className="mr-2 text-primary-400" />
                  +91 1234567890
                </li>
                <li className="flex items-center text-gray-400">
                  <Clock size={16} className="mr-2 text-primary-400" />
                  Mon-Sat: 8am - 8pm
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Kolkata Bus Timetable App. Kamal Dey Mini Project</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;