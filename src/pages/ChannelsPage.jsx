import React, { useState, useEffect } from 'react';
import TelegramService from '../services/telegramService';
import ChannelCard from '../components/ChannelCard';
import ChannelPost from '../components/ChannelPost';
import { ArrowLeft, Radio } from 'lucide-react';

const ChannelsPage = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      const telegramService = new TelegramService();
      const channelsData = await telegramService.getChannels();
      setChannels(channelsData);
    } catch (error) {
      console.error('Failed to load channels:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChannelPosts = async (channel) => {
    setLoading(true);
    try {
      const telegramService = new TelegramService();
      const postsData = await telegramService.getChannelPosts(channel.id);
      setPosts(postsData);
      setSelectedChannel(channel);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedChannel(null);
    setPosts([]);
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="glass-effect border-b border-neogram-border p-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          {selectedChannel && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-neogram-secondary rounded-xl transition-colors"
            >
              <ArrowLeft size={20} className="text-neogram-text" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl">
              <Radio size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neogram-text">
                {selectedChannel ? selectedChannel.title : 'Channels'}
              </h1>
              <p className="text-sm text-neogram-muted">
                {selectedChannel 
                  ? `@${selectedChannel.username}` 
                  : 'Telegram channels without VPN'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neogram-primary"></div>
          </div>
        ) : selectedChannel ? (
          /* Posts View */
          <div className="max-w-3xl mx-auto">
            {posts.map((post) => (
              <ChannelPost
                key={post.id}
                post={post}
                channel={selectedChannel}
              />
            ))}
          </div>
        ) : (
          /* Channels Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                onClick={() => loadChannelPosts(channel)}
              />
            ))}
          </div>
        )}

        {!loading && !selectedChannel && channels.length === 0 && (
          <div className="text-center py-20">
            <Radio size={48} className="mx-auto text-neogram-muted mb-4 opacity-50" />
            <p className="text-neogram-muted">No channels available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelsPage;
