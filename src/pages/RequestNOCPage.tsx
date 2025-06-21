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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const RequestNOCPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    applicantName: '',
    organizationName: '',
    email: user?.email || '',
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
    
    try {
      const { data, error } = await supabase
        .from('noc_requests')
        .insert([
          {
            user_id: user?.id,
            applicant_name: formData.applicantName,
            organization_name: formData.organizationName || null,
            email: formData.email,
            phone: formData.phone,
            property_type: formData.propertyType,
            property_address: formData.propertyAddress,
            building_area: formData.buildingArea,
            noc_type: formData.nocType,
            project_description: formData.projectDescription,
            expected_completion_date: formData.expectedCompletionDate || null
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const referenceId = `NOC-${new Date().getFullYear()}-${data.id.slice(0, 8).toUpperCase()}`;
      
      toast({
        title: "✅ Application Submitted Successfully!",
        description: `Your NOC application has been submitted. Reference ID: ${referenceId}`,
        duration: 5000,
      });

      // Reset form
      setFormData({
        applicantName: '',
        organizationName: '',
        email: user?.email || '',
        phone: '',
        propertyType: '',
        propertyAddress: '',
        buildingArea: '',
        nocType: '',
        projectDescription: '',
        expectedCompletionDate: ''
      });

    } catch (error) {
      console.error('Error submitting NOC application:', error);
      toast({
        title: "❌ Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <FileText className="h-20 w-20 mx-auto mb-8 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Fire NOC Application
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-blue-100">
              Apply for Fire No Objection Certificate (NOC) for your construction or business establishment with our streamlined digital process.
            </p>
          </div>
        </div>
      </section>

      {/* Process Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">1. Submit Application</h3>
              <p className="text-gray-600 leading-relaxed">Fill out the NOC application form with required details and documentation</p>
            </div>
            <div className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300">
                <Building className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">2. Site Inspection</h3>
              <p className="text-gray-600 leading-relaxed">Our certified team will conduct a comprehensive site inspection</p>
            </div>
            <div className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">3. NOC Approval</h3>
              <p className="text-gray-600 leading-relaxed">Receive your Fire NOC certificate upon successful approval</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-xl">
              <CardTitle className="text-3xl font-bold">Fire NOC Application Form</CardTitle>
              <CardDescription className="text-blue-100 text-lg mt-2">
                Please provide complete and accurate information for faster processing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Applicant Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3">
                    👤 Applicant Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="applicantName" className="flex items-center space-x-2 text-gray-700 font-medium">
                        <User className="h-5 w-5 text-blue-600" />
                        <span>Applicant Name *</span>
                      </Label>
                      <Input
                        id="applicantName"
                        value={formData.applicantName}
                        onChange={(e) => handleInputChange('applicantName', e.target.value)}
                        placeholder="Full name of the applicant"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="organizationName" className="text-gray-700 font-medium">Organization/Company Name</Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        placeholder="Company or organization name"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="flex items-center space-x-2 text-gray-700 font-medium">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <span>Email Address *</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="flex items-center space-x-2 text-gray-700 font-medium">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <span>Phone Number *</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Contact number"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3">
                    🏢 Property Information
                  </h3>
                  
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
                      rows={4}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
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
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
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
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
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
                <div className="flex justify-center pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 text-lg rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <FileText className="h-6 w-6 mr-3" />
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
