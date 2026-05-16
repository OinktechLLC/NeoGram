import React, { useState, useEffect } from 'react';
import { Radio, ChevronLeft } from 'lucide-react';
import TelegramService from '../services/telegramService';
import ChannelPost from '../components/ChannelPost';
import { motion } from 'framer-motion';

const telegramService = new TelegramService();

const ChannelsPage = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadChannels();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      loadChannelPosts(selectedChannel.id);
    }
  }, [selectedChannel]);

  const loadChannels = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await telegramService.getChannels();
      // Фильтруем только каналы
      const channelList = data.filter(ch => ch.type === 'channel');
      setChannels(channelList);
    } catch (error) {
      console.error('Ошибка загрузки каналов:', error);
      setError(error.message || 'Не удалось загрузить каналы');
    } finally {
      setLoading(false);
    }
  };

  const loadChannelPosts = async (channelId) => {
    try {
      const channelPosts = await telegramService.getChannelPosts(channelId);
      setPosts(channelPosts);
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
      setError(error.message || 'Не удалось загрузить посты');
    }
  };

  const handleBackToList = () => {
    setSelectedChannel(null);
    setPosts([]);
    setError(null);
  };

  // Компонент списка каналов
  const renderChannelsList = () => (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      {/* Header */}
      <div className="telegram-header border-b border-[#38383a] p-4 pt-12 lg:pt-4">
        <h1 className="text-[20px] font-semibold text-white">Каналы</h1>
        <p className="text-[13px] text-[#8e8e93] mt-0.5">{channels.length} каналов</p>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007aff]"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="bg-[#ff3b30]/10 rounded-2xl p-6 text-center max-w-md">
              <p className="text-[#ff3b30] text-[15px] mb-2">{error}</p>
              <button
                onClick={loadChannels}
                className="mt-4 px-6 py-2 bg-[#007aff] hover:bg-[#0066d6] text-white rounded-xl transition-colors"
              >
                Повторить
              </button>
            </div>
          </div>
        ) : channels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Radio size={48} className="text-[#8e8e93] mb-4" />
            <p className="text-[#8e8e93] text-[15px]">Нет доступных каналов</p>
          </div>
        ) : (
          channels.map((channel) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ backgroundColor: 'rgba(44, 44, 46, 0.8)' }}
              onClick={() => setSelectedChannel(channel)}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors mb-1"
            >
              {/* Avatar with animation support */}
              <div className="relative flex-shrink-0">
                <img
                  src={channel.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.title)}&background=3b82f6&color=fff&size=128`}
                  alt={channel.title}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#38383a]"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.title)}&background=3b82f6&color=fff&size=128`;
                  }}
                />
                <div className="absolute -bottom-0.5 -right-0.5 bg-[#007aff] rounded-full p-1.5">
                  <Radio size={12} className="text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-medium text-white truncate">
                    {channel.title}
                  </h3>
                  <span className="text-[12px] text-[#8e8e93] flex-shrink-0 ml-2">
                    {channel.subscribers}
                  </span>
                </div>
                <p className="text-[13px] text-[#8e8e93] truncate mt-0.5">
                  @{channel.username || channel.id}
                </p>
                {channel.description && (
                  <p className="text-[12px] text-[#6c6c6e] truncate mt-1">
                    {channel.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  // Компонент просмотра канала с постами - ТОЛЬКО ЧТЕНИЕ
  const renderChannelView = () => (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      {/* Header */}
      <div className="telegram-header border-b border-[#38383a] p-3 flex items-center gap-3">
        <button
          onClick={handleBackToList}
          className="p-2 hover:bg-[#2c2c2e] rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        
        <img
          src={selectedChannel.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedChannel.title)}&background=3b82f6&color=fff&size=128`}
          alt={selectedChannel.title}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedChannel.title)}&background=3b82f6&color=fff&size=128`;
          }}
        />
        
        <div className="flex-1 min-w-0">
          <h2 className="text-[16px] font-semibold text-white truncate">
            {selectedChannel.title}
          </h2>
          <p className="text-[13px] text-[#8e8e93]">
            {selectedChannel.subscribers} подписчиков
          </p>
        </div>
      </div>

      {/* Posts Feed - Только чтение, без отправки сообщений */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-[#8e8e93] text-[15px]">Нет постов для отображения</p>
          </div>
        ) : (
          posts.map((post) => (
            <ChannelPost 
              key={post.id} 
              post={post} 
              channel={selectedChannel}
            />
          ))
        )}
      </div>
    </div>
  );

  return selectedChannel ? renderChannelView() : renderChannelsList();
};

export default ChannelsPage;
