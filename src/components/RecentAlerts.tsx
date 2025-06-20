
import React from 'react';
import { AlertTriangle, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: "Building Fire",
      location: "Downtown Plaza, Block A",
      time: "2 hours ago",
      status: "Active",
      priority: "High",
      units: 3,
      description: "Multi-story commercial building fire reported on 5th floor"
    },
    {
      id: 2,
      type: "Vehicle Fire",
      location: "Highway 101, Mile 45",
      time: "4 hours ago",
      status: "Contained",
      priority: "Medium",
      units: 2,
      description: "Car fire on highway shoulder, traffic diverted"
    },
    {
      id: 3,
      type: "False Alarm",
      location: "Residential Complex, Unit 12",
      time: "6 hours ago",
      status: "Resolved",
      priority: "Low",
      units: 1,
      description: "Smoke detector malfunction, no fire detected"
    },
    {
      id: 4,
      type: "Electrical Fire",
      location: "Industrial District, Warehouse 7",
      time: "8 hours ago",
      status: "Resolved",
      priority: "High",
      units: 4,
      description: "Electrical panel fire, power restored after repairs"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Contained':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'Contained':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {alerts.map((alert) => (
        <Card key={alert.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                {getStatusIcon(alert.status)}
                <span className="ml-2">{alert.type}</span>
              </CardTitle>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
                {alert.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{alert.location}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                {alert.time}
              </div>
              <div className="flex items-center space-x-4">
                <span className={`font-medium ${getPriorityColor(alert.priority)}`}>
                  {alert.priority} Priority
                </span>
                <span className="text-gray-500">
                  {alert.units} Unit{alert.units > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {alert.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentAlerts;
