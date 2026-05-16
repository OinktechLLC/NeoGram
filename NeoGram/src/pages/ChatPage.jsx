import React, { useState } from 'react';
import { useBluetooth } from '../context/BluetoothContext';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import { Bluetooth, Wifi, WifiOff } from 'lucide-react';

const ChatPage = () => {
  const { isConnected, connectedDevice, scanForDevices, isScanning, sendMessage: sendBluetoothMessage } = useBluetooth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to NeoGram! 🚀',
      isOwn: false,
      timestamp: Date.now() - 60000
    },
    {
      id: 2,
      text: 'Start chatting via Bluetooth!',
      isOwn: false,
      timestamp: Date.now() - 30000
    }
  ]);

  const handleSendMessage = async (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isOwn: true,
      timestamp: Date.now(),
      stickers: []
    };

    setMessages(prev => [...prev, newMessage]);

    try {
      if (isConnected) {
        await sendBluetoothMessage(text);
      }
      
      // Simulate response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: 'Message received! ✓',
          isOwn: false,
          timestamp: Date.now()
        }]);
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="glass-effect border-b border-neogram-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isConnected ? 'bg-green-500/20' : 'bg-neogram-secondary'}`}>
              {isConnected ? (
                <Wifi size={20} className="text-green-500" />
              ) : (
                <WifiOff size={20} className="text-neogram-muted" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neogram-text">
                {connectedDevice?.name || 'No Device Connected'}
              </h2>
              <p className={`text-sm ${isConnected ? 'text-green-500' : 'text-neogram-muted'}`}>
                {isConnected ? 'Connected via Bluetooth' : 'Scan for devices'}
              </p>
            </div>
          </div>

          <button
            onClick={scanForDevices}
            disabled={isScanning}
            className="flex items-center gap-2 bg-neogram-primary hover:bg-blue-600 disabled:bg-neogram-secondary disabled:text-neogram-muted text-white px-4 py-2 rounded-xl transition-all"
          >
            <Bluetooth size={18} className={isScanning ? 'animate-pulse' : ''} />
            {isScanning ? 'Scanning...' : 'Scan Devices'}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {!isConnected && (
          <div className="text-center py-8">
            <Bluetooth size={48} className="mx-auto text-neogram-muted mb-4 opacity-50" />
            <p className="text-neogram-muted">
              Connect to a device via Bluetooth to start messaging
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.isOwn}
          />
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          disabled={!isConnected}
        />
        {!isConnected && (
          <p className="text-center text-xs text-neogram-muted mt-2">
            Connect to a Bluetooth device to send messages
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
