import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQPage = () => {
  const faqs = [
    { q: 'How does NeoGram work?', a: 'NeoGram uses Bluetooth technology to send messages between devices without internet connection.' },
    { q: 'Is my data secure?', a: 'Yes, all messages are encrypted end-to-end and transmitted directly via Bluetooth.' },
    { q: 'What is the range?', a: 'Bluetooth range is typically up to 10 meters (33 feet) for standard devices.' },
    { q: 'Can I send files?', a: 'Yes, you can send photos, videos, and other files through Bluetooth.' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      <div className="telegram-header border-b border-[#38383a] p-4">
        <h1 className="text-[20px] font-semibold text-white">FAQ</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-2">
            <div className="bg-[#2c2c2e] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <ChevronDown size={20} className="text-[#007aff] mt-0.5" />
                <div>
                  <h3 className="text-[15px] font-medium text-white mb-2">{faq.q}</h3>
                  <p className="text-[14px] text-[#8e8e93] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
