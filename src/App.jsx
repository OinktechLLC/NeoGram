import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import ChatPage from './pages/ChatPage';
import ChannelsPage from './pages/ChannelsPage';
import DocsPage from './pages/DocsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import { BluetoothProvider } from './context/BluetoothContext';
import { Menu } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('chats');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'chats':
        return <ChatPage />;
      case 'channels':
        return <ChannelsPage />;
      case 'docs':
        return <DocsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'faq':
        return <FAQPage />;
      default:
        return <ChatPage />;
    }
  };

  return (
    <BluetoothProvider>
      <div className="flex h-screen bg-[#1c1c1d]">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-[#2c2c2e] rounded-full shadow-lg"
        >
          <Menu size={22} className="text-white" />
        </button>

        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-w-0 pb-16 lg:pb-0">
          <div className="h-full">
            {renderContent()}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </BluetoothProvider>
  );
}

export default App;
