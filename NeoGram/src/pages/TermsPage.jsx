import React from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl">
              <FileCheck size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neogram-text">Terms of Service</h1>
              <p className="text-neogram-muted">Last updated: January 2026</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Agreement */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Agreement to Terms</h2>
            <p className="text-neogram-muted leading-relaxed">
              By accessing or using NeoGram ("the Application"), you agree to be bound by these 
              Terms of Service and all applicable laws and regulations. If you do not agree with 
              any of these terms, you are prohibited from using or accessing this application.
            </p>
          </section>

          {/* License */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Use License</h2>
            <div className="text-neogram-muted space-y-3">
              <p>Permission is granted to temporarily use NeoGram for personal, non-commercial purposes.</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may not modify or copy the materials</li>
                <li>You may not use the materials for commercial purposes</li>
                <li>You may not attempt to decompile or reverse engineer the software</li>
                <li>You may not remove any copyright or proprietary notations</li>
                <li>You may not transfer the materials to another person</li>
              </ul>
            </div>
          </section>

          {/* Bluetooth Usage */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-neogram-primary" />
              <h2 className="text-xl font-semibold text-neogram-text">Bluetooth Communication</h2>
            </div>
            <div className="text-neogram-muted space-y-3">
              <p>By using NeoGram's Bluetooth features, you acknowledge that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Messages are transmitted directly between devices without server storage</li>
                <li>Both devices must have Bluetooth enabled and be within range</li>
                <li>You are responsible for ensuring you have permission to connect to other devices</li>
                <li>The application is not responsible for interference with other Bluetooth devices</li>
              </ul>
            </div>
          </section>

          {/* Telegram Integration */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Telegram Channels</h2>
            <p className="text-neogram-muted leading-relaxed">
              The Channels feature displays content from public Telegram channels. We do not 
              create, endorse, or take responsibility for the content posted in these channels. 
              Users should verify information independently.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Disclaimer</h2>
            <p className="text-neogram-muted leading-relaxed">
              NeoGram is provided "as is" without any warranties, expressed or implied. We do not 
              warrant that the application will be uninterrupted, secure, or error-free. You use 
              the application at your own risk.
            </p>
          </section>

          {/* Limitations */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Limitations of Liability</h2>
            <p className="text-neogram-muted leading-relaxed">
              In no event shall NeoGram or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the application.
            </p>
          </section>

          {/* Termination */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Termination</h2>
            <p className="text-neogram-muted leading-relaxed">
              We reserve the right to terminate or suspend access to NeoGram immediately, without 
              prior notice, for conduct that we believe violates these Terms or is harmful to other 
              users, us, or third parties.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Changes to These Terms</h2>
            <p className="text-neogram-muted leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any 
              material changes through the application or via email. Your continued use after changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Contact */}
          <section className="glass-effect rounded-2xl p-6 border border-neogram-border">
            <h2 className="text-xl font-semibold text-neogram-text mb-4">Contact Information</h2>
            <p className="text-neogram-muted leading-relaxed">
              For questions about these Terms of Service, please contact us at:
              <br />
              <a href="mailto:legal@neogram.app" className="text-neogram-primary hover:underline">
                legal@neogram.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
