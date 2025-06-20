
import React from 'react';
import { Shield, Home, Zap, Flame, Users, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FireSafetyTips = () => {
  const safetyTips = [
    {
      icon: <Home className="h-8 w-8 text-blue-600" />,
      title: "Home Safety",
      description: "Install smoke detectors on every level of your home and check batteries monthly.",
      tips: [
        "Test smoke alarms monthly",
        "Keep fire extinguisher in kitchen",
        "Create escape plan with family",
        "Never leave cooking unattended"
      ]
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Electrical Safety",
      description: "Prevent electrical fires by maintaining proper wiring and avoiding overloaded circuits.",
      tips: [
        "Don't overload power strips",
        "Replace damaged cords immediately",
        "Use proper wattage bulbs",
        "Hire licensed electricians"
      ]
    },
    {
      icon: <Flame className="h-8 w-8 text-red-600" />,
      title: "Fire Prevention",
      description: "Simple prevention measures can save lives and property from fire damage.",
      tips: [
        "Keep flammables away from heat",
        "Clean dryer vents regularly",
        "Store matches safely",
        "Maintain heating equipment"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Emergency Plan",
      description: "Having a family emergency plan ensures everyone knows what to do in case of fire.",
      tips: [
        "Designate meeting point outside",
        "Practice escape routes",
        "Keep emergency contacts handy",
        "Teach children fire safety"
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {safetyTips.map((tip, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-red-500">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {tip.icon}
            </div>
            <CardTitle className="text-lg">{tip.title}</CardTitle>
            <CardDescription>{tip.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tip.tips.map((item, tipIndex) => (
                <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FireSafetyTips;
