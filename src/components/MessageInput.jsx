import React, { useState } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="telegram-input flex items-center gap-2">
      <button
        type="button"
        className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#8e8e93]"
        disabled={disabled}
      >
        <Paperclip size={20} />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Message..."
        className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#8e8e93] px-2 py-1 text-[16px]"
        disabled={disabled}
      />

      <button
        type="button"
        className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#8e8e93]"
        disabled={disabled}
      >
        <Smile size={20} />
      </button>

      {message.trim() ? (
        <button
          type="submit"
          className="p-3 bg-[#007aff] hover:bg-[#0066d6] rounded-full transition-all"
          disabled={disabled}
        >
          <Send size={20} className="text-white" />
        </button>
      ) : (
        <button
          type="button"
          className="p-3 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-full transition-colors"
          disabled={disabled}
        >
          <Mic size={20} className="text-[#8e8e93]" />
        </button>
      )}
    </form>
  );
};

export default MessageInput;
