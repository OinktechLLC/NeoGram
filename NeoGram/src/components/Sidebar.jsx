import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bluetooth, 
  Search, 
  Plus, 
  Settings, 
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        className={`fixed lg:relative left-0 top-0 h-full w-80 glass-effect border-r border-neogram-border z-50 lg:translate-x-0 lg:z-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-neogram-border">
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl">
                  <Bluetooth size={28} className="text-white bluetooth-icon" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neogram-text">
                    NeoGram
                  </h1>
                  <p className="text-xs text-neogram-muted">
                    Bluetooth Messenger 2026
                  </p>
                </div>
              </motion.div>
              
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-neogram-secondary rounded-full transition-colors"
              >
                <X size={20} className="text-neogram-muted" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neogram-muted" 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-neogram-secondary border border-neogram-border rounded-xl py-2.5 pl-10 pr-4 text-neogram-text placeholder-neogram-muted focus:outline-none focus:border-neogram-primary transition-colors"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-neogram-primary text-white shadow-lg shadow-blue-500/30'
                      : 'text-neogram-muted hover:bg-neogram-secondary hover:text-neogram-text'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-neogram-border">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30"
            >
              <Plus size={20} />
              New Chat
            </motion.button>
            
            <p className="text-center text-xs text-neogram-muted mt-3">
              v2.0.26 • Production Ready
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
