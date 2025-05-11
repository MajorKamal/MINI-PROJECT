import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Region } from '../types';
import { MapPin } from 'lucide-react';

interface RegionCardProps {
  region: Region;
}

const RegionCard: React.FC<RegionCardProps> = ({ region }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/region/${region.id}`);
  };
  
  return (
    <div 
      className="card group cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={region.imageUrl} 
          alt={region.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center space-x-1 text-white mb-1">
            <MapPin size={16} className="text-accent-500" />
            <span className="text-sm font-medium">{region.name}</span>
          </div>
          <h3 className="text-xl text-white font-semibold">{region.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm">{region.description}</p>
        <div className="mt-4 flex justify-end">
          <span className="text-sm font-medium text-primary-500 group-hover:text-primary-600 transition-colors flex items-center">
            Explore buses
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegionCard;