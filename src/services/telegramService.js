// Telegram API Service - Заглушка для браузерной версии
// Реальная интеграция через MTProto требует Node.js окружения
// Для продакшена используйте бэкенд-прокси для Telegram API

class TelegramService {
  constructor() {
    this.isConnected = false;
    this.currentUser = null;
    this.mockChannels = [
      {
        id: '1',
        title: 'Telegram News',
        username: 'telegram',
        photo: 'https://ui-avatars.com/api/?name=Telegram+News&background=0088cc&color=fff&size=128',
        type: 'channel',
        subscribers: 2500000,
        description: 'Official Telegram news channel',
        unreadCount: 5
      },
      {
        id: '2',
        title: 'Tech Updates',
        username: 'techupdates',
        photo: 'https://ui-avatars.com/api/?name=Tech+Updates&background=3b82f6&color=fff&size=128',
        type: 'channel',
        subscribers: 150000,
        description: 'Latest technology news and updates',
        unreadCount: 12
      },
      {
        id: '3',
        title: 'Design Inspiration',
        username: 'designinspo',
        photo: 'https://ui-avatars.com/api/?name=Design+Inspiration&background=8b5cf6&color=fff&size=128',
        type: 'channel',
        subscribers: 89000,
        description: 'Daily design inspiration and resources',
        unreadCount: 3
      }
    ];
    this.mockPosts = {
      '1': [
        {
          id: '101',
          channelId: '1',
          text: 'Welcome to Telegram News! Stay tuned for updates.',
          date: new Date().toISOString(),
          views: 125000,
          forwards: 5200,
          author: 'Admin',
          stickers: [],
          media: null
        },
        {
          id: '102',
          channelId: '1',
          text: 'New features coming soon! 🚀',
          date: new Date(Date.now() - 3600000).toISOString(),
          views: 98000,
          forwards: 3100,
          author: 'Admin',
          stickers: [],
          media: null
        }
      ],
      '2': [
        {
          id: '201',
          channelId: '2',
          text: 'AI breakthrough: New model achieves human-level performance!',
          date: new Date().toISOString(),
          views: 45000,
          forwards: 1200,
          author: 'Editor',
          stickers: [],
          media: null
        }
      ],
      '3': [
        {
          id: '301',
          channelId: '3',
          text: 'Beautiful UI design trends for 2026 ✨',
          date: new Date().toISOString(),
          views: 23000,
          forwards: 890,
          author: 'Designer',
          stickers: [],
          media: null
        }
      ]
    };
  }

  // Инициализация клиента (заглушка)
  async initialize() {
    console.log('TelegramService: Using mock mode (browser-compatible)');
    this.isConnected = true;
    return this;
  }

  // Запрос номера телефона (заглушка)
  async promptPhoneNumber() {
    throw new Error('Phone authentication not available in mock mode');
  }

  // Запрос кода подтверждения (заглушка)
  async promptPhoneCode() {
    throw new Error('Code authentication not available in mock mode');
  }

  // Запрос пароля (заглушка)
  async promptPassword() {
    throw new Error('Password authentication not available in mock mode');
  }

  // Получение списка каналов/чатов (моковые данные)
  async getChannels() {
    try {
      await this.initialize();
      return this.mockChannels;
    } catch (error) {
      console.error('Ошибка загрузки каналов:', error);
      throw error;
    }
  }

  // Получение фото профиля (заглушка)
  async getEntityPhoto(entity) {
    return entity.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(entity.title || 'U')}&background=3b82f6&color=fff&size=128`;
  }

  // Получение постов канала (моковые данные)
  async getChannelPosts(channelId, limit = 50) {
    try {
      await this.initialize();
      const posts = this.mockPosts[channelId] || [];
      return posts.slice(0, limit);
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
      throw error;
    }
  }

  // Обработка медиа контента (заглушка)
  async processMedia(media) {
    return null;
  }

  // Обработка стикера (заглушка)
  async processSticker(sticker) {
    return { id: '1', emoji: '🔵', isAnimated: false, url: null };
  }

  // Отправка текстового сообщения (заглушка)
  async sendMessage(chatId, text) {
    try {
      await this.initialize();
      return {
        id: Date.now().toString(),
        text: text,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      throw error;
    }
  }

  // Отправка файла (заглушка)
  async sendFile(chatId, file, caption = '') {
    try {
      await this.initialize();
      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Ошибка отправки файла:', error);
      throw error;
    }
  }

  // Отправка голосового сообщения (заглушка)
  async sendVoice(chatId, audioBlob, duration = 0) {
    try {
      await this.initialize();
      return {
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Ошибка отправки голосового:', error);
      throw error;
    }
  }

  // Прослушивание новых сообщений (заглушка)
  async listenForMessages(callback) {
    console.log('Message listener registered (mock mode)');
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
    this.isConnected = false;
    this.currentUser = null;
  }
}

export default TelegramService;
