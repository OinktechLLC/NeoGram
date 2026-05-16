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

    if (diffMins < 1) return 'Только что';
    if (diffMins < 60) return `${diffMins}м назад`;
    if (diffHours < 24) return `${diffHours}ч назад`;
    if (diffDays < 7) return `${diffDays}д назад`;
    
    return postDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="channel-post p-4 mb-4 border border-[#38383a]/50 rounded-2xl bg-[#2c2c2e]/30"
    >
      {/* Header канала */}
      <div className="flex items-center gap-3 mb-3">
        {channel?.photo && (
          <img
            src={channel.photo}
            alt={channel.title}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#007aff]/30"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.title)}&background=3b82f6&color=fff&size=128`;
            }}
          />
        )}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm">
            {channel?.title || post.author}
          </h3>
          <p className="text-[#8e8e93] text-xs">
            {formatDate(post.date)}
          </p>
        </div>
      </div>

      {/* Контент поста */}
      {/* Анимированные стикеры как в TGK каналах */}
      {post.stickers && post.stickers.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {post.stickers.map((sticker, index) => (
            <motion.div
              key={sticker.id || index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: index * 0.1, 
                type: 'spring',
                stiffness: 400,
                damping: 15
              }}
              className="inline-block"
            >
              {sticker.isAnimated || sticker.isVideo ? (
                // Анимированный стикер (Lottie/WebM)
                <div className="w-24 h-24 relative">
                  {sticker.url?.endsWith('.webm') || sticker.url?.endsWith('.tgs') ? (
                    <video
                      src={sticker.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={sticker.url}
                      alt="sticker"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              ) : (
                // Обычный стикер
                <span className="text-5xl">{sticker.emoji || '🔵'}</span>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Текст поста */}
      {post.text && (
        <p className="text-white whitespace-pre-wrap break-words leading-relaxed text-[15px]">
          {post.text}
        </p>
      )}

      {/* Медиа контент */}
      {post.media && (
        <div className="mt-3 rounded-xl overflow-hidden">
          {post.media.type === 'photo' && (
            <img
              src={post.media.url}
              alt="Медиа поста"
              className="w-full h-auto max-h-96 object-cover"
              loading="lazy"
            />
          )}
          {post.media.type === 'video' && (
            <video
              src={post.media.url}
              controls
              poster={post.media.thumbnail}
              className="w-full max-h-96 object-cover"
            />
          )}
          {post.media.type === 'animation' && (
            <video
              src={post.media.url}
              autoPlay
              loop
              muted
              playsInline
              poster={post.media.thumbnail}
              className="w-full max-h-96 object-contain bg-[#1c1c1d]"
            />
          )}
        </div>
      )}

      {/* Статистика поста */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#38383a]/50">
        <div className="flex items-center gap-4 text-[#8e8e93] text-xs">
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
        
        <button className="text-[#007aff] hover:text-blue-400 transition-colors text-xs font-medium">
          Переслать
        </button>
      </div>
    </motion.div>
  );
};

export default ChannelPost;
