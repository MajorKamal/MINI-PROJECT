export interface User {
  id: string;
  username: string;
  password: string; // In a real app, passwords wouldn't be stored in the frontend
}

export interface Region {
  id: string;
  name: string;
  center: [number, number]; // [latitude, longitude]
  zoom: number;
  description: string;
  imageUrl: string;
}

export interface BusRoute {
  id: string;
  busNumber: string;
  startPoint: string;
  endPoint: string;
  regions: string[]; // IDs of regions this bus route covers
}

export interface BusStop {
  id: string;
  name: string;
  location: [number, number]; // [latitude, longitude]
}

export interface BusTiming {
  busId: string;
  stopId: string;
  time: string; // Format: "HH:MM"
  isWeekend: boolean;
}

export interface RouteDetails {
  busId: string;
  stops: BusStop[];
  timings: BusTiming[];
}