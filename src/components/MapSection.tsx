
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [fireStations, setFireStations] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [fireStationMarkers, setFireStationMarkers] = useState<any[]>([]);
  const [hospitalMarkers, setHospitalMarkers] = useState<any[]>([]);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [showFireStations, setShowFireStations] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);

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
      setMapInstance(map);

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
          setFireStations(data.elements);
          
          const markers = data.elements.map((station: any) => {
            const fireIcon = (window as any).L.divIcon({
              html: `<div style="background: linear-gradient(45deg, #dc2626, #ef4444); color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);">🚒</div>`,
              className: 'fire-station-marker',
              iconSize: [28, 28],
              iconAnchor: [14, 14]
            });

            const marker = (window as any).L.marker([station.lat, station.lon], { icon: fireIcon })
              .addTo(map)
              .bindPopup(`<div class="p-2"><b>${station.tags.name || "Fire Station"}</b><br/><span class="text-red-600 font-semibold">🚨 Emergency: 101</span></div>`);
            
            return marker;
          });
          
          setFireStationMarkers(markers);
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
          setHospitals(data.elements);
          
          const markers = data.elements.map((hospital: any) => {
            const hospitalIcon = (window as any).L.divIcon({
              html: `<div style="background: linear-gradient(45deg, #059669, #10b981); color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);">🏥</div>`,
              className: 'hospital-marker',
              iconSize: [28, 28],
              iconAnchor: [14, 14]
            });

            const marker = (window as any).L.marker([hospital.lat, hospital.lon], { icon: hospitalIcon })
              .addTo(map)
              .bindPopup(`<div class="p-2"><b>${hospital.tags.name || "Hospital"}</b><br/><span class="text-green-600 font-semibold">🏥 Emergency: 108</span></div>`);
            
            return marker;
          });
          
          setHospitalMarkers(markers);
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

  // Toggle fire stations visibility
  const toggleFireStations = () => {
    if (!mapInstance) return;
    
    if (showFireStations) {
      fireStationMarkers.forEach(marker => mapInstance.removeLayer(marker));
    } else {
      fireStationMarkers.forEach(marker => mapInstance.addLayer(marker));
    }
    setShowFireStations(!showFireStations);
  };

  // Toggle hospitals visibility
  const toggleHospitals = () => {
    if (!mapInstance) return;
    
    if (showHospitals) {
      hospitalMarkers.forEach(marker => mapInstance.removeLayer(marker));
    } else {
      hospitalMarkers.forEach(marker => mapInstance.addLayer(marker));
    }
    setShowHospitals(!showHospitals);
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-gray-100">
      <div 
        ref={mapRef}
        className="w-full h-full"
        id="leaflet-map"
      />
      
      {/* Enhanced Map Legend with Filter Controls */}
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg z-[1000] border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-2 text-sm">🚨 Emergency Services</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center transition-all duration-200 hover:bg-red-50 p-1 rounded-lg">
              <div className="w-5 h-5 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mr-2 text-white text-xs shadow-lg">🚒</div>
              <div>
                <span className="font-medium text-gray-800 text-xs">Fire Stations</span>
                <div className="text-red-600 font-semibold text-xs">Call 101</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`h-6 px-2 text-xs transition-all duration-200 ${
                showFireStations 
                  ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' 
                  : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
              }`}
              onClick={toggleFireStations}
            >
              {showFireStations ? 'Hide' : 'Show'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center transition-all duration-200 hover:bg-green-50 p-1 rounded-lg">
              <div className="w-5 h-5 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mr-2 text-white text-xs shadow-lg">🏥</div>
              <div>
                <span className="font-medium text-gray-800 text-xs">Hospitals</span>
                <div className="text-green-600 font-semibold text-xs">Call 108</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`h-6 px-2 text-xs transition-all duration-200 ${
                showHospitals 
                  ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' 
                  : 'bg-white text-green-600 border-green-200 hover:bg-green-50'
              }`}
              onClick={toggleHospitals}
            >
              {showHospitals ? 'Hide' : 'Show'}
            </Button>
          </div>
          
          <div className="flex items-center transition-all duration-200 hover:bg-blue-50 p-1 rounded-lg">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full mr-2 border-2 border-white shadow-lg animate-pulse"></div>
            <span className="font-medium text-gray-800 text-xs">Your Location</span>
          </div>
        </div>
      </div>

      {/* Location Status Indicator */}
      {userLocation && (
        <div className="absolute top-3 right-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium shadow-lg border border-green-200">
          📍 Location Detected
        </div>
      )}
    </div>
  );
};

export default MapSection;
