import React from 'react';
import { CheckCheck } from 'lucide-react';

const MessageBubble = ({ message, isOwn }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1 message-animate`}
    >
      <div
        className={`message-bubble ${
          isOwn ? 'message-sent' : 'message-received'
        }`}
      >
        {message.stickers && message.stickers.length > 0 && (
          <div className="text-3xl mb-1">
            {message.stickers.map((sticker, index) => (
              <span key={index} className="inline-block mr-1">
                {sticker}
              </span>
            ))}
          </div>
        )}

        {message.text && (
          <p className="text-[15px] leading-snug">
            {message.text}
          </p>
        )}

        {message.media && (
          <div className="mt-2 rounded-xl overflow-hidden">
            {message.media.type === 'photo' && (
              <img
                src={message.media.url}
                alt="Media"
                className="max-w-full h-auto rounded-xl"
              />
            )}
            {message.media.type === 'video' && (
              <video
                src={message.media.url}
                controls
                className="max-w-full rounded-xl"
              />
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="message-time">{formatTime(message.timestamp || Date.now())}</span>
          {isOwn && (
            <CheckCheck size={14} className="text-white/70" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
