
import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock fire station data
  const fireStations = [
    {
      id: 1,
      name: "Central Fire Station",
      address: "123 Main St, Downtown",
      phone: "101-001",
      status: "Active",
      distance: "0.5 km",
      lat: 40.7128,
      lng: -74.0060
    },
    {
      id: 2,
      name: "North Fire Station",
      address: "456 North Ave, Uptown",
      phone: "101-002",
      status: "Active",
      distance: "1.2 km",
      lat: 40.7589,
      lng: -73.9851
    },
    {
      id: 3,
      name: "East Fire Station",
      address: "789 East Blvd, Eastside",
      phone: "101-003",
      status: "On Call",
      distance: "2.1 km",
      lat: 40.7505,
      lng: -73.9934
    }
  ];

  useEffect(() => {
    // This would integrate with actual map API (Google Maps, OpenStreetMap, etc.)
    // For now, we'll create a styled placeholder
    console.log('Map would be initialized here with fire station markers');
  }, []);

  return (
    <div className="relative h-[600px] w-full bg-gradient-to-br from-blue-100 to-green-100">
      {/* Map Placeholder */}
      <div 
        ref={mapRef}
        className="w-full h-full bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 relative overflow-hidden"
      >
        {/* Decorative grid lines to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-400/30"></div>
            ))}
          </div>
        </div>

        {/* Fire Station Markers */}
        {fireStations.map((station, index) => (
          <div
            key={station.id}
            className="absolute group cursor-pointer transform transition-all duration-300 hover:scale-110"
            style={{
              left: `${20 + (index * 25)}%`,
              top: `${30 + (index * 15)}%`,
            }}
          >
            {/* Fire Station Icon */}
            <div className="relative">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              
              {/* Station Info Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white rounded-lg shadow-xl p-4 min-w-[250px] border-l-4 border-red-600">
                  <h3 className="font-bold text-gray-800 mb-2">{station.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {station.address}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {station.phone}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          station.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {station.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{station.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-2">Fire Stations</h3>
          <div className="space-y-1 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
              <span>Active Station</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>On Call</span>
            </div>
          </div>
        </div>

        {/* Current Location Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-800 rounded-full"></div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-colors">
          <span className="text-lg font-bold">+</span>
        </button>
        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-colors">
          <span className="text-lg font-bold">-</span>
        </button>
      </div>
    </div>
  );
};

export default MapSection;
