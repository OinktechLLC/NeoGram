import React from 'react';
import { HelpCircle, MessageSquare, Bluetooth, Radio } from 'lucide-react';

const FAQPage = () => {
  const faqs = [
    {
      question: 'How does Bluetooth messaging work?',
      answer: 'NeoGram uses the Web Bluetooth API to establish direct peer-to-peer connections between devices. Messages are transmitted directly without going through any servers, ensuring privacy and working without internet.'
    },
    {
      question: 'Do I need internet to use NeoGram?',
      answer: 'No! The core messaging feature works entirely via Bluetooth without requiring internet. However, the Channels feature (which displays Telegram content) requires an internet connection.'
    },
    {
      question: 'What is the range of Bluetooth messaging?',
      answer: 'Bluetooth range typically extends up to 10 meters (33 feet) for most devices. Some devices with Bluetooth 5.0+ can reach up to 100 meters in ideal conditions.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! Messages are transmitted directly between devices and are not stored on any servers. We use end-to-end encryption principles, and since there\'s no central server, there\'s no single point of failure.'
    },
    {
      question: 'Can I use NeoGram on any device?',
      answer: 'NeoGram works on any device with a modern web browser that supports the Web Bluetooth API (Chrome, Edge, Opera). iOS support is limited due to Safari\'s restrictions.'
    },
    {
      question: 'How do I connect to another user?',
      answer: 'Both users need to have NeoGram open and Bluetooth enabled. Click "Scan Devices" and select the other user\'s device from the list. Once connected, you can start messaging immediately.'
    },
    {
      question: 'What are Telegram Channels in NeoGram?',
      answer: 'The Channels feature integrates with public Telegram channels, allowing you to view posts without needing a VPN. Content is fetched from Telegram\'s public API and displayed in our interface.'
    },
    {
      question: 'Are messages stored anywhere?',
      answer: 'Messages are only stored locally on your device. We don\'t have servers to store messages. If you clear your browser data, messages will be deleted.'
    },
    {
      question: 'Can I send files via Bluetooth?',
      answer: 'Currently, NeoGram supports text messages and stickers. File transfer capability is planned for future updates.'
    },
    {
      question: 'Is NeoGram free to use?',
      answer: 'Yes, NeoGram is completely free and open-source. You can use all features without any subscription or payment.'
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl">
              <HelpCircle size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neogram-text">FAQ</h1>
              <p className="text-neogram-muted">Frequently Asked Questions</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="glass-effect rounded-2xl border border-neogram-border overflow-hidden group"
            >
              <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-neogram-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-neogram-primary/20 p-2 rounded-lg">
                    {index % 3 === 0 ? (
                      <MessageSquare size={18} className="text-neogram-primary" />
                    ) : index % 3 === 1 ? (
                      <Bluetooth size={18} className="text-neogram-primary" />
                    ) : (
                      <Radio size={18} className="text-neogram-primary" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-neogram-text">
                    {faq.question}
                  </h3>
                </div>
                <span className="text-neogram-muted group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-6 text-neogram-muted leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 glass-effect rounded-2xl p-6 border border-neogram-border">
          <h2 className="text-xl font-semibold text-neogram-text mb-4">
            Still have questions?
          </h2>
          <p className="text-neogram-muted mb-4">
            Can't find the answer you're looking for? Reach out to our support team.
          </p>
          <a
            href="mailto:support@neogram.app"
            className="inline-flex items-center gap-2 bg-neogram-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
          >
            <MessageSquare size={18} />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
