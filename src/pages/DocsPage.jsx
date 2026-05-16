import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';

const DocsPage = () => {
  const docs = [
    { id: 1, title: 'Getting Started', description: 'Learn how to use NeoGram' },
    { id: 2, title: 'Bluetooth Setup', description: 'Connect your devices' },
    { id: 3, title: 'Privacy & Security', description: 'How we protect your data' },
    { id: 4, title: 'API Reference', description: 'Developer documentation' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      <div className="telegram-header border-b border-[#38383a] p-4">
        <h1 className="text-[20px] font-semibold text-white">Documentation</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-[#2c2c2e] transition-colors cursor-pointer"
          >
            <div className="bg-[#007aff]/20 p-2.5 rounded-xl">
              <FileText size={22} className="text-[#007aff]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-medium text-white">{doc.title}</h3>
              <p className="text-[13px] text-[#8e8e93]">{doc.description}</p>
            </div>
            <ChevronRight size={20} className="text-[#8e8e93]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocsPage;
