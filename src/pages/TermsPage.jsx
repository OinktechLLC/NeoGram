import React from 'react';

const TermsPage = () => {
  return (
    <div className="flex flex-col h-full bg-[#1c1c1d]">
      <div className="telegram-header border-b border-[#38383a] p-4">
        <h1 className="text-[20px] font-semibold text-white">Terms of Service</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 text-[15px] text-white">
          <p className="text-[#8e8e93]">Effective: January 2026</p>
          <h2 className="text-[17px] font-semibold text-white mt-4">Acceptance of Terms</h2>
          <p className="text-[#ffffff]/80 leading-relaxed">
            By using NeoGram, you agree to these terms. If you do not agree, please do not use the application.
          </p>
          <h2 className="text-[17px] font-semibold text-white mt-4">User Responsibilities</h2>
          <p className="text-[#ffffff]/80 leading-relaxed">
            You are responsible for your use of NeoGram and must comply with all applicable laws.
          </p>
          <h2 className="text-[17px] font-semibold text-white mt-4">Prohibited Conduct</h2>
          <p className="text-[#ffffff]/80 leading-relaxed">
            Users may not use NeoGram for illegal activities, harassment, or spam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
