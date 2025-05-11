import React, { useState } from 'react';
import { RouteDetails, BusTiming, BusStop } from '../types';
import { Clock, MapPin } from 'lucide-react';

interface TimetableViewProps {
  routeDetails: RouteDetails;
  busNumber: string;
  startPoint: string;
  endPoint: string;
}

const TimetableView: React.FC<TimetableViewProps> = ({ 
  routeDetails, 
  busNumber,
  startPoint, 
  endPoint
}) => {
  const [showWeekend, setShowWeekend] = useState(false);
  
  // Filter timings based on weekend/weekday selection
  const filteredTimings = routeDetails.timings.filter(timing => timing.isWeekend === showWeekend);
  
  // Group timings by stop
  const timingsByStop: Record<string, BusTiming[]> = {};
  
  filteredTimings.forEach(timing => {
    if (!timingsByStop[timing.stopId]) {
      timingsByStop[timing.stopId] = [];
    }
    timingsByStop[timing.stopId].push(timing);
  });
  
  // Get stop details
  const getStopName = (stopId: string): string => {
    const stop = routeDetails.stops.find(s => s.id === stopId);
    return stop ? stop.name : 'Unknown Stop';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Bus {busNumber}</h2>
          <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {showWeekend ? 'Weekend' : 'Weekday'} Schedule
          </div>
        </div>
        
        <div className="mt-2 text-white/80 text-sm flex items-center">
          <span>{startPoint}</span>
          <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          <span>{endPoint}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Timetable</h3>
          
          <div className="flex items-center space-x-1">
            <button
              className={`px-3 py-1 text-sm rounded-l-lg ${!showWeekend ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setShowWeekend(false)}
            >
              Weekdays
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-r-lg ${showWeekend ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setShowWeekend(true)}
            >
              Weekends
            </button>
          </div>
        </div>
        
        {Object.keys(timingsByStop).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(timingsByStop).map(([stopId, timings]) => (
              <div key={stopId} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-start">
                  <MapPin size={18} className="text-primary-500 mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium">{getStopName(stopId)}</h4>
                    
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {timings.map((timing, index) => (
                        <div key={index} className="flex items-center space-x-1 text-sm bg-gray-50 px-2 py-1 rounded">
                          <Clock size={14} className="text-gray-500" />
                          <span>{timing.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No {showWeekend ? 'weekend' : 'weekday'} schedule available.</p>
            <button 
              className="mt-2 text-primary-500 text-sm font-medium"
              onClick={() => setShowWeekend(!showWeekend)}
            >
              View {showWeekend ? 'weekday' : 'weekend'} schedule instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableView;