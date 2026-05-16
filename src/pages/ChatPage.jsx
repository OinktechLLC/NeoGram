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
      text: 'Welcome to NeoGram!',
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
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: 'Message received!',
          isOwn: false,
          timestamp: Date.now()
        }]);
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      {/* Chat Header */}
      <div className="telegram-header border-b border-[#38383a] p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isConnected ? 'bg-[#34c759]/20' : 'bg-[#2c2c2e]'}`}>
              {isConnected ? (
                <Wifi size={20} className="text-[#34c759]" />
              ) : (
                <WifiOff size={20} className="text-[#8e8e93]" />
              )}
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-white">
                {connectedDevice?.name || 'No Device Connected'}
              </h2>
              <p className={`text-[13px] ${isConnected ? 'text-[#34c759]' : 'text-[#8e8e93]'}`}>
                {isConnected ? 'Connected' : 'Scan for devices'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              console.log('Scan button clicked');
              scanForDevices();
            }}
            disabled={isScanning}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[14px] font-medium ${
              isScanning 
                ? 'bg-[#2c2c2e] text-[#8e8e93]' 
                : 'bg-[#007aff] hover:bg-[#0066d6] text-white'
            }`}
          >
            <Bluetooth size={18} className={isScanning ? 'animate-pulse' : ''} />
            {isScanning ? 'Scanning...' : 'Scan'}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2">
        {!isConnected && (
          <div className="text-center py-12">
            <Bluetooth size={48} className="mx-auto text-[#8e8e93] mb-3 opacity-40" />
            <p className="text-[#8e8e93] text-[15px]">
              Connect to a device to start messaging
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
      <div className="p-2">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          disabled={!isConnected}
        />
        {!isConnected && (
          <p className="text-center text-xs text-[#8e8e93] mt-2">
            Connect to send messages
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
