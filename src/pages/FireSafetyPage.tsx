
import React from 'react';
import Navbar from '../components/Navbar';
import FireSafetyTips from '../components/FireSafetyTips';
import Footer from '../components/Footer';
import { Shield, AlertTriangle, Phone, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FireSafetyPage = () => {
  const emergencySteps = [
    {
      step: 1,
      title: "Stay Calm",
      description: "Don't panic. Think clearly and act quickly but safely."
    },
    {
      step: 2,
      title: "Alert Everyone",
      description: "Shout 'FIRE!' to warn others. Activate fire alarm if available."
    },
    {
      step: 3,
      title: "Call Emergency Services",
      description: "Dial 101 immediately. Give clear location and details."
    },
    {
      step: 4,
      title: "Evacuate Safely",
      description: "Use nearest safe exit. Stay low if there's smoke. Don't use elevators."
    },
    {
      step: 5,
      title: "Meet at Assembly Point",
      description: "Go to designated meeting point. Don't re-enter building."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fire Safety Guidelines
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Stay prepared, stay safe. Learn essential fire safety tips and emergency procedures.
          </p>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What to Do in Case of Fire Emergency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {emergencySteps.map((step, index) => (
              <Card key={index} className="text-center border-t-4 border-t-red-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fire Safety Tips */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Fire Prevention Tips
          </h2>
          <FireSafetyTips />
        </div>
      </section>

      {/* Important Numbers */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Emergency Contact Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-4">
              <Phone className="h-8 w-8" />
              <div>
                <div className="text-2xl font-bold">101</div>
                <div className="text-lg">Fire Emergency</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Phone className="h-8 w-8" />
              <div>
                <div className="text-2xl font-bold">100</div>
                <div className="text-lg">Police</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Phone className="h-8 w-8" />
              <div>
                <div className="text-2xl font-bold">108</div>
                <div className="text-lg">Medical Emergency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FireSafetyPage;
