import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl">
              <Shield size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neogram-text">Privacy Policy</h1>
              <p className="text-neogram-muted">Last updated: January 2026</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Introduction</h2>
            <p className="text-neogram-muted leading-relaxed">
              NeoGram ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information 
              when you use our Bluetooth messaging application.
            </p>
          </section>

          {/* Data Collection */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <div className="flex items-center gap-2 mb-4">
              <Database size={20} className="text-neogram-primary" />
              <h2 className="text-xl font-semibold text-neogram-text">Information We Collect</h2>
            </div>
            <div className="text-neogram-muted space-y-4">
              <p>We collect minimal information to provide our services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Device Information:</strong> Bluetooth device identifiers for connection purposes</li>
                <li><strong>Messages:</strong> Only stored locally on your device; we do not store messages on servers</li>
                <li><strong>Usage Data:</strong> Anonymous analytics to improve app performance</li>
              </ul>
            </div>
          </section>

          {/* How We Use Data */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">How We Use Your Information</h2>
            <div className="text-neogram-muted space-y-3">
              <p>Your information is used solely for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Facilitating Bluetooth-based message transmission</li>
                <li>Maintaining secure connections between devices</li>
                <li>Improving application functionality</li>
                <li>Displaying Telegram channel content (when using Channels feature)</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={20} className="text-neogram-primary" />
              <h2 className="text-xl font-semibold text-neogram-text">Data Sharing</h2>
            </div>
            <p className="text-neogram-muted leading-relaxed">
              We do NOT sell, trade, or rent your personal information to third parties. 
              Messages are transmitted directly between devices via Bluetooth and are not 
              stored on any servers.
            </p>
          </section>

          {/* Security */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={20} className="text-neogram-primary" />
              <h2 className="text-xl font-semibold text-neogram-text">Security</h2>
            </div>
            <div className="text-neogram-muted space-y-3">
              <p>We implement industry-standard security measures:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for all messages</li>
                <li>Local storage only - no cloud backups without user consent</li>
                <li>Regular security audits and updates</li>
                <li>Minimal data collection principle</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Your Rights</h2>
            <p className="text-neogram-muted leading-relaxed">
              You have the right to access, modify, or delete your data at any time. 
              Since NeoGram stores data locally, you have full control over your information.
            </p>
          </section>

          {/* Contact */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Contact Us</h2>
            <p className="text-neogram-muted leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@neogram.app" className="text-neogram-primary hover:underline">
                privacy@neogram.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
