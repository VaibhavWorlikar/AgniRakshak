
import React, { useState, useEffect } from 'react';
import { X, MapPin, Upload, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportIncidentModal = ({ isOpen, onClose }: ReportIncidentModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fireType: '',
    description: '',
    location: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    image: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const fireTypes = [
    'Building Fire',
    'Vehicle Fire',
    'Forest Fire',
    'Electrical Fire',
    'Chemical Fire',
    'Other'
  ];

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationLoading(false);
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      setLocationLoading(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('incident_reports')
        .insert([
          {
            reporter_name: formData.name,
            reporter_phone: formData.phone,
            fire_type: formData.fireType,
            description: formData.description,
            location: formData.location,
            priority: formData.priority,
            status: 'active'
          }
        ]);

      if (error) {
        console.error('Error submitting report:', error);
        alert('Error submitting report. Please try again.');
      } else {
        alert('Emergency report submitted successfully! Fire department has been notified.');
        onClose();
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          fireType: '',
          description: '',
          location: '',
          priority: 'medium',
          image: null
        });
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center text-red-600">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Report Fire Emergency
          </SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
                placeholder="Your phone"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="fireType">Type of Fire *</Label>
            <select
              id="fireType"
              value={formData.fireType}
              onChange={(e) => setFormData(prev => ({ ...prev, fireType: e.target.value }))}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select fire type</option>
              {fireTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="priority">Priority Level *</Label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="low">Low - Small fire, contained</option>
              <option value="medium">Medium - Spreading fire</option>
              <option value="high">High - Large fire, immediate danger</option>
            </select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <div className="flex space-x-2">
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location or use GPS"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={getCurrentLocation}
                disabled={locationLoading}
                variant="outline"
                size="sm"
              >
                {locationLoading ? '...' : <MapPin className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the situation"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-20 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="image">Upload Image (Optional)</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1"
              />
              <Upload className="h-4 w-4 text-gray-400" />
            </div>
            {formData.image && (
              <p className="text-sm text-green-600 mt-1">
                Image selected: {formData.image.name}
              </p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ReportIncidentModal;
