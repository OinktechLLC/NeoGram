// Telegram API Service - Реальная интеграция с Telegram
// Для работы требуется backend-прокси (из-за CORS ограничений браузера)
// В продакшене используйте свой сервер для проксирования запросов

const TELEGRAM_API_BASE = 'https://api.telegram.org/bot';

class TelegramService {
  constructor(botToken) {
    this.botToken = botToken || import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    if (!this.botToken) {
      console.warn('Telegram Bot Token не найден. Используйте VITE_TELEGRAM_BOT_TOKEN в .env');
    }
    this.baseURL = TELEGRAM_API_BASE + this.botToken;
  }

  // Получение списка каналов через Telegram API
  async getChannels() {
    if (!this.botToken) {
      throw new Error('Telegram Bot Token не настроен. Добавьте VITE_TELEGRAM_BOT_TOKEN в .env файл');
    }

    try {
      // В реальном приложении здесь был бы запрос к вашему backend
      // который получает каналы через Telegram Client API (MTProto)
      // Пример: const response = await fetch('/api/telegram/channels');
      
      // Для демонстрации используем публичные каналы через TDLib или MTProto
      // Это список популярных русскоязычных каналов
      const channelUsernames = [
        'durov',
        'telegram',
        'breakingnews',
        'techcrunch',
        'natgeo',
        'rt_russian',
        'ria_ru',
        'tass_agency',
        'kommersant',
        'vedomosti'
      ];

      const channels = await Promise.all(
        channelUsernames.map(async (username) => {
          try {
            // Получаем информацию о канале через getChat
            const response = await fetch(`${this.baseURL}/getChat?chat_id=@${username}`);
            const data = await response.json();
            
            if (data.ok) {
              const chat = data.result;
              return {
                id: chat.id,
                title: chat.title,
                username: chat.username,
                photo: chat.photo?.big_file_id 
                  ? `https://api.telegram.org/file/bot${this.botToken}/${chat.photo.big_file_id}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.title)}&background=3b82f6&color=fff&size=128`,
                subscribers: chat.members_count ? this.formatCount(chat.members_count) : 'N/A',
                description: chat.description || '',
                type: chat.type
              };
            }
            return null;
          } catch (error) {
            console.error(`Ошибка получения канала @${username}:`, error);
            return null;
          }
        })
      );

      return channels.filter(channel => channel !== null);
    } catch (error) {
      console.error('Ошибка загрузки каналов:', error);
      throw error;
    }
  }

  // Получение постов канала через Telegram API
  async getChannelPosts(channelId, limit = 20) {
    if (!this.botToken) {
      throw new Error('Telegram Bot Token не настроен');
    }

    try {
      // В реальном приложении используется MTProto API для получения истории сообщений
      // Bot API имеет ограничения - бот должен быть админом канала
      // Поэтому здесь мы используем подход с получением последних сообщений
      
      const response = await fetch(`${this.baseURL}/getChatHistory?chat_id=${channelId}&limit=${limit}`);
      const data = await response.json();
      
      if (data.ok && data.result.messages) {
        return data.result.messages.map(msg => this.parseMessage(msg, channelId));
      }

      // Альтернативный подход - парсинг через web preview (для публичных каналов)
      // В продакшене используйте TDLib или MadelineProto
      return await this.getPostsFromWebPreview(channelId, limit);
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
      // Fallback к web preview для публичных каналов
      return await this.getPostsFromWebPreview(channelId, limit);
    }
  }

  // Парсинг сообщения Telegram в наш формат
  parseMessage(msg, channelId) {
    const post = {
      id: msg.message_id,
      channelId: channelId,
      text: msg.text || msg.caption || '',
      date: new Date(msg.date * 1000).toISOString(),
      views: msg.views || 0,
      forwards: msg.forwards || 0,
      stickers: [],
      media: null,
      author: msg.author_signature || 'Admin'
    };

    // Обработка стикеров
    if (msg.sticker) {
      post.stickers.push({
        id: msg.sticker.file_id,
        emoji: msg.sticker.emoji,
        isAnimated: msg.sticker.is_animated,
        isVideo: msg.sticker.is_video,
        url: `https://api.telegram.org/file/bot${this.botToken}/${msg.sticker.file_id}`
      });
    }

    // Обработка анимаций (анимированные стикеры)
    if (msg.animation) {
      post.media = {
        type: 'animation',
        url: `https://api.telegram.org/file/bot${this.botToken}/${msg.animation.file_id}`,
        thumbnail: msg.animation.thumbnail 
          ? `https://api.telegram.org/file/bot${this.botToken}/${msg.animation.thumbnail.file_id}`
          : null
      };
    }

    // Обработка фото
    if (msg.photo && msg.photo.length > 0) {
      const photo = msg.photo[msg.photo.length - 1]; // Берём фото наилучшего качества
      post.media = {
        type: 'photo',
        url: `https://api.telegram.org/file/bot${this.botToken}/${photo.file_id}`
      };
    }

    // Обработка видео
    if (msg.video) {
      post.media = {
        type: 'video',
        url: `https://api.telegram.org/file/bot${this.botToken}/${msg.video.file_id}`,
        thumbnail: msg.video.thumbnail
          ? `https://api.telegram.org/file/bot${this.botToken}/${msg.video.thumbnail.file_id}`
          : null
      };
    }

    return post;
  }

  // Получение постов через web preview (для публичных каналов)
  async getPostsFromWebPreview(channelId, limit) {
    // В реальном приложении здесь был бы парсинг t.me/username
    // Через ваш backend сервер
    console.log('Используется fallback метод для получения постов');
    
    // Возвращаем пустой массив или кэшированные данные
    return [];
  }

  // Получение стикерпака
  async getStickerPack(stickerSetId) {
    if (!this.botToken) {
      throw new Error('Telegram Bot Token не настроен');
    }

    try {
      const response = await fetch(`${this.baseURL}/getStickerSet?name=${stickerSetId}`);
      const data = await response.json();
      
      if (data.ok) {
        const stickerSet = data.result;
        return {
          id: stickerSet.name,
          name: stickerSet.title,
          stickers: stickerSet.stickers.map(sticker => ({
            id: sticker.file_id,
            emoji: sticker.emoji,
            isAnimated: sticker.is_animated,
            isVideo: sticker.is_video,
            url: `https://api.telegram.org/file/bot${this.botToken}/${sticker.file_id}`,
            thumbnail: sticker.thumbnail
              ? `https://api.telegram.org/file/bot${this.botToken}/${sticker.thumbnail.file_id}`
              : null
          }))
        };
      }
      throw new Error('Стикерпак не найден');
    } catch (error) {
      console.error('Ошибка получения стикерпака:', error);
      throw error;
    }
  }

  // Загрузка файла из Telegram
  async downloadFile(fileId) {
    if (!this.botToken) {
      throw new Error('Telegram Bot Token не настроен');
    }

    try {
      const response = await fetch(`${this.baseURL}/getFile?file_id=${fileId}`);
      const data = await response.json();
      
      if (data.ok) {
        const filePath = data.result.file_path;
        return `https://api.telegram.org/file/bot${this.botToken}/${filePath}`;
      }
      throw new Error('Файл не найден');
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      throw error;
    }
  }

  // Форматирование числа подписчиков
  formatCount(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }
}

export default TelegramService;
