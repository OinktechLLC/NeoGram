import React from 'react';
import { motion } from 'framer-motion';

const MessageBubble = ({ message, isOwn }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        className={`message-bubble ${
          isOwn ? 'message-sent' : 'message-received'
        } shadow-lg`}
      >
        {message.stickers && message.stickers.length > 0 && (
          <div className="text-3xl mb-2">
            {message.stickers.map((sticker, index) => (
              <span key={index} className="inline-block mr-1">
                {sticker}
              </span>
            ))}
          </div>
        )}

        {message.text && (
          <p className="text-neogram-text whitespace-pre-wrap break-words">
            {message.text}
          </p>
        )}

        {message.media && (
          <div className="mt-2 rounded-lg overflow-hidden">
            {message.media.type === 'photo' && (
              <img
                src={message.media.url}
                alt="Media"
                className="max-w-full h-auto rounded-lg"
              />
            )}
            {message.media.type === 'video' && (
              <video
                src={message.media.url}
                controls
                className="max-w-full rounded-lg"
              />
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-1 mt-1 text-xs text-neogram-muted/70">
          <span>{formatTime(message.timestamp || Date.now())}</span>
          {isOwn && (
            <span className="text-blue-400">✓✓</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
