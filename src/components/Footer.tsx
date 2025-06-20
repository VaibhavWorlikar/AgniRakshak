
import React from 'react';
import { Flame, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Shield } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Fire Safety Tips', href: '#safety-tips' },
    { name: 'Report Incident', href: '#report' },
    { name: 'Request NOC', href: '#noc' },
    { name: 'Station Directory', href: '#stations' },
    { name: 'Emergency Contacts', href: '#contacts' }
  ];

  const emergencyContacts = [
    { service: 'Fire Emergency', number: '101' },
    { service: 'Police', number: '100' },
    { service: 'Medical Emergency', number: '108' },
    { service: 'Disaster Management', number: '1078' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">FireHelp</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in fire safety and emergency response. 
              Protecting communities through rapid response, prevention education, and professional service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Emergency Contacts</h3>
            <ul className="space-y-2">
              {emergencyContacts.map((contact, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{contact.service}:</span>
                  <a 
                    href={`tel:${contact.number}`}
                    className="text-white font-semibold hover:text-red-400 transition-colors"
                  >
                    {contact.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Fire Department Headquarters</p>
                  <p>123 Safety Street, Downtown</p>
                  <p>City, State 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-500" />
                <a href="tel:101-000" className="text-sm text-gray-300 hover:text-white">
                  101-000 (Non-Emergency)
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-500" />
                <a href="mailto:info@firehelp.gov" className="text-sm text-gray-300 hover:text-white">
                  info@firehelp.gov
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2024 FireHelp Department. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#accessibility" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 p-4 bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-red-400 mb-1">Important Disclaimer:</p>
                <p>
                  This website is for informational purposes. In case of actual fire emergency, 
                  immediately call <strong>101</strong> or your local emergency number. 
                  Do not rely solely on this website for emergency response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
