
import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmergencyButtonProps {
  onClick: () => void;
}

const EmergencyButton = ({ onClick }: EmergencyButtonProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[1002] flex flex-col items-center space-y-4">
      {/* Main Emergency Button */}
      <Button
        onClick={onClick}
        size="lg"
        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl text-xl px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/25 border-2 border-red-500/20"
      >
        <AlertTriangle className="mr-3 h-8 w-8 animate-bounce" />
        REPORT FIRE EMERGENCY
      </Button>
      
      {/* Quick Call Button */}
      <Button
        variant="outline"
        size="lg"
        className="bg-white/95 backdrop-blur-sm border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-xl transition-all duration-300 transform hover:scale-105 border-2"
        onClick={() => window.open('tel:101', '_self')}
      >
        <Phone className="mr-2 h-5 w-5" />
        Call 101 Now
      </Button>
    </div>
  );
};

export default EmergencyButton;
