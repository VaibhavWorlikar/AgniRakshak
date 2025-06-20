
import React from 'react';
import { MapPin, Phone, Clock, Users, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FireStationDirectory = () => {
  const fireStations = [
    {
      id: 1,
      name: "Central Fire Station",
      address: "123 Main Street, Downtown",
      phone: "101-001",
      emergency: "101",
      commander: "Chief John Smith",
      personnel: 24,
      vehicles: ["Engine 1", "Ladder 1", "Rescue 1"],
      status: "Active",
      responseTime: "4 min avg",
      coverage: "Downtown District"
    },
    {
      id: 2,
      name: "North Fire Station",
      address: "456 North Avenue, Uptown",
      phone: "101-002",
      emergency: "101",
      commander: "Captain Sarah Johnson",
      personnel: 18,
      vehicles: ["Engine 2", "Tanker 2"],
      status: "Active",
      responseTime: "5 min avg",
      coverage: "North District"
    },
    {
      id: 3,
      name: "East Fire Station",
      address: "789 East Boulevard, Eastside",
      phone: "101-003",
      emergency: "101",
      commander: "Captain Mike Wilson",
      personnel: 20,
      vehicles: ["Engine 3", "Ladder 3", "Ambulance 3"],
      status: "On Call",
      responseTime: "6 min avg",
      coverage: "East District"
    },
    {
      id: 4,
      name: "West Fire Station",
      address: "321 West Park Road, Westside",
      phone: "101-004",
      emergency: "101",
      commander: "Captain Lisa Brown",
      personnel: 16,
      vehicles: ["Engine 4", "Rescue 4"],
      status: "Active",
      responseTime: "5 min avg",
      coverage: "West District"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fireStations.map((station) => (
        <Card key={station.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-800">{station.name}</CardTitle>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                station.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {station.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-3" />
                <span className="text-sm">{station.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-3" />
                <span className="text-sm">Office: {station.phone} | Emergency: {station.emergency}</span>
              </div>
            </div>

            {/* Station Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                <span>{station.personnel} Personnel</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-green-600" />
                <span>{station.responseTime}</span>
              </div>
            </div>

            {/* Vehicles */}
            <div>
              <div className="flex items-center mb-2">
                <Truck className="h-4 w-4 mr-2 text-red-600" />
                <span className="text-sm font-medium">Vehicles:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {station.vehicles.map((vehicle, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {vehicle}
                  </span>
                ))}
              </div>
            </div>

            {/* Coverage & Commander */}
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Commander:</strong> {station.commander}</div>
              <div><strong>Coverage Area:</strong> {station.coverage}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => window.open(`tel:${station.phone}`, '_self')}
              >
                <Phone className="h-4 w-4 mr-1" />
                Call Station
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FireStationDirectory;
