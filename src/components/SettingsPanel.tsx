"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Sparkles, Zap, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/Button";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatSettings {
  animationsEnabled: boolean;
  soundEnabled: boolean;
  responseSpeed: 'fast' | 'normal' | 'thoughtful';
  theme: 'light' | 'auto';
}

const defaultSettings: ChatSettings = {
  animationsEnabled: true,
  soundEnabled: false,
  responseSpeed: 'normal',
  theme: 'light'
};

// Load settings from localStorage
const loadSettings = (): ChatSettings => {
  if (typeof window === 'undefined') return defaultSettings;
  
  try {
    const saved = localStorage.getItem('chat-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch (error) {
    console.warn('Failed to load settings:', error);
    return defaultSettings;
  }
};

// Save settings to localStorage
const saveSettings = (settings: ChatSettings) => {
  try {
    localStorage.setItem('chat-settings', JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings:', error);
  }
};

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [settings, setSettings] = useState<ChatSettings>(loadSettings);

  const updateSetting = <K extends keyof ChatSettings>(
    key: K,
    value: ChatSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
  };

  // Animation variants following design principles
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] as const }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.15, ease: [0.4, 0.0, 0.2, 1] as const }
    }
  };

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 0.2, 1] as const,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1] as const
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] as const }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Settings Panel */}
          <motion.div 
            className="relative w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
            variants={panelVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div 
              className="px-6 py-5 border-b border-gray-200/50"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full p-0 hover:bg-gray-100/50"
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Close settings</span>
                </Button>
              </div>
            </motion.div>

            {/* Settings Content */}
            <div className="px-6 py-5 space-y-6">
              {/* Animations Toggle */}
              <motion.div 
                className="flex items-center justify-between"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Animations</div>
                    <div className="text-xs text-gray-500">Enable smooth transitions and effects</div>
                  </div>
                </div>
                <motion.button
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    settings.animationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  onClick={() => updateSetting('animationsEnabled', !settings.animationsEnabled)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ 
                      x: settings.animationsEnabled ? 20 : 2,
                      y: 4 
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                </motion.button>
              </motion.div>

              {/* Sound Toggle */}
              <motion.div 
                className="flex items-center justify-between"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  {settings.soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-400" />
                  )}
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Sound Effects</div>
                    <div className="text-xs text-gray-500">Audio feedback for interactions</div>
                  </div>
                </div>
                <motion.button
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    settings.soundEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                  onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ 
                      x: settings.soundEnabled ? 20 : 2,
                      y: 4 
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                </motion.button>
              </motion.div>

              {/* Response Speed */}
              <motion.div 
                className="space-y-3"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Response Speed</div>
                    <div className="text-xs text-gray-500">Adjust AI thinking time</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['fast', 'normal', 'thoughtful'] as const).map((speed) => (
                    <motion.button
                      key={speed}
                      onClick={() => updateSetting('responseSpeed', speed)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                        settings.responseSpeed === speed
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {speed.charAt(0).toUpperCase() + speed.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Theme Selection */}
              <motion.div 
                className="space-y-3"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Theme</div>
                    <div className="text-xs text-gray-500">Choose your preferred appearance</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['light', 'auto'] as const).map((theme) => (
                    <motion.button
                      key={theme}
                      onClick={() => updateSetting('theme', theme)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                        settings.theme === theme
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {theme === 'auto' ? 'Auto' : 'Light'}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div 
              className="px-6 py-5 border-t border-gray-200/50 bg-gray-50/30"
              variants={itemVariants}
            >
              <motion.button
                onClick={resetToDefaults}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Reset to Defaults
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export the settings hook for use in other components
export const useSettings = () => {
  const [settings, setSettings] = useState<ChatSettings>(loadSettings);

  const updateSetting = <K extends keyof ChatSettings>(
    key: K,
    value: ChatSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return { settings, updateSetting };
};