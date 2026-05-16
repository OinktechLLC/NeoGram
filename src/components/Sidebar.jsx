import React, { useState } from 'react';
import { 
  Bluetooth, 
  Search, 
  Plus, 
  Menu,
  X,
  Radio,
  MessageSquare,
  FileText,
  Shield,
  HelpCircle
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const menuItems = [
    { id: 'chats', icon: MessageSquare, label: 'Chats' },
    { id: 'channels', icon: Radio, label: 'Channels' },
    { id: 'docs', icon: FileText, label: 'Docs' },
    { id: 'privacy', icon: Shield, label: 'Privacy Policy' },
    { id: 'terms', icon: FileText, label: 'Terms of Service' },
    { id: 'faq', icon: HelpCircle, label: 'FAQ' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative left-0 top-0 h-full w-[280px] bg-[#1c1c1d] border-r border-[#38383a] z-50 lg:translate-x-0 lg:z-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-[#38383a]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#007aff] p-2.5 rounded-full">
                  <Bluetooth size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">
                    NeoGram
                  </h1>
                  <p className="text-xs text-[#8e8e93]">
                    Bluetooth Messenger
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} className="text-[#8e8e93]" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8e8e93]" 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-[#2c2c2e] border border-[#38383a] rounded-full py-2 pl-10 pr-4 text-white placeholder-[#8e8e93] focus:outline-none focus:border-[#007aff] transition-colors text-[15px]"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <div className="space-y-0.5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-[#007aff] text-white'
                      : 'text-white hover:bg-[#2c2c2e]'
                  }`}
                >
                  <item.icon size={22} />
                  <span className="font-medium text-[15px]">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-[#38383a]">
            <button
              className="w-full flex items-center justify-center gap-2 bg-[#007aff] hover:bg-[#0066d6] text-white py-2.5 rounded-xl font-medium transition-all"
            >
              <Plus size={20} />
              New Chat
            </button>
            
            <p className="text-center text-xs text-[#8e8e93] mt-3">
              v2.0.26
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
