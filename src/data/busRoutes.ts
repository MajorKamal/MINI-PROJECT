import { BusRoute, BusStop, BusTiming } from '../types';

// Simplified bus routes for Kolkata
export const busRoutes: BusRoute[] = [
  {
    id: '1',
    busNumber: '201',
    startPoint: 'Shyambazar',
    endPoint: 'Garia',
    regions: ['north', 'central', 'south']
  },
  {
    id: '2',
    busNumber: '34C',
    startPoint: 'Esplanade',
    endPoint: 'Behala',
    regions: ['central', 'behala']
  },
  {
    id: '3',
    busNumber: '47B/1',
    startPoint: 'Howrah Station',
    endPoint: 'Jadavpur',
    regions: ['central', 'south']
  },
  {
    id: '4',
    busNumber: 'S-32',
    startPoint: 'Baranagar',
    endPoint: 'New Alipore',
    regions: ['north', 'central']
  },
  {
    id: '5',
    busNumber: 'C-7',
    startPoint: 'Dumdum',
    endPoint: 'Behala Chowrasta',
    regions: ['north', 'central', 'behala']
  },
  {
    id: '6',
    busNumber: '3D',
    startPoint: 'Thakurpukur',
    endPoint: 'Esplanade',
    regions: ['behala', 'central']
  },
  {
    id: '7',
    busNumber: '234',
    startPoint: 'Garia',
    endPoint: 'Baranagar',
    regions: ['south', 'central', 'north']
  },
  {
    id: '8',
    busNumber: 'S-12C',
    startPoint: 'Jadavpur',
    endPoint: 'Shyambazar',
    regions: ['south', 'central', 'north']
  }
];

// Bus stops
export const busStops: BusStop[] = [
  { id: 's1', name: 'Shyambazar 5 Point Crossing', location: [22.6027, 88.3730] },
  { id: 's2', name: 'Baranagar', location: [22.6437, 88.3726] },
  { id: 's3', name: 'Dumdum', location: [22.6379, 88.4192] },
  { id: 's4', name: 'Esplanade', location: [22.5553, 88.3475] },
  { id: 's5', name: 'Park Street', location: [22.5513, 88.3494] },
  { id: 's6', name: 'Jadavpur', location: [22.4973, 88.3702] },
  { id: 's7', name: 'Garia', location: [22.4594, 88.3946] },
  { id: 's8', name: 'Behala Chowrasta', location: [22.4985, 88.3184] },
  { id: 's9', name: 'Thakurpukur', location: [22.4651, 88.3014] },
  { id: 's10', name: 'New Alipore', location: [22.5089, 88.3284] },
  { id: 's11', name: 'Howrah Station', location: [22.5839, 88.3425] }
];

// Bus timings (simplified for demo purposes)
export const busTimings: BusTiming[] = [
  // Route 201 (Shyambazar to Garia)
  { busId: '1', stopId: 's1', time: '06:00', isWeekend: false },
  { busId: '1', stopId: 's4', time: '06:45', isWeekend: false },
  { busId: '1', stopId: 's6', time: '07:30', isWeekend: false },
  { busId: '1', stopId: 's7', time: '08:00', isWeekend: false },
  { busId: '1', stopId: 's1', time: '07:00', isWeekend: false },
  { busId: '1', stopId: 's4', time: '07:45', isWeekend: false },
  { busId: '1', stopId: 's6', time: '08:30', isWeekend: false },
  { busId: '1', stopId: 's7', time: '09:00', isWeekend: false },
  
  // Route 34C (Esplanade to Behala)
  { busId: '2', stopId: 's4', time: '06:30', isWeekend: false },
  { busId: '2', stopId: 's10', time: '07:15', isWeekend: false },
  { busId: '2', stopId: 's8', time: '07:45', isWeekend: false },
  { busId: '2', stopId: 's4', time: '07:30', isWeekend: false },
  { busId: '2', stopId: 's10', time: '08:15', isWeekend: false },
  { busId: '2', stopId: 's8', time: '08:45', isWeekend: false },
  
  // Weekend timings (less frequent)
  { busId: '1', stopId: 's1', time: '07:00', isWeekend: true },
  { busId: '1', stopId: 's4', time: '07:45', isWeekend: true },
  { busId: '1', stopId: 's6', time: '08:30', isWeekend: true },
  { busId: '1', stopId: 's7', time: '09:00', isWeekend: true },
  
  { busId: '2', stopId: 's4', time: '08:00', isWeekend: true },
  { busId: '2', stopId: 's10', time: '08:45', isWeekend: true },
  { busId: '2', stopId: 's8', time: '09:15', isWeekend: true }
];

// Find bus routes between two points
export const findBusRoutes = (start: string, end: string): BusRoute[] => {
  return busRoutes.filter(route => {
    const containsStart = route.startPoint.toLowerCase().includes(start.toLowerCase()) || 
                         busStops.some(stop => stop.name.toLowerCase().includes(start.toLowerCase()) && 
                                      busTimings.some(timing => timing.busId === route.id && timing.stopId === stop.id));
    
    const containsEnd = route.endPoint.toLowerCase().includes(end.toLowerCase()) || 
                       busStops.some(stop => stop.name.toLowerCase().includes(end.toLowerCase()) && 
                                    busTimings.some(timing => timing.busId === route.id && timing.stopId === stop.id));
    
    return containsStart && containsEnd;
  });
};

// Get route details for a specific bus
export const getRouteDetails = (busId: string): RouteDetails | undefined => {
  const bus = busRoutes.find(route => route.id === busId);
  if (!bus) return undefined;
  
  // Find all stops for this bus route based on timings
  const stopIds = [...new Set(busTimings
    .filter(timing => timing.busId === busId)
    .map(timing => timing.stopId))];
  
  const stops = busStops.filter(stop => stopIds.includes(stop.id));
  const timings = busTimings.filter(timing => timing.busId === busId);
  
  return {
    busId,
    stops,
    timings
  };
};

// Search for buses by number or route
export const searchBuses = (query: string): BusRoute[] => {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return busRoutes.filter(route => 
    route.busNumber.toLowerCase().includes(lowercaseQuery) ||
    route.startPoint.toLowerCase().includes(lowercaseQuery) ||
    route.endPoint.toLowerCase().includes(lowercaseQuery)
  );
};