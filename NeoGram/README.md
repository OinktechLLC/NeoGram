# NeoGram - Bluetooth Messenger 2026 🚀

<div align="center">

![NeoGram Logo](https://img.shields.io/badge/NeoGram-Bluetooth_Messenger-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.26-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

**Next-generation messaging application with Bluetooth connectivity and Telegram channel integration**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Documentation](#documentation) • [FAQ](#faq)

</div>

---

## 📱 About NeoGram

NeoGram is a cutting-edge messaging application inspired by Telegram's 2026 design language. Our unique feature is **Bluetooth-based messaging** that allows users to communicate without internet connectivity, perfect for areas with limited connectivity or during network outages.

### Key Features

🔵 **Bluetooth Messaging**
- Peer-to-peer communication via Web Bluetooth API
- No internet required for core messaging
- End-to-end encrypted direct connections
- Range up to 100 meters with Bluetooth 5.0+

📡 **Telegram Channels Integration**
- Access popular Telegram channels without VPN
- Real-time post synchronization
- Full support for stickers, media, and reactions
- Beautiful Telegram-style post rendering

🎨 **Modern UI/UX**
- Telegram 2026 inspired design
- Dark mode optimized interface
- Smooth animations with Framer Motion
- Responsive design for all devices

🔒 **Privacy First**
- Messages stored locally only
- No server-side message storage
- Minimal data collection
- Transparent privacy policy

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser with Web Bluetooth API support (Chrome, Edge, Opera)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/NeoGram.git
cd NeoGram

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_API_URL=https://api.neogram.app
```

---

## 💻 Usage

### Bluetooth Messaging

1. Open NeoGram in two browsers on different devices
2. Ensure Bluetooth is enabled on both devices
3. Click "Scan Devices" to find nearby devices
4. Select the device you want to connect to
5. Start messaging!

### Telegram Channels

1. Navigate to the "Channels" tab
2. Browse available public Telegram channels
3. Click on any channel to view posts
4. Posts are displayed with full media support

---

## 📁 Project Structure

```
NeoGram/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── MessageInput.jsx
│   │   ├── ChannelCard.jsx
│   │   └── ChannelPost.jsx
│   ├── pages/               # Page components
│   │   ├── ChatPage.jsx
│   │   ├── ChannelsPage.jsx
│   │   ├── DocsPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   ├── TermsPage.jsx
│   │   └── FAQPage.jsx
│   ├── context/             # React Context providers
│   │   └── BluetoothContext.jsx
│   ├── services/            # API services
│   │   └── telegramService.js
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── docs/                    # Documentation files
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Bluetooth:** Web Bluetooth API
- **Routing:** React Router DOM

---

## 📖 Documentation

### API Reference

#### Bluetooth Context

```javascript
import { useBluetooth } from './context/BluetoothContext';

const { 
  isSupported,
  isScanning,
  devices,
  connectedDevice,
  isConnected,
  scanForDevices,
  connectToDevice,
  disconnect,
  sendMessage
} = useBluetooth();
```

#### Telegram Service

```javascript
import TelegramService from './services/telegramService';

const telegram = new TelegramService(botToken);

// Get channels
const channels = await telegram.getChannels();

// Get channel posts
const posts = await telegram.getChannelPosts(channelId);

// Get sticker pack
const stickers = await telegram.getStickerPack(stickerId);
```

---

## ❓ FAQ

**Q: Does NeoGram work without internet?**  
A: Yes! The core messaging feature works entirely via Bluetooth. Only the Channels feature requires internet.

**Q: What is the range of Bluetooth messaging?**  
A: Typically 10 meters, but can reach up to 100 meters with Bluetooth 5.0+ in ideal conditions.

**Q: Is my data secure?**  
A: Absolutely! Messages are transmitted directly between devices and never stored on servers.

**Q: Which browsers support NeoGram?**  
A: Chrome, Edge, and Opera have full Web Bluetooth API support. Safari has limited support.

**Q: Can I send files?**  
A: Currently, NeoGram supports text messages and stickers. File transfer is planned for future updates.

---

## 📄 Legal

- [Privacy Policy](./docs/privacy-policy.md)
- [Terms of Service](./docs/terms-of-service.md)
- [License](./LICENSE)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

- **Email:** support@neogram.app
- **Telegram:** @NeoGramSupport
- **GitHub Issues:** [Report a bug](https://github.com/yourusername/NeoGram/issues)

---

## 🙏 Acknowledgments

- Inspired by Telegram's innovative messaging platform
- Built with modern web technologies
- Community-driven development

---

<div align="center">

**Made with ❤️ by the NeoGram Team**

© 2026 NeoGram. All rights reserved.

</div>
