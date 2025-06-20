import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Message sent successfully! We will get back to you within 24 hours.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Emergency Hotline",
      details: ["101 (Fire Emergency)", "100 (Police)", "108 (Medical)"],
      color: "text-red-600 bg-red-50"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Office Phone",
      details: ["+1 (555) 101-0000", "+1 (555) 101-0001"],
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Address",
      details: ["info@firehelp.gov", "emergency@firehelp.gov"],
      color: "text-green-600 bg-green-50"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Head Office",
      details: ["123 Safety Street", "Downtown, City 12345"],
      color: "text-purple-600 bg-purple-50"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Emergency Only" },
    { day: "Public Holidays", hours: "Emergency Only" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Get in touch with our fire safety experts. We're here to help with your questions and concerns.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${info.color} flex items-center justify-center mx-auto mb-4`}>
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
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
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="What is this message about?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please describe your inquiry in detail..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Hours & Additional Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Office Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Emergency Notice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 text-sm">
                    For fire emergencies, please call <strong>101</strong> immediately. 
                    Do not use this contact form for emergency situations.
                  </p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => window.open('tel:101', '_self')}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Emergency: 101
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-600">Location & Directions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Fire Department Headquarters</p>
                        <p className="text-sm text-gray-600">123 Safety Street, Downtown</p>
                        <p className="text-sm text-gray-600">City, State 12345</p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
