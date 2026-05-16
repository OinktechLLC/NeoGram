import React from 'react';

const TermsPage = () => {
  return (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      <div className="telegram-header border-b border-[#38383a] p-4 pt-12 lg:pt-4">
        <h1 className="text-[20px] font-semibold text-white">Условия использования</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-6 text-[15px] text-white">
          <p className="text-[#8e8e93] text-[13px]">Вступает в силу: Январь 2026 года</p>
          
          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">1. Принятие условий</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Добро пожаловать в NeoGram! Используя наше приложение, вы соглашаетесь с настоящими Условиями использования. 
              Если вы не согласны с какими-либо положениями этих Условий, пожалуйста, воздержитесь от использования приложения.
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Мы оставляем за собой право изменять эти Условия в любое время. Продолжение использования приложения после внесения изменений 
              означает ваше согласие с обновленными Условиями.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">2. Описание сервиса</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              NeoGram — это мессенджер, который предоставляет следующие возможности:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Обмен сообщениями через Bluetooth между устройствами без интернета</li>
              <li>Интеграция с Telegram для чтения публичных каналов</li>
              <li>Поддержка стикеров и анимированных стикерпаков</li>
              <li>Передача медиафайлов (фото, видео, документы)</li>
              <li>Создание и управление чатами</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">3. Требования к использованию</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Для использования NeoGram вы должны:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Быть старше 13 лет (или достигнуть возраста согласия в вашей стране)</li>
              <li>Иметь устройство с поддержкой Bluetooth</li>
              <li>Иметь действующий аккаунт Telegram для использования функций интеграции</li>
              <li>Предоставить точную и актуальную информацию при регистрации</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">4. Правила поведения</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              При использовании NeoGram вы обязуетесь НЕ:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Использовать приложение для незаконной деятельности или распространения незаконного контента</li>
              <li>Рассылать спам, рекламные сообщения или нежелательные рассылки</li>
              <li>Выдавать себя за другое лицо или организацию</li>
              <li>Распространять вредоносное ПО, вирусы или любой код, способный нанести ущерб</li>
              <li>Нарушать права других пользователей, включая авторские права и права на конфиденциальность</li>
              <li>Использовать приложение для harassment, угроз или запугивания других лиц</li>
              <li>Публиковать контент, содержащий ненависть, дискриминацию или призывы к насилию</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">5. Интеграция с Telegram</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Использование функций интеграции с Telegram регулируется дополнительными условиями:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Вы обязаны соблюдать Условия использования Telegram</li>
              <li>Для работы интеграции требуется собственный Bot Token от @BotFather</li>
              <li>Вы несете ответственность за безопасность вашего Bot Token</li>
              <li>NeoGram не несет ответственности за действия Telegram или изменения в их API</li>
              <li>Доступ к каналам ограничен только публичными каналами</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">6. Bluetooth-соединение</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              При использовании Bluetooth-функций:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Вы несете ответственность за включение Bluetooth на вашем устройстве</li>
              <li>Радиус действия Bluetooth ограничен (~10 метров без препятствий)</li>
              <li>Качество соединения зависит от условий окружающей среды</li>
              <li>NeoGram не гарантирует бесперебойную работу Bluetooth-соединения</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">7. Интеллектуальная собственность</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Все права на приложение NeoGram, включая код, дизайн, логотипы и контент, принадлежат разработчикам приложения.
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Вам предоставляется ограниченная, неисключительная, непередаваемая лицензия на использование приложения 
              в личных некоммерческих целях.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">8. Отказ от гарантий</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              NeoGram предоставляется «как есть» без каких-либо явных или подразумеваемых гарантий.
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Мы не гарантируем, что приложение будет:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Бесперебойным, своевременным или безошибочным</li>
              <li>Соответствовать вашим ожиданиям</li>
              <li>Работать на всех устройствах одинаково</li>
              <li>Быть защищенным от всех возможных угроз безопасности</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">9. Ограничение ответственности</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              В максимальной степени, разрешенной законом, NeoGram и его разработчики не несут ответственности за:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Любые прямые, косвенные, случайные или последующие убытки</li>
              <li>Потерю данных, сообщений или другой информации</li>
              <li>Проблемы, вызванные использованием Bluetooth или интеграции с Telegram</li>
              <li>Действия третьих лиц или утечки данных по вашей вине</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">10. Прекращение доступа</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Мы оставляем за собой право приостановить или прекратить ваш доступ к приложению в случае:
            </p>
            <ul className="list-disc list-inside text-[#ffffff]/80 leading-relaxed mt-2 space-y-1 ml-4">
              <li>Нарушения настоящих Условий использования</li>
              <li>Подозрения в мошеннической или незаконной деятельности</li>
              <li>Технической необходимости или обновления приложения</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">11. Сторонние сервисы</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              NeoGram может содержать ссылки или интеграцию со сторонними сервисами (Telegram, облачные хранилища и т.д.).
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Мы не контролируем эти сервисы и не несем ответственности за их содержание, политику конфиденциальности 
              или практики использования данных.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">12. Разрешение споров</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Любые споры, связанные с использованием NeoGram, должны решаться путем переговоров.
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Если спор не может быть разрешен мирным путем, он подлежит рассмотрению в соответствии с 
              законодательством страны вашего проживания.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">13. Контакты</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              По вопросам, связанным с настоящими Условиями использования, пожалуйста, свяжитесь с нами 
              через раздел «Помощь» в приложении.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-white mb-3">14. Заключительные положения</h2>
            <p className="text-[#ffffff]/80 leading-relaxed">
              Если какое-либо положение настоящих Условий будет признано недействительным, 
              остальные положения сохранят свою силу.
            </p>
            <p className="text-[#ffffff]/80 leading-relaxed mt-3">
              Наши права и обязательства по настоящим Условиям не могут быть переданы третьим лицам без вашего согласия.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
