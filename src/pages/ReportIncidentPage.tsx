
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertTriangle, MapPin, Phone, Upload, User, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ReportIncidentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    incidentType: '',
    location: '',
    description: '',
    severity: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Incident reported successfully! Emergency services have been notified.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        incidentType: '',
        location: '',
        description: '',
        severity: ''
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Report Fire Incident
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Report a fire emergency immediately. Our response team will be dispatched to your location.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center justify-center space-x-2 text-2xl font-bold">
              <Phone className="h-6 w-6" />
              <span>Emergency Hotline: 101</span>
            </div>
          </div>
        </div>
      </section>

      {/* Report Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-red-600">Fire Incident Report Form</CardTitle>
              <CardDescription>
                Please provide accurate information to help us respond effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Full Name *</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number *</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Your contact number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Incident Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="incidentType">Type of Fire Incident *</Label>
                    <Select onValueChange={(value) => handleInputChange('incidentType', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="building">Building Fire</SelectItem>
                        <SelectItem value="vehicle">Vehicle Fire</SelectItem>
                        <SelectItem value="forest">Forest/Wildfire</SelectItem>
                        <SelectItem value="electrical">Electrical Fire</SelectItem>
                        <SelectItem value="gas">Gas Leak/Fire</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level *</Label>
                    <Select onValueChange={(value) => handleInputChange('severity', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Small fire, contained</SelectItem>
                        <SelectItem value="medium">Medium - Spreading fire</SelectItem>
                        <SelectItem value="high">High - Large fire, immediate danger</SelectItem>
                        <SelectItem value="critical">Critical - Life threatening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Incident Location *</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Exact address or landmark"
                    required
                  />
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Incident Description *</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the fire incident in detail - what's burning, size, any people trapped, etc."
                    rows={4}
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload Photos/Videos (Optional)</span>
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop images/videos of the incident
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting Report...
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Submit Fire Report
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReportIncidentPage;
