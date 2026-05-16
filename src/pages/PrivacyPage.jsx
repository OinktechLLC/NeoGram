import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      <div className="telegram-header border-b border-[#38383a] p-4">
        <h1 className="text-[20px] font-semibold text-white">Privacy Policy</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 text-[15px] text-white">
          <p className="text-[#8e8e93]">Last updated: January 2026</p>
          <h2 className="text-[17px] font-semibold text-white mt-4">Data Collection</h2>
          <p className="text-[#ffffff]/80 leading-relaxed">
            NeoGram collects minimal data. Messages are transmitted via Bluetooth and are not stored on our servers.
          </p>
          <h2 className="text-[17px] font-semibold text-white mt-4">Information We Collect</h2>
          <p className="text-[#ffffff]/80 leading-relaxed">
            We only collect device information necessary for Bluetooth connectivity. No personal messages are stored or transmitted to third parties.
          </p>
          <h2 className="text-[17px] font-semibold text-white mt-4">Data Security</h2>
          <p className="text-[#ffffff]/80 leading-relaxed">
            All communications are encrypted end-to-end using industry-standard protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
