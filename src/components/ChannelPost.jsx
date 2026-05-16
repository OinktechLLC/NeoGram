import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Share2 } from 'lucide-react';

const ChannelPost = ({ post, channel }) => {
  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  const formatDate = (date) => {
    const postDate = new Date(date);
    const now = new Date();
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return postDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="channel-post p-4 mb-4 border border-neogram-border/50"
    >
      {/* Channel Header */}
      <div className="flex items-center gap-3 mb-3">
        {channel?.photo && (
          <img
            src={channel.photo}
            alt={channel.title}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-neogram-primary/30"
          />
        )}
        <div className="flex-1">
          <h3 className="text-neogram-text font-semibold text-sm">
            {channel?.title || post.author}
          </h3>
          <p className="text-neogram-muted text-xs">
            {formatDate(post.date)}
          </p>
        </div>
      </div>

      {/* Post Content */}
      {post.stickers && post.stickers.length > 0 && (
        <div className="text-4xl mb-3 flex flex-wrap gap-2">
          {post.stickers.map((sticker, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="inline-block"
            >
              {sticker}
            </motion.span>
          ))}
        </div>
      )}

      {post.text && (
        <p className="text-neogram-text whitespace-pre-wrap break-words leading-relaxed">
          {post.text}
        </p>
      )}

      {post.media && (
        <div className="mt-3 rounded-xl overflow-hidden">
          {post.media.type === 'photo' && (
            <img
              src={post.media.url}
              alt="Post media"
              className="w-full h-auto max-h-96 object-cover"
            />
          )}
          {post.media.type === 'video' && (
            <video
              src={post.media.url}
              controls
              className="w-full max-h-96 object-cover"
            />
          )}
        </div>
      )}

      {/* Post Stats */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neogram-border/50">
        <div className="flex items-center gap-4 text-neogram-muted text-xs">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{formatViews(post.views)}</span>
          </div>
          {post.forwards > 0 && (
            <div className="flex items-center gap-1">
              <Share2 size={14} />
              <span>{formatViews(post.forwards)}</span>
            </div>
          )}
        </div>
        
        <button className="text-neogram-primary hover:text-blue-400 transition-colors text-xs font-medium">
          Forward
        </button>
      </div>
    </motion.div>
  );
};

export default ChannelPost;
