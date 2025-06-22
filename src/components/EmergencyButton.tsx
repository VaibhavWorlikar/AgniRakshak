
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmergencyButtonProps {
  onClick: () => void;
}

const EmergencyButton = ({ onClick }: EmergencyButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg text-lg px-6 py-4 transition-all duration-300 transform hover:scale-105 border-2 border-red-500/20 hover:border-red-400/40 font-semibold"
    >
      <AlertTriangle className="mr-3 h-6 w-6" />
      REPORT FIRE EMERGENCY
    </Button>
  );
};

export default EmergencyButton;
