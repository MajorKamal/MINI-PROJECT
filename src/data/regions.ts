import { Region } from '../types';

// Actual coordinates for Kolkata regions
export const regions: Region[] = [
  {
    id: 'north',
    name: 'North Kolkata',
    center: [22.6217, 88.3787],
    zoom: 13,
    description: 'Includes Shyambazar, Dumdum, Baranagar, and surrounding areas.',
    imageUrl: 'https://images.pexels.com/photos/631477/pexels-photo-631477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'south',
    name: 'South Kolkata',
    center: [22.5074, 88.3613],
    zoom: 13,
    description: 'Includes Ballygunge, Jadavpur, Garia, and surrounding areas.',
    imageUrl: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'central',
    name: 'Central Kolkata',
    center: [22.5726, 88.3639],
    zoom: 14,
    description: 'Includes Park Street, Esplanade, Maidan, and surrounding areas.',
    imageUrl: 'https://images.pexels.com/photos/6212483/pexels-photo-6212483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'behala',
    name: 'Behala',
    center: [22.4979, 88.3186],
    zoom: 13,
    description: 'Includes Behala, Thakurpukur, Parnasree, and surrounding areas.',
    imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];