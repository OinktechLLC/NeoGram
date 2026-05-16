// Telegram API Service - Реальная интеграция через MTProto (GramJS)
// Использует официальный Telegram API для подключения без бота
// Поддержка: сообщения, файлы, голосовые, каналы

import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import bigInt from 'big-integer';

const API_ID = 21724; // Официальный API ID Telegram Desktop
const API_HASH = '3e0cb5efcd52300aec5994fdfdd56dc1'; // Официальный API Hash

class TelegramService {
  constructor() {
    this.client = null;
    this.session = new StringSession('');
    this.isConnected = false;
    this.currentUser = null;
  }

  // Инициализация клиента
  async initialize() {
    if (!this.client) {
      this.client = new TelegramClient(this.session, API_ID, API_HASH, {
        connectionRetries: 5,
        useWSS: true,
      });
      await this.client.start({
        phoneNumber: async () => await this.promptPhoneNumber(),
        phoneCode: async () => await this.promptPhoneCode(),
        password: async () => await this.promptPassword(),
      });
      this.currentUser = await this.client.getMe();
      this.isConnected = true;
    }
    return this.client;
  }

  // Запрос номера телефона
  async promptPhoneNumber() {
    return new Promise((resolve) => {
      const event = new CustomEvent('telegram-phone-request', {
        detail: { callback: resolve }
      });
      window.dispatchEvent(event);
    });
  }

  // Запрос кода подтверждения
  async promptPhoneCode() {
    return new Promise((resolve) => {
      const event = new CustomEvent('telegram-code-request', {
        detail: { callback: resolve }
      });
      window.dispatchEvent(event);
    });
  }

  // Запрос пароля (если включена 2FA)
  async promptPassword() {
    return new Promise((resolve) => {
      const event = new CustomEvent('telegram-password-request', {
        detail: { callback: resolve }
      });
      window.dispatchEvent(event);
    });
  }

  // Получение списка каналов/чатов
  async getChannels() {
    try {
      await this.initialize();
      const dialogs = await this.client.getDialogs();
      const channels = [];
      
      for (const dialog of dialogs) {
        if (dialog.isChannel || dialog.isGroup || dialog.isUser) {
          const entity = dialog.entity;
          const photo = await this.getEntityPhoto(entity);
          
          channels.push({
            id: entity.id.toString(),
            title: entity.title || entity.firstName || 'Unknown',
            username: entity.username || null,
            photo: photo,
            type: entity.className === 'Channel' ? 'channel' : 
                   entity.className === 'Chat' ? 'group' : 'user',
            subscribers: entity.participantsCount || 0,
            description: entity.about || '',
            unreadCount: dialog.unreadCount || 0
          });
        }
      }
      
      return channels;
    } catch (error) {
      console.error('Ошибка загрузки каналов:', error);
      throw error;
    }
  }

  // Получение фото профиля
  async getEntityPhoto(entity) {
    try {
      if (entity.photo) {
        const photo = await this.client.downloadProfilePhoto(entity, { isBig: false });
        return photo ? URL.createObjectURL(new Blob([photo])) : null;
      }
      return null;
    } catch (error) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(entity.title || entity.firstName || 'U')}&background=3b82f6&color=fff&size=128`;
    }
  }

  // Получение постов канала
  async getChannelPosts(channelId, limit = 50) {
    try {
      await this.initialize();
      const entity = await this.client.getEntity(parseInt(channelId));
      const messages = await this.client.getMessages(entity, { limit });
      
      const posts = [];
      for (const msg of messages) {
        const post = {
          id: msg.id.toString(),
          channelId: channelId,
          text: msg.message || '',
          date: msg.date.toISOString(),
          views: msg.views || 0,
          forwards: msg.forwards || 0,
          author: msg.postAuthor || 'Admin',
          stickers: [],
          media: null
        };

        // Обработка медиа
        if (msg.media) {
          post.media = await this.processMedia(msg.media);
        }

        // Обработка стикеров
        if (msg.sticker) {
          const stickerData = await this.processSticker(msg.sticker);
          post.stickers.push(stickerData);
        }

        posts.push(post);
      }

      return posts;
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
      throw error;
    }
  }

  // Обработка медиа контента
  async processMedia(media) {
    try {
      if (media.className === 'MessageMediaPhoto') {
        const file = await this.client.downloadMedia(media);
        return {
          type: 'photo',
          url: file ? URL.createObjectURL(new Blob([file])) : null,
          fileId: media.photo?.id?.toString()
        };
      }
      
      if (media.className === 'MessageMediaDocument') {
        const doc = media.document;
        if (doc.mimeType?.startsWith('video/')) {
          const file = await this.client.downloadMedia(media);
          return {
            type: 'video',
            url: file ? URL.createObjectURL(new Blob([file])) : null,
            fileId: doc.id?.toString(),
            thumbnail: media.thumb ? await this.client.downloadMedia(media.thumb) : null
          };
        }
        
        if (doc.mimeType?.startsWith('audio/')) {
          const file = await this.client.downloadMedia(media);
          return {
            type: doc.mimeType.includes('ogg') || doc.mimeType.includes('voice') ? 'voice' : 'audio',
            url: file ? URL.createObjectURL(new Blob([file])) : null,
            fileId: doc.id?.toString(),
            duration: doc.attributes?.find(a => a.className === 'DocumentAttributeAudio')?.duration || 0
          };
        }
        
        // Файл
        const file = await this.client.downloadMedia(media);
        return {
          type: 'file',
          url: file ? URL.createObjectURL(new Blob([file])) : null,
          fileId: doc.id?.toString(),
          fileName: doc.attributes?.find(a => a.className === 'DocumentAttributeFilename')?.fileName || 'file',
          fileSize: doc.size
        };
      }
      
      return null;
    } catch (error) {
      console.error('Ошибка обработки медиа:', error);
      return null;
    }
  }

  // Обработка стикера
  async processSticker(sticker) {
    try {
      const file = await this.client.downloadMedia(sticker);
      return {
        id: sticker.id?.toString(),
        emoji: sticker.alt || '',
        isAnimated: sticker.mimeType?.includes('webm') || sticker.mimeType?.includes('tgs'),
        url: file ? URL.createObjectURL(new Blob([file])) : null
      };
    } catch (error) {
      return { id: sticker.id?.toString(), emoji: '🔵', isAnimated: false, url: null };
    }
  }

  // Отправка текстового сообщения
  async sendMessage(chatId, text) {
    try {
      await this.initialize();
      const entity = await this.client.getEntity(parseInt(chatId));
      const message = await this.client.sendMessage(entity, { message: text });
      return {
        id: message.id.toString(),
        text: message.message,
        timestamp: message.date.toISOString()
      };
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      throw error;
    }
  }

  // Отправка файла
  async sendFile(chatId, file, caption = '') {
    try {
      await this.initialize();
      const entity = await this.client.getEntity(parseInt(chatId));
      const message = await this.client.sendFile(entity, {
        file: file,
        caption: caption,
        forceDocument: false
      });
      return {
        id: message.id.toString(),
        timestamp: message.date.toISOString()
      };
    } catch (error) {
      console.error('Ошибка отправки файла:', error);
      throw error;
    }
  }

  // Отправка голосового сообщения
  async sendVoice(chatId, audioBlob, duration = 0) {
    try {
      await this.initialize();
      const entity = await this.client.getEntity(parseInt(chatId));
      
      // Конвертация в формат Ogg Opus (требуется на клиенте)
      const message = await this.client.sendFile(entity, {
        file: audioBlob,
        voiceNote: true,
        attributes: [
          {
            className: 'DocumentAttributeAudio',
            duration: duration,
            voice: true
          }
        ]
      });
      
      return {
        id: message.id.toString(),
        timestamp: message.date.toISOString()
      };
    } catch (error) {
      console.error('Ошибка отправки голосового:', error);
      throw error;
    }
  }

  // Прослушивание новых сообщений (Real-time)
  async listenForMessages(callback) {
    try {
      await this.initialize();
      
      this.client.addEventHandler((update) => {
        if (update.className === 'UpdateNewMessage') {
          callback(update.message);
        }
      }, { updates: ['newMessage'] });
      
    } catch (error) {
      console.error('Ошибка подписки на сообщения:', error);
    }
  }

  // Проверка статуса подключения
  getStatus() {
    return {
      isConnected: this.isConnected,
      currentUser: this.currentUser
    };
  }

  // Выход
  async disconnect() {
    if (this.client) {
      await this.client.disconnect();
      this.isConnected = false;
      this.currentUser = null;
    }
  }
}

export default TelegramService;
