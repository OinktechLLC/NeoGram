import React from 'react';
import { motion } from 'framer-motion';
import { Users, Radio } from 'lucide-react';

const ChannelCard = ({ channel, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-effect rounded-2xl p-4 cursor-pointer transition-all hover:border-neogram-primary/50"
    >
      <div className="flex items-center gap-3">
        {/* Channel Avatar */}
        <div className="relative">
          <img
            src={channel.photo || `https://ui-avatars.com/api/?name=${channel.title}&background=3b82f6&color=fff`}
            alt={channel.title}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-neogram-primary/30"
          />
          <div className="absolute -bottom-1 -right-1 bg-neogram-primary rounded-full p-1">
            <Radio size={12} className="text-white" />
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-neogram-text font-semibold truncate text-base">
            {channel.title}
          </h3>
          <p className="text-neogram-muted text-sm truncate">
            @{channel.username}
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-neogram-muted">
            <Users size={12} />
            <span>{channel.subscribers} subscribers</span>
          </div>
        </div>
      </div>

      {/* Channel Description */}
      {channel.description && (
        <p className="text-neogram-muted/70 text-sm mt-3 line-clamp-2">
          {channel.description}
        </p>
      )}
    </motion.div>
  );
};

export default ChannelCard;
