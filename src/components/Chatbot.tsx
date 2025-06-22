
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🔥 Hello! I'm your AI Fire Safety Assistant. I'm here to help with fire safety tips, emergency procedures, fire prevention, and incident response guidance. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickResponses = [
    "Fire safety tips",
    "Report emergency",
    "Nearest fire station",
    "Prevention guide"
  ];

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocationCoords({ lat, lon });
          
          // Reverse geocoding to get address
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`);
            const data = await response.json();
            const location = `${data.address?.city || data.address?.town || data.address?.village || 'Unknown City'}, ${data.address?.state || data.address?.country || 'Unknown State'}`;
            setUserLocation(location);
            
            // Update welcome message with location
            setMessages(prev => [{
              ...prev[0],
              text: `🔥 Hello! I'm your AI Fire Safety Assistant powered by Google Gemini. I can see you're in ${location}. I'm here to help with fire safety tips, emergency procedures, fire prevention, and location-specific guidance. How can I assist you today?`
            }]);
          } catch (error) {
            console.error('Error getting location name:', error);
            const coordsString = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
            setUserLocation(coordsString);
            
            setMessages(prev => [{
              ...prev[0],
              text: `🔥 Hello! I'm your AI Fire Safety Assistant powered by Google Gemini. I can see your approximate location (${coordsString}). I'm here to help with fire safety tips, emergency procedures, fire prevention, and location-specific guidance. How can I assist you today?`
            }]);
          }
        },
        (error) => {
          console.warn('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    }
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Enhanced message with location context
      let contextualMessage = message;
      if (userLocation && locationCoords) {
        contextualMessage = `User location: ${userLocation} (coordinates: ${locationCoords.lat.toFixed(4)}, ${locationCoords.lon.toFixed(4)}). User message: ${message}`;
      } else if (userLocation) {
        contextualMessage = `User location: ${userLocation}. User message: ${message}`;
      }

      // Call Gemini API through Edge Function
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          message: contextualMessage,
          context: "fire safety assistant with location awareness"
        }
      });

      if (error) throw error;

      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "I apologize, but I'm having trouble processing your request right now. For immediate fire emergencies, please call 101.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting to my AI service right now. For immediate fire emergencies, please call 101. For general fire safety questions, you can also check our Fire Safety Tips section.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-8 right-8 z-[1010]">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full w-16 h-16 shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-red-500/20 hover:border-red-400/40"
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col border border-gray-200 overflow-hidden transition-all duration-300 transform">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-6 w-6 mr-3" />
                <div>
                  <span className="font-semibold text-lg">Fire AI Assistant</span>
                  {userLocation && (
                    <div className="flex items-center text-red-100 text-sm mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate max-w-[200px]">{userLocation}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-red-700/50 p-2 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} transition-all duration-200`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl transition-all duration-200 ${
                      message.isBot
                        ? 'bg-white text-gray-800 shadow-md border border-gray-100'
                        : 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                    }`}
                  >
                    <div className="flex items-start">
                      {message.isBot && <Bot className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-red-600" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!message.isBot && <User className="h-4 w-4 ml-2 mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start transition-all duration-200">
                  <div className="bg-white text-gray-800 p-4 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 mr-2 text-red-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Response Buttons */}
            {messages.length === 1 && (
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="grid grid-cols-2 gap-2">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-9 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                      onClick={() => handleQuickResponse(response)}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  placeholder="Ask about fire safety..."
                  className="flex-1 text-sm border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-xl transition-all duration-200"
                />
                <Button
                  onClick={() => handleSendMessage(inputMessage)}
                  size="sm"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl px-4 transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
