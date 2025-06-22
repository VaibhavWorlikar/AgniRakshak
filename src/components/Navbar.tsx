
import React, { useState } from 'react';
import { Menu, X, Flame, Phone, LogOut, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, userProfile, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/', path: '/' },
    { name: 'Fire Safety Tips', href: '/fire-safety-tips', path: '/fire-safety-tips' },
    { name: 'Report Incident', href: '/report-incident', path: '/report-incident' },
    { name: 'Request NOC', href: '/request-noc', path: '/request-noc' },
    { name: 'Contact', href: '/contact', path: '/contact' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-red-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Flame className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">AgniRakshak</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors duration-200 font-medium ${
                  isActivePath(link.path)
                    ? 'text-red-600 border-b-2 border-red-600 pb-1'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Emergency Contact & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-red-600">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">Emergency: 101</span>
            </div>
            
            {user ? (
              <div className="flex items-center space-x-2">
                {userProfile?.role === 'admin' && (
                  <Link to="/admin">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login / Sign Up
                </Button>
              </Link>
            )}
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
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium px-2 transition-colors duration-200 ${
                    isActivePath(link.path)
                      ? 'text-red-600 font-semibold'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 text-red-600 px-2">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">Emergency: 101</span>
              </div>
              
              {user ? (
                <div className="space-y-2 px-2">
                  {userProfile?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-full"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSignOut}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white mx-2"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
