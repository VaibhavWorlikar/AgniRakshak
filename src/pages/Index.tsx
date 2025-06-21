
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

const Index = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Map */}
      <section className="relative">
        <MapSection />
        <EmergencyButton onClick={() => setIsReportModalOpen(true)} />
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
      
      {/* Floating Chatbot */}
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
