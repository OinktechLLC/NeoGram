import React from 'react';
import { Radio, Users, MessageCircle } from 'lucide-react';

const ChannelsPage = () => {
  const channels = [
    { id: 1, name: 'Tech News', subscribers: '12.5K', lastMessage: 'New iPhone announced!', time: '2m ago' },
    { id: 2, name: 'Music Channel', subscribers: '8.2K', lastMessage: 'New playlist added', time: '15m ago' },
    { id: 3, name: 'Gaming Hub', subscribers: '25K', lastMessage: 'Tournament starts tomorrow', time: '1h ago' },
    { id: 4, name: 'Crypto Updates', subscribers: '18K', lastMessage: 'Bitcoin hits new high', time: '3h ago' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      {/* Header */}
      <div className="telegram-header border-b border-[#38383a] p-4">
        <h1 className="text-[20px] font-semibold text-white">Channels</h1>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto p-2">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#2c2c2e] transition-colors cursor-pointer"
          >
            <div className="bg-[#007aff] p-3 rounded-full">
              <Radio size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-medium text-white truncate">{channel.name}</h3>
                <span className="text-[12px] text-[#8e8e93]">{channel.time}</span>
              </div>
              <p className="text-[14px] text-[#8e8e93] truncate">{channel.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelsPage;
