'use client';

import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-neutral-900 text-neutral-200 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full p-4">
          {/* New Chat Button */}
          <button className="flex items-center mt-12 gap-3 w-full px-4 py-3 mb-6 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="font-medium">New chat</span>
          </button>

          {/* Navigation Items */}
          <nav className="space-y-1 mb-8">
            <NavItem icon="chat" label="Chats" />
            <NavItem icon="folder" label="Projects" />
            <NavItem icon="grid" label="Artifacts" />
          </nav>

          {/* Starred Section */}
          <div className="mb-4">
            <h3 className="text-sm text-neutral-400 mb-2 px-4">Starred</h3>
            <ChatItem label="Competitive landscape research" />
          </div>

          {/* Recents Section - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-sm text-neutral-400 mb-2 px-4">Recents</h3>
            <div className="space-y-1">
              <ChatItem label="AI chatbot visual customization" />
              <ChatItem label="AI response evaluation framework" />
              <ChatItem label="AI-powered local business market..." />
              <ChatItem label="Creating a community website" />
              <ChatItem label="Leetcode array and two-pointer pr..." />
              <ChatItem label="Leetcode mastery for beginners" />
              <ChatItem label="AI chatbot interface design platfo..." />
              <ChatItem label="AI coding and system design" />
              <ChatItem label="Breaking digital habit loops" />
            </div>
          </div>

          {/* User Profile */}
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-neutral-800 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center font-semibold text-sm">
                HA
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Hussain Ali</div>
                <div className="text-xs text-neutral-400">Pro plan</div>
              </div>
              <svg
                className="w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button - Fixed on top right */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            // Close icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Menu icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay - Click to close sidebar on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

// Navigation Item Component
const NavItem = ({ icon, label }: { icon: string; label: string }) => {
  const getIcon = () => {
    switch (icon) {
      case 'chat':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        );
      case 'folder':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        );
      case 'grid':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        );
      default:
        return null;
    }
  };

  return (
    <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-neutral-800 rounded-lg transition-colors">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {getIcon()}
      </svg>
      <span>{label}</span>
    </button>
  );
};

// Chat Item Component
const ChatItem = ({ label }: { label: string }) => {
  return (
    <button className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-800 rounded-lg transition-colors text-neutral-300 truncate">
      {label}
    </button>
  );
};
