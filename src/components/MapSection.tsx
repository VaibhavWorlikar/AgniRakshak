
import React, { useEffect, useRef, useState } from 'react';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Get user's current location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setUserLocation([lat, lon]);
            initializeMap(lat, lon);
          },
          (error) => {
            console.warn('Geolocation error:', error);
            // Fallback to Mumbai coordinates
            initializeMap(19.0760, 72.8777);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          }
        );
      } else {
        // Fallback to Mumbai coordinates
        initializeMap(19.0760, 72.8777);
      }
    };

    const initializeMap = (lat: number, lon: number) => {
      // Initialize the map
      const map = (window as any).L.map(mapRef.current).setView([lat, lon], 13);

      // Add tile layer with better styling
      (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Add current location marker with enhanced styling
      const currentLocationIcon = (window as any).L.divIcon({
        html: `<div class="animate-pulse"><div style="background: linear-gradient(45deg, #2563eb, #3b82f6); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);"><div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div></div></div>`,
        className: 'current-location-marker',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      (window as any).L.marker([lat, lon], { icon: currentLocationIcon })
        .addTo(map)
        .bindPopup('<b>📍 Your Current Location</b>');

      // Function to fetch and display fire stations
      const fetchFireStations = async () => {
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
              html: `<div style="background: linear-gradient(45deg, #dc2626, #ef4444); color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);">🚒</div>`,
              className: 'fire-station-marker',
              iconSize: [28, 28],
              iconAnchor: [14, 14]
            });

            (window as any).L.marker([station.lat, station.lon], { icon: fireIcon })
              .addTo(map)
              .bindPopup(`<div class="p-2"><b>${station.tags.name || "Fire Station"}</b><br/><span class="text-red-600 font-semibold">🚨 Emergency: 101</span></div>`);
          });
        } catch (error) {
          console.error('Error fetching fire stations:', error);
        }
      };

      // Function to fetch and display hospitals
      const fetchHospitals = async () => {
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
              html: `<div style="background: linear-gradient(45deg, #059669, #10b981); color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);">🏥</div>`,
              className: 'hospital-marker',
              iconSize: [28, 28],
              iconAnchor: [14, 14]
            });

            (window as any).L.marker([hospital.lat, hospital.lon], { icon: hospitalIcon })
              .addTo(map)
              .bindPopup(`<div class="p-2"><b>${hospital.tags.name || "Hospital"}</b><br/><span class="text-green-600 font-semibold">🏥 Emergency: 108</span></div>`);
          });
        } catch (error) {
          console.error('Error fetching hospitals:', error);
        }
      };

      // Fetch emergency services
      fetchFireStations();
      fetchHospitals();
    };

    getUserLocation();

    // Cleanup function
    return () => {
      if (mapRef.current) {
        const mapInstance = (mapRef.current as any)._leaflet_map;
        if (mapInstance) {
          mapInstance.remove();
        }
      }
    };
  }, []);

  return (
    <div className="relative h-[600px] w-full">
      <div 
        ref={mapRef}
        className="w-full h-full rounded-xl shadow-2xl border border-gray-200"
        id="leaflet-map"
      />
      
      {/* Enhanced Map Legend */}
      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-xl z-[1000] border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3 text-lg">🚨 Emergency Services</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center transition-all duration-200 hover:bg-red-50 p-2 rounded-lg">
            <div className="w-7 h-7 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mr-3 text-white text-sm shadow-lg">🚒</div>
            <div>
              <span className="font-medium text-gray-800">Fire Stations</span>
              <div className="text-red-600 font-semibold text-xs">Call 101</div>
            </div>
          </div>
          <div className="flex items-center transition-all duration-200 hover:bg-green-50 p-2 rounded-lg">
            <div className="w-7 h-7 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mr-3 text-white text-sm shadow-lg">🏥</div>
            <div>
              <span className="font-medium text-gray-800">Hospitals</span>
              <div className="text-green-600 font-semibold text-xs">Call 108</div>
            </div>
          </div>
          <div className="flex items-center transition-all duration-200 hover:bg-blue-50 p-2 rounded-lg">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full mr-4 border-2 border-white shadow-lg animate-pulse"></div>
            <span className="font-medium text-gray-800">Your Location</span>
          </div>
        </div>
      </div>

      {/* Location Status Indicator */}
      {userLocation && (
        <div className="absolute top-6 right-6 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-green-200">
          📍 Location Detected
        </div>
      )}
    </div>
  );
};

export default MapSection;
