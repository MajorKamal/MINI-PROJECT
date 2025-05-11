import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { BusStop } from '../types';

interface RegionMapProps {
  center: [number, number];
  zoom: number;
  stops?: BusStop[];
}

// Create a custom bus stop icon
const busStopIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const RegionMap: React.FC<RegionMapProps> = ({ center, zoom, stops = [] }) => {
  return (
    <div className="h-96 md:h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {stops.map((stop) => (
          <Marker 
            key={stop.id} 
            position={stop.location}
            icon={busStopIcon}
          >
            <Popup>
              <div>
                <h3 className="font-medium">{stop.name}</h3>
                <p className="text-xs text-gray-600">Bus Stop</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RegionMap;