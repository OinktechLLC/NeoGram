import React from 'react';
import { FileText, Book, Code } from 'lucide-react';

const DocsPage = () => {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl">
              <Book size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neogram-text">Documentation</h1>
              <p className="text-neogram-muted">NeoGram Developer Guide</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* Getting Started */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4 flex items-center gap-2">
              <FileText size={20} className="text-neogram-primary" />
              Getting Started
            </h2>
            <div className="text-neogram-muted space-y-3">
              <p>
                NeoGram is a next-generation messaging application that leverages Bluetooth technology 
                for peer-to-peer communication without requiring internet connectivity.
              </p>
              
              <h3 className="text-neogram-text font-medium mt-4">Key Features:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Bluetooth-based messaging (no internet required)</li>
                <li>Telegram channel integration</li>
                <li>Modern UI inspired by Telegram 2026</li>
                <li>End-to-end encryption support</li>
                <li>Cross-platform compatibility</li>
              </ul>
            </div>
          </section>

          {/* Installation */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4 flex items-center gap-2">
              <Code size={20} className="text-neogram-primary" />
              Installation
            </h2>
            <div className="space-y-4">
              <p className="text-neogram-muted">Clone the repository and install dependencies:</p>
              <div className="bg-neogram-secondary rounded-xl p-4 overflow-x-auto">
                <code className="text-sm text-neogram-text">
                  <pre>{`git clone https://github.com/yourusername/NeoGram.git
cd NeoGram
npm install
npm run dev`}</pre>
                </code>
              </div>
            </div>
          </section>

          {/* Bluetooth API */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Web Bluetooth API</h2>
            <div className="text-neogram-muted space-y-3">
              <p>
                NeoGram uses the Web Bluetooth API to enable device-to-device communication.
                This requires a browser with Bluetooth support (Chrome, Edge, or Opera).
              </p>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-sm text-blue-400">
                  ⚠️ Note: Web Bluetooth API requires HTTPS in production environments.
                </p>
              </div>
            </div>
          </section>

          {/* Telegram Integration */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Telegram Integration</h2>
            <div className="text-neogram-muted space-y-3">
              <p>
                The Channels feature integrates with Telegram's public channels API to display
                posts without requiring a VPN connection.
              </p>
              <p>
                To use this feature in production, you'll need to set up a Telegram Bot Token
                and configure the backend proxy.
              </p>
            </div>
          </section>

          {/* Environment Variables */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Environment Variables</h2>
            <div className="bg-neogram-secondary rounded-xl p-4 overflow-x-auto">
              <code className="text-sm text-neogram-text">
                <pre>{`VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_API_URL=https://api.neogram.app`}</pre>
              </code>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
