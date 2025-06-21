
import React, { useEffect, useRef } from 'react';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    const map = (window as any).L.map(mapRef.current).setView([19.0760, 72.8777], 13);

    // Add tile layer
    (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Function to fetch and display fire stations
    const fetchFireStations = async () => {
      const lat = 19.0760;
      const lon = 72.8777;
      
      const query = `
        [out:json];
        node["amenity"="fire_station"](around:10000,${lat},${lon});
        out;
      `;

      try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        data.elements.forEach((station: any) => {
          const fireIcon = (window as any).L.divIcon({
            html: `<div style="background-color: #dc2626; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">🚒</div>`,
            className: 'fire-station-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          (window as any).L.marker([station.lat, station.lon], { icon: fireIcon })
            .addTo(map)
            .bindPopup(`<b>${station.tags.name || "Fire Station"}</b><br/>Emergency: 101`);
        });
      } catch (error) {
        console.error('Error fetching fire stations:', error);
      }
    };

    // Function to fetch and display hospitals
    const fetchHospitals = async () => {
      const lat = 19.0760;
      const lon = 72.8777;
      
      const query = `
        [out:json];
        node["amenity"="hospital"](around:10000,${lat},${lon});
        out;
      `;

      try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        data.elements.forEach((hospital: any) => {
          const hospitalIcon = (window as any).L.divIcon({
            html: `<div style="background-color: #059669; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">🏥</div>`,
            className: 'hospital-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          (window as any).L.marker([hospital.lat, hospital.lon], { icon: hospitalIcon })
            .addTo(map)
            .bindPopup(`<b>${hospital.tags.name || "Hospital"}</b><br/>Emergency: 108`);
        });
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    // Add current location marker
    const currentLocationIcon = (window as any).L.divIcon({
      html: `<div style="background-color: #2563eb; color: white; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: 'current-location-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    (window as any).L.marker([19.0760, 72.8777], { icon: currentLocationIcon })
      .addTo(map)
      .bindPopup('<b>Your Location</b>');

    // Fetch fire stations and hospitals
    fetchFireStations();
    fetchHospitals();

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="relative h-[600px] w-full">
      <div 
        ref={mapRef}
        className="w-full h-full"
        id="leaflet-map"
      />
      
      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[1000]">
        <h3 className="font-bold text-gray-800 mb-2">Emergency Services</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-2 text-white text-xs">🚒</div>
            <span>Fire Stations (101)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2 text-white text-xs">🏥</div>
            <span>Hospitals (108)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 rounded-full mr-3 border-2 border-white"></div>
            <span>Your Location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
