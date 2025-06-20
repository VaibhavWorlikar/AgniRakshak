
import React, { useState } from 'react';
import { Menu, X, Flame, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Fire Safety Tips', href: '#safety-tips' },
    { name: 'Report Incident', href: '#report' },
    { name: 'Request NOC', href: '#noc' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-red-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Flame className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">FireHelp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Emergency Contact & Login */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-red-600">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">Emergency: 101</span>
            </div>
            <Button 
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Login / Admin Panel
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center space-x-2 text-red-600 px-2">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">Emergency: 101</span>
              </div>
              <Button 
                variant="outline" 
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white mx-2"
              >
                Login / Admin Panel
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
