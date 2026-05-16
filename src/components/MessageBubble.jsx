import React, { useState } from 'react';
import { CheckCheck, Play, Pause, File, Download } from 'lucide-react';

const MessageBubble = ({ message, isOwn }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayVoice = () => {
    if (message.media?.url) {
      const audio = new Audio(message.media.url);
      audio.onended = () => setIsPlaying(false);
      audio.ontimeupdate = () => setAudioProgress((audio.currentTime / audio.duration) * 100);
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleDownload = () => {
    if (message.media?.url) {
      const a = document.createElement('a');
      a.href = message.media.url;
      a.download = message.media.fileName || 'file';
      a.click();
    }
  };
  
  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1 message-animate`}
    >
      <div
        className={`message-bubble ${
          isOwn ? 'message-sent' : 'message-received'
        } max-w-[85%]`}
      >
        {message.stickers && message.stickers.length > 0 && (
          <div className="text-3xl mb-1">
            {message.stickers.map((sticker, index) => (
              <span key={index} className="inline-block mr-1">
                {sticker.emoji || '🔵'}
              </span>
            ))}
          </div>
        )}

        {message.text && (
          <p className="text-[15px] leading-snug break-words">
            {message.text}
          </p>
        )}

        {/* Медиа контент */}
        {message.media && (
          <div className="mt-2 rounded-xl overflow-hidden">
            {/* Фото */}
            {message.media.type === 'photo' && (
              <img
                src={message.media.url}
                alt="Media"
                className="max-w-full h-auto rounded-xl"
              />
            )}
            
            {/* Видео */}
            {message.media.type === 'video' && (
              <video
                src={message.media.url}
                controls
                className="max-w-full rounded-xl"
              />
            )}
            
            {/* Голосовое сообщение */}
            {message.media.type === 'voice' && (
              <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 min-w-[200px]">
                <button
                  onClick={handlePlayVoice}
                  className="flex-shrink-0 w-10 h-10 bg-[#007aff] hover:bg-[#0066d6] rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause size={18} className="text-white" />
                  ) : (
                    <Play size={18} className="text-white ml-1" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="h-1 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#007aff] transition-all duration-100"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/70 mt-1 block">
                    {formatDuration(message.media.duration || 0)}
                  </span>
                </div>
              </div>
            )}
            
            {/* Аудио файл */}
            {message.media.type === 'audio' && (
              <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 min-w-[200px]">
                <div className="flex-shrink-0 w-10 h-10 bg-[#007aff]/20 rounded-full flex items-center justify-center">
                  <Play size={18} className="text-[#007aff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">Аудио файл</p>
                  <span className="text-xs text-white/70">
                    {formatDuration(message.media.duration || 0)}
                  </span>
                </div>
                <audio src={message.media.url} controls className="w-full mt-2" />
              </div>
            )}
            
            {/* Файл */}
            {message.media.type === 'file' && (
              <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 min-w-[200px] cursor-pointer hover:bg-black/30 transition-colors" onClick={handleDownload}>
                <div className="flex-shrink-0 w-12 h-12 bg-[#007aff]/20 rounded-xl flex items-center justify-center">
                  <File size={24} className="text-[#007aff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{message.media.fileName}</p>
                  <span className="text-xs text-white/70">
                    {(message.media.fileSize / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <Download size={20} className="text-[#007aff] flex-shrink-0" />
              </div>
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
