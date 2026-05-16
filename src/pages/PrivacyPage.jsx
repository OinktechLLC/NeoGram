import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      <div className="telegram-header border-b border-[#38383a] p-4 pt-12 lg:pt-4">
        <h1 className="text-[20px] font-semibold text-white">Политика конфиденциальности</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-6 text-[15px] text-white">
          <p className="text-[#8e8e93] text-[13px]">Последнее обновление: Январь 2026 года</p>
          
          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">1. Введение</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Добро пожаловать в NeoGram — мессенджер нового поколения, работающий через Bluetooth и интеграцию с Telegram. 
              Мы серьезно относимся к вашей конфиденциальности и стремимся обеспечить максимальную защиту ваших данных.
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Настоящая Политика конфиденциальности описывает, какие данные мы собираем, как мы их используем и защищаем.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">2. Сбор данных</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              NeoGram собирает минимальный объем данных, необходимых для функционирования приложения:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Информация об устройстве (модель, версия ОС) для обеспечения совместимости Bluetooth</li>
              <li>Технические данные о подключении для установления соединения между устройствами</li>
              <li>Telegram ID (при использовании интеграции с Telegram)</li>
            </ul>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              <strong className="text-white">Важно:</strong> Сообщения, передаваемые через Bluetooth, не хранятся на наших серверах 
              и остаются исключительно на ваших устройствах.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">3. Использование данных</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Собранные данные используются исключительно для:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Обеспечения работы Bluetooth-соединения между устройствами</li>
              <li>Синхронизации с вашим аккаунтом Telegram (при использовании данной функции)</li>
              <li>Улучшения производительности и стабильности приложения</li>
              <li>Предоставления технической поддержки при необходимости</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">4. Хранение данных</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Все личные сообщения и медиафайлы хранятся локально на вашем устройстве. 
              Мы не сохраняем содержимое ваших переписок на наших серверах.
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Данные интеграции с Telegram (список каналов, контакты) кэшируются локально для ускорения работы приложения 
              и могут быть очищены в любой момент через настройки приложения.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">5. Безопасность данных</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Мы применяем современные стандарты безопасности для защиты ваших данных:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Все Bluetooth-соединения используют шифрование по стандарту Bluetooth Secure Simple Pairing</li>
              <li>Интеграция с Telegram использует официальные API с端到端 шифрованием</li>
              <li>Регулярные обновления безопасности и аудит кода</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">6. Передача данных третьим лицам</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              NeoGram не продает, не сдает в аренду и не передает ваши персональные данные третьим лицам.
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Исключения возможны только в случаях, предусмотренных законодательством, или с вашего явного согласия.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">7. Интеграция с Telegram</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              При использовании функций интеграции с Telegram:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Мы получаем доступ только к публичным каналам, на которые вы подписаны</li>
              <li>Для работы требуется ваш личный Bot Token от @BotFather</li>
              <li>Token хранится только локально на вашем устройстве</li>
              <li>Мы не имеем доступа к вашим личным чатам и перепискам в Telegram</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">8. Права пользователей</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Вы имеете право:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Доступа к своим данным в любой момент</li>
              <li>Исправления неточной информации</li>
              <li>Удаления всех своих данных из приложения</li>
              <li>Отзыва согласия на обработку данных</li>
              <li>Переноса данных в другую систему</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">9. Cookies и отслеживание</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              NeoGram не использует cookies, пиксели отслеживания или другие технологии отслеживания поведения пользователей.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">10. Изменения в политике</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Мы можем обновлять настоящую Политику конфиденциальности время от времени. 
              О любых существенных изменениях мы уведомим вас через приложение или по электронной почте.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">11. Контакты</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Если у вас возникли вопросы относительно настоящей Политики конфиденциальности, 
              пожалуйста, свяжитесь с нами через раздел «Помощь» в приложении.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">12. Применимое право</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Настоящая Политика регулируется законодательством о защите персональных данных. 
              Все споры разрешаются в соответствии с действующим законодательством.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
