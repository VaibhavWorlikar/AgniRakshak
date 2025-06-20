
import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Fire Safety Assistant. I can help with fire safety tips, emergency procedures, and guide you through reporting incidents. How can I help you today?",
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

    // Simulate bot response (In real implementation, this would call Gemini API)
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('fire safety') || msg.includes('tips')) {
      return "Here are key fire safety tips:\n\n🏠 Install smoke detectors on every level\n🔥 Keep fire extinguishers accessible\n🚪 Plan and practice escape routes\n⚡ Check electrical cords regularly\n🍳 Never leave cooking unattended\n\nWould you like more specific information about any of these?";
    } else if (msg.includes('emergency') || msg.includes('report')) {
      return "For fire emergencies:\n\n🚨 IMMEDIATE: Call 101\n📍 Click the 'REPORT FIRE' button on the main page\n🏃 Evacuate safely if possible\n📱 Provide your exact location\n\nIs this an active emergency? If yes, please call 101 immediately!";
    } else if (msg.includes('station') || msg.includes('nearest')) {
      return "To find the nearest fire station:\n\n📍 Check the interactive map on our homepage\n🏢 View the Fire Station Directory section\n📞 Central Station (Downtown): 101-001\n🚗 Average response time: 4-6 minutes\n\nDo you need directions to a specific station?";
    } else if (msg.includes('prevention')) {
      return "Fire prevention essentials:\n\n✅ Regular maintenance of heating systems\n✅ Proper storage of flammable materials\n✅ Clean dryer vents and chimneys\n✅ Install fire-resistant materials\n✅ Educate family members on fire safety\n\nWould you like detailed prevention tips for a specific area (home, workplace, etc.)?";
    } else {
      return "I can help you with:\n\n🔥 Fire safety tips and prevention\n🚨 Emergency reporting procedures\n🏢 Fire station locations and contacts\n📋 Safety regulations and NOC requests\n\nWhat would you like to know more about?";
    }
  };

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-14 h-14 shadow-lg animate-pulse hover:animate-none"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border">
            {/* Chat Header */}
            <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span className="font-medium">Fire Safety Assistant</span>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-red-700 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    <div className="flex items-start">
                      {message.isBot && <Bot className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />}
                      <div>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!message.isBot && <User className="h-4 w-4 ml-2 mt-0.5 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 mr-2" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Response Buttons */}
            {messages.length === 1 && (
              <div className="p-2 border-t">
                <div className="grid grid-cols-2 gap-1">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => handleQuickResponse(response)}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  placeholder="Ask about fire safety..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={() => handleSendMessage(inputMessage)}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
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
