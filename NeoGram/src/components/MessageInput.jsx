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
    <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-3 flex items-center gap-2">
      <button
        type="button"
        className="p-2 hover:bg-neogram-secondary rounded-full transition-colors text-neogram-muted"
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
        className="flex-1 bg-transparent border-none outline-none text-neogram-text placeholder-neogram-muted px-3 py-2"
        disabled={disabled}
      />

      <button
        type="button"
        className="p-2 hover:bg-neogram-secondary rounded-full transition-colors text-neogram-muted"
        disabled={disabled}
      >
        <Smile size={20} />
      </button>

      {message.trim() ? (
        <button
          type="submit"
          className="p-3 bg-neogram-primary hover:bg-blue-600 rounded-full transition-all transform hover:scale-105"
          disabled={disabled}
        >
          <Send size={20} className="text-white" />
        </button>
      ) : (
        <button
          type="button"
          className="p-3 bg-neogram-secondary hover:bg-neogram-border rounded-full transition-colors"
          disabled={disabled}
        >
          <Mic size={20} className="text-neogram-muted" />
        </button>
      )}
    </form>
  );
};

export default MessageInput;
