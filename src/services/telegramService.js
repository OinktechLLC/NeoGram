// Telegram API Service - Реальная интеграция через MTProto
// Использует библиотеку telegram для прямого подключения к Telegram API

import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';
import { Api } from 'telegram/tl';
import bigInt from 'big-integer';

class TelegramService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.currentUser = null;
    this.session = new StringSession(''); // Сессия хранится в памяти
    this.apiId = 611335; // Официальный API ID Telegram Desktop
    this.apiHash = 'db5c1cc201ae4b97e8cbf63474ef60f0'; // Официальный API Hash
    this.messageListeners = [];
    this.currentChatId = null;
  }

  // Инициализация клиента
  async initialize() {
    if (this.client && this.isConnected) {
      return this;
    }

    this.client = new TelegramClient(new StringSession(''), this.apiId, this.apiHash, {
      connectionRetries: 5,
      useWSS: true,
      autoReconnect: true,
    });

    await this.client.start({
      phoneNumber: async () => await input.text("Please enter your number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () => await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });

    this.isConnected = true;
    this.currentUser = await this.client.getMe();
    
    // Запускаем прослушивание сообщений
    this.listenForMessagesInternal();
    
    return this;
  }

  // Вход по номеру телефона
  async promptPhoneNumber() {
    await this.initialize();
    return this.currentUser;
  }

  // Получение списка каналов/чатов
  async getChannels() {
    try {
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const dialogs = await this.client.getDialogs({ limit: 100 });
      const channels = [];
      
      for (const dialog of dialogs) {
        const entity = dialog.entity;
        const isChannel = entity.className === 'Channel' || entity.className === 'ChannelFull';
        const isBroadcast = entity.broadcast === true;
        
        if (isChannel || isBroadcast) {
          let photoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(entity.title || 'Channel')}&background=3b82f6&color=fff&size=128`;
          
          try {
            if (entity.photo) {
              const photo = await this.client.downloadProfilePhoto(entity, { isBig: false });
              if (photo) {
                photoUrl = URL.createObjectURL(new Blob([photo]));
              }
            }
          } catch (e) {
            console.log('Не удалось получить фото:', e);
          }
          
          channels.push({
            id: entity.id.toString(),
            title: entity.title || 'Без названия',
            username: entity.username || null,
            photo: photoUrl,
            type: 'channel',
            subscribers: entity.participantsCount || 0,
            description: entity.about || '',
            unreadCount: dialog.unreadCount || 0,
            entity: entity
          });
        }
      }
      
      return channels;
    } catch (error) {
      console.error('Ошибка загрузки каналов:', error);
      throw error;
    }
  }

  // Получение постов канала
  async getChannelPosts(channelId, limit = 50) {
    try {
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const entity = await this.client.getEntity(parseInt(channelId));
      const messages = await this.client.getMessages(entity, { limit });
      const posts = [];
      
      for (const msg of messages) {
        if (!msg.message && !msg.media && !msg.stickers) continue;
        
        let mediaInfo = null;
        if (msg.media) {
          mediaInfo = await this.processMedia(msg.media, msg);
        }
        
        let stickersInfo = [];
        if (msg.stickers) {
          for (const sticker of msg.stickers) {
            const processed = await this.processSticker(sticker);
            if (processed) stickersInfo.push(processed);
          }
        }
        
        posts.push({
          id: msg.id.toString(),
          channelId: channelId,
          text: msg.message || '',
          date: msg.date.toISOString(),
          views: msg.views || 0,
          forwards: msg.forwards || 0,
          author: msg.postAuthor || entity.title || 'Admin',
          stickers: stickersInfo,
          media: mediaInfo,
          rawMessage: msg
        });
      }
      
      return posts;
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
      throw error;
    }
  }

  // Обработка медиа контента
  async processMedia(media, message) {
    try {
      if (media.className === 'MessageMediaPhoto') {
        const photo = await this.client.downloadMedia(media);
        return {
          type: 'photo',
          url: photo ? URL.createObjectURL(new Blob([photo])) : null,
          thumbnail: null
        };
      }
      
      if (media.className === 'MessageMediaDocument') {
        const doc = media.document;
        if (doc.mimeType?.startsWith('video/')) {
          const video = await this.client.downloadMedia(media);
          return {
            type: 'video',
            url: video ? URL.createObjectURL(new Blob([video])) : null,
            thumbnail: null,
            duration: doc.attributes?.find(a => a.className === 'DocumentAttributeVideo')?.duration || 0
          };
        }
        
        if (doc.mimeType?.startsWith('audio/')) {
          const audio = await this.client.downloadMedia(media);
          const duration = doc.attributes?.find(a => a.className === 'DocumentAttributeAudio')?.duration || 0;
          const isVoice = doc.attributes?.some(a => a.className === 'DocumentAttributeAudio' && a.voice) || false;
          
          return {
            type: isVoice ? 'voice' : 'audio',
            url: audio ? URL.createObjectURL(new Blob([audio])) : null,
            duration: duration,
            fileName: doc.attributes?.find(a => a.fileName)?.fileName || 'audio.ogg'
          };
        }
        
        if (doc.mimeType?.startsWith('image/') || doc.className === 'DocumentAttributeAnimated') {
          const file = await this.client.downloadMedia(media);
          return {
            type: doc.className === 'DocumentAttributeAnimated' ? 'animation' : 'photo',
            url: file ? URL.createObjectURL(new Blob([file])) : null,
            thumbnail: null
          };
        }
        
        // Обычный файл
        const file = await this.client.downloadMedia(media);
        return {
          type: 'file',
          url: file ? URL.createObjectURL(new Blob([file])) : null,
          fileName: doc.attributes?.find(a => a.fileName)?.fileName || 'file',
          fileSize: doc.size || 0,
          mimeType: doc.mimeType
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
      if (!sticker) return null;
      
      const isAnimated = sticker.className === 'DocumentAttributeAnimated' || sticker.mimeType === 'application/x-tgsticker';
      const isVideo = sticker.mimeType === 'video/webm';
      
      let emoji = '🔵';
      if (sticker.alt) {
        emoji = sticker.alt;
      }
      
      let url = null;
      if (sticker.id) {
        try {
          const doc = await this.client.downloadMedia(sticker);
          if (doc) {
            url = URL.createObjectURL(new Blob([doc]));
          }
        } catch (e) {
          console.log('Не удалось скачать стикер:', e);
        }
      }
      
      return {
        id: sticker.id?.toString() || '1',
        emoji,
        isAnimated,
        isVideo,
        url
      };
    } catch (error) {
      console.error('Ошибка обработки стикера:', error);
      return { id: '1', emoji: '🔵', isAnimated: false, isVideo: false, url: null };
    }
  }

  // Отправка текстового сообщения
  async sendMessage(chatId, text) {
    try {
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const entity = await this.client.getEntity(parseInt(chatId));
      const message = await this.client.sendMessage(entity, { message: text });
      
      return {
        id: message.id.toString(),
        text: text,
        timestamp: message.date.toISOString(),
        isOwn: true
      };
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      throw error;
    }
  }

  // Отправка файла
  async sendFile(chatId, file, caption = '') {
    try {
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const entity = await this.client.getEntity(parseInt(chatId));
      
      // Конвертируем File в ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      let media;
      if (file.type.startsWith('image/')) {
        media = new Api.InputMediaUploadedPhoto({
          file: await this.client.uploadFile({ blob: buffer, name: file.name }),
          caption: caption
        });
      } else if (file.type.startsWith('video/')) {
        media = new Api.InputMediaUploadedDocument({
          file: await this.client.uploadFile({ blob: buffer, name: file.name }),
          mimeType: file.type,
          attributes: [new Api.DocumentAttributeVideo({ duration: 0, w: 0, h: 0 })],
          caption: caption
        });
      } else if (file.type.startsWith('audio/')) {
        media = new Api.InputMediaUploadedDocument({
          file: await this.client.uploadFile({ blob: buffer, name: file.name }),
          mimeType: file.type,
          attributes: [new Api.DocumentAttributeAudio({ duration: 0, voice: false })],
          caption: caption
        });
      } else {
        media = new Api.InputMediaUploadedDocument({
          file: await this.client.uploadFile({ blob: buffer, name: file.name }),
          mimeType: file.type || 'application/octet-stream',
          attributes: [],
          caption: caption
        });
      }
      
      const message = await this.client.sendMessage(entity, { media });
      
      return {
        id: message.id.toString(),
        timestamp: message.date.toISOString(),
        isOwn: true
      };
    } catch (error) {
      console.error('Ошибка отправки файла:', error);
      throw error;
    }
  }

  // Отправка голосового сообщения
  async sendVoice(chatId, audioBlob, duration = 0) {
    try {
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const entity = await this.client.getEntity(parseInt(chatId));
      
      // Конвертируем Blob в ArrayBuffer
      const arrayBuffer = await audioBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const media = new Api.InputMediaUploadedDocument({
        file: await this.client.uploadFile({ blob: buffer, name: 'voice.ogg' }),
        mimeType: 'audio/ogg; codecs=opus',
        attributes: [new Api.DocumentAttributeAudio({ duration, voice: true })]
      });
      
      const message = await this.client.sendMessage(entity, { media });
      
      return {
        id: message.id.toString(),
        timestamp: message.date.toISOString(),
        isOwn: true
      };
    } catch (error) {
      console.error('Ошибка отправки голосового:', error);
      throw error;
    }
  }

  // Прослушивание новых сообщений (внутренний метод)
  listenForMessagesInternal() {
    this.client.addEventHandler((update) => {
      if (update.className === 'UpdateNewMessage' || update.className === 'UpdateNewChannelMessage') {
        const message = update.message;
        
        // Пропускаем свои сообщения
        if (message.out) return;
        
        this.messageListeners.forEach(callback => {
          callback({
            id: message.id.toString(),
            chatId: message.peerId?.userId?.toString() || message.peerId?.channelId?.toString(),
            text: message.message || '',
            timestamp: message.date.toISOString(),
            isOwn: false,
            rawMessage: message
          });
        });
      }
    }, new Api.UpdateNewMessage());
  }

  // Публичный метод для прослушивания сообщений
  async listenForMessages(callback) {
    this.messageListeners.push(callback);
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
