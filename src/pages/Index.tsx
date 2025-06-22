
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import EmergencyButton from '../components/EmergencyButton';
import MapSection from '../components/MapSection';
import FireSafetyTips from '../components/FireSafetyTips';
import RecentAlerts from '../components/RecentAlerts';
import FireStationDirectory from '../components/FireStationDirectory';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ReportIncidentModal from '../components/ReportIncidentModal';
import { useAuth } from '../contexts/AuthContext';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Map and Emergency Controls */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Map Section - Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <h2 className="text-xl font-bold">🚨 Emergency Services Map</h2>
                  <p className="text-red-100 text-sm">Real-time locations of fire stations and hospitals near you</p>
                </div>
                <MapSection />
              </div>
            </div>

            {/* Emergency Controls - Right Side */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Emergency Response</h3>
                  <p className="text-gray-600 text-sm">Quick access to emergency services</p>
                </div>

                {/* Main Emergency Button */}
                <EmergencyButton onClick={() => setIsReportModalOpen(true)} />
                
                {/* Quick Call Button */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/25 py-4 text-lg font-semibold"
                  onClick={() => window.open('tel:101', '_self')}
                >
                  <Phone className="mr-3 h-6 w-6" />
                  Call 101 Now
                </Button>

                {/* Emergency Info */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-red-800 text-center">Emergency Numbers</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">🚒 Fire Emergency:</span>
                      <span className="font-bold text-red-600">101</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">🏥 Medical Emergency:</span>
                      <span className="font-bold text-green-600">108</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">👮 Police Emergency:</span>
                      <span className="font-bold text-blue-600">100</span>
                    </div>
                  </div>
                </div>

                {/* Safety Tip */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Safety Tip</h4>
                  <p className="text-blue-700 text-sm">In case of fire, evacuate immediately and call 101. Never use elevators during a fire emergency.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fire Safety Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Fire Safety Tips
          </h2>
          <FireSafetyTips />
        </div>
      </section>

      {/* Recent Alerts - Only for logged in users */}
      {user && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Recent Alerts & Active Cases
            </h2>
            <RecentAlerts />
          </div>
        </section>
      )}

      {/* Fire Station Directory */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Fire Station Directory
          </h2>
          <FireStationDirectory />
        </div>
      </section>

      <Footer />
      
      {/* Floating Chatbot - Only on Home Page */}
      <Chatbot />
      
      {/* Report Incident Modal */}
      <ReportIncidentModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
