import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BusRoute } from '../types';
import { Bus, ArrowRight } from 'lucide-react';

interface BusRouteCardProps {
  route: BusRoute;
}

const BusRouteCard: React.FC<BusRouteCardProps> = ({ route }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/timetable/${route.id}`);
  };
  
  return (
    <div 
      className="card p-4 cursor-pointer hover:shadow-md transition-shadow flex flex-col"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary-100 rounded-full">
          <Bus size={20} className="text-primary-500" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{route.busNumber}</h3>
          <p className="text-sm text-gray-500">
            {route.regions.length} {route.regions.length === 1 ? 'region' : 'regions'}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-3 text-sm">
        <div className="font-medium">{route.startPoint}</div>
        <ArrowRight size={16} className="text-gray-400" />
        <div className="font-medium">{route.endPoint}</div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500">Tap for timetable</span>
        <span className="text-primary-500 text-sm font-medium">View Details</span>
      </div>
    </div>
  );
};

export default BusRouteCard;