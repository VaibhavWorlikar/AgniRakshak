
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Building, User, Mail, Phone, Calendar, Upload, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RequestNOCPage = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    organizationName: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyAddress: '',
    buildingArea: '',
    nocType: '',
    projectDescription: '',
    expectedCompletionDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('NOC application submitted successfully! Reference ID: NOC-2024-' + Math.floor(Math.random() * 10000));
      setIsSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nocTypes = [
    { value: 'new-construction', label: 'New Construction' },
    { value: 'renovation', label: 'Renovation/Alteration' },
    { value: 'commercial', label: 'Commercial Establishment' },
    { value: 'industrial', label: 'Industrial Setup' },
    { value: 'residential', label: 'Residential Complex' },
    { value: 'event', label: 'Event/Function' }
  ];

  const requirements = [
    'Building plans and architectural drawings',
    'Site plan with fire safety measures',
    'Fire safety system layout',
    'Structural stability certificate',
    'Environmental clearance (if applicable)',
    'Property ownership documents',
    'Application fee payment receipt'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <FileText className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fire NOC Application
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Apply for Fire No Objection Certificate (NOC) for your construction or business establishment.
          </p>
        </div>
      </section>

      {/* Process Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Submit Application</h3>
              <p className="text-gray-600">Fill out the NOC application form with required details</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Site Inspection</h3>
              <p className="text-gray-600">Our team will conduct a thorough site inspection</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. NOC Approval</h3>
              <p className="text-gray-600">Receive your Fire NOC certificate upon approval</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600">Fire NOC Application Form</CardTitle>
              <CardDescription>
                Please provide complete and accurate information for faster processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Applicant Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Applicant Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="applicantName" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Applicant Name *</span>
                      </Label>
                      <Input
                        id="applicantName"
                        value={formData.applicantName}
                        onChange={(e) => handleInputChange('applicantName', e.target.value)}
                        placeholder="Full name of the applicant"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Organization/Company Name</Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        placeholder="Company or organization name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email Address *</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
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
                        placeholder="Contact number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Property Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nocType">NOC Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('nocType', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select NOC type" />
                        </SelectTrigger>
                        <SelectContent>
                          {nocTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('propertyType', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="institutional">Institutional</SelectItem>
                          <SelectItem value="mixed-use">Mixed Use</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress" className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Property Address *</span>
                    </Label>
                    <Textarea
                      id="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                      placeholder="Complete address of the property"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="buildingArea">Built-up Area (sq. ft.) *</Label>
                      <Input
                        id="buildingArea"
                        type="number"
                        value={formData.buildingArea}
                        onChange={(e) => handleInputChange('buildingArea', e.target.value)}
                        placeholder="Total built-up area"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectedCompletionDate" className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Expected Completion Date</span>
                      </Label>
                      <Input
                        id="expectedCompletionDate"
                        type="date"
                        value={formData.expectedCompletionDate}
                        onChange={(e) => handleInputChange('expectedCompletionDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Project Description *</Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    placeholder="Detailed description of the project/construction"
                    rows={4}
                    required
                  />
                </div>

                {/* Document Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Required Documents</h3>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Please prepare the following documents:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Documents *</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop your documents (PDF, JPG, PNG)
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB per file</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5 mr-2" />
                        Submit NOC Application
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

export default RequestNOCPage;
