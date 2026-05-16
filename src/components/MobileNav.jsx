import React from 'react';
import { MessageSquare, Radio, BookOpen } from 'lucide-react';

const MobileNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'chats', icon: MessageSquare, label: 'Чаты' },
    { id: 'channels', icon: Radio, label: 'Каналы' },
    { id: 'docs', icon: BookOpen, label: 'Документы' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1c1c1d] border-t border-[#38383a] safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                isActive ? 'text-[#007aff]' : 'text-[#8e8e93]'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
