import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, X } from 'lucide-react';

const MessageInput = ({ onSendMessage, onSendFile, onSendVoice, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && onSendFile) {
      setSelectedFile(file);
      onSendFile(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg; codecs=opus' });
        if (onSendVoice) {
          onSendVoice(audioBlob);
        }
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Предпросмотр файла */}
      {selectedFile && (
        <div className="flex items-center gap-2 bg-[#2c2c2e] rounded-xl p-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{selectedFile.name}</p>
            <span className="text-xs text-[#8e8e93]">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className="p-1 hover:bg-[#38383a] rounded-full transition-colors"
          >
            <X size={16} className="text-[#8e8e93]" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.zip"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 hover:bg-white/5 rounded-full transition-colors text-[#8e8e93] flex-shrink-0"
          disabled={disabled || isRecording}
        >
          <Paperclip size={22} />
        </button>

        <div className="flex-1 bg-[#2c2c2e] rounded-2xl px-4 py-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Сообщение..."
            className="w-full bg-transparent border-none outline-none text-white placeholder-[#8e8e93] text-[16px]"
            disabled={disabled || isRecording}
          />
        </div>

        {message.trim() ? (
          <button
            type="submit"
            className="p-3 bg-[#007aff] hover:bg-[#0066d6] rounded-full transition-all flex-shrink-0"
            disabled={disabled || isRecording}
          >
            <Send size={22} className="text-white" />
          </button>
        ) : (
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={`p-3 rounded-full transition-all flex-shrink-0 ${
              isRecording 
                ? 'bg-[#ff3b30] animate-pulse' 
                : 'bg-[#2c2c2e] hover:bg-[#3a3a3c]'
            }`}
            disabled={disabled}
          >
            <Mic size={22} className={isRecording ? 'text-white' : 'text-[#8e8e93]'} />
          </button>
        )}
      </form>

      {isRecording && (
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="w-2 h-2 bg-[#ff3b30] rounded-full animate-pulse" />
          <span className="text-xs text-[#ff3b30]">Запись... Отпустите для остановки</span>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
