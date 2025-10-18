'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import ReactMarkdown from 'react-markdown';
import { Sidebar } from './Sidebar';

export const ChatInterface = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat'
        }),
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const input = formData.get('input') as string;

        if (input.trim()) {
            sendMessage({ text: input });
            e.currentTarget.reset();
        }
    };

    const isTyping = status === 'streaming';

    return (
        <>
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Main Content */}
            <div className="min-h-screen flex flex-col p-4">
            {/* Main Card - Only show when no messages */}
            {messages.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-8">
                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-gray-900">
                                How can I help
                            </h1>
                            <p className="text-4xl font-bold text-gray-400">
                                planning your travel?
                            </p>
                        </div>

                        {/* Search Input */}
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="flex items-center bg-gray-50 rounded-2xl px-6 py-4 transition-all focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white">
                                <svg
                                    className="w-5 h-5 text-gray-400 mr-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    name="input"
                                    disabled={status !== 'ready'}
                                    placeholder="Ask a question..."
                                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 text-lg disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    className="ml-4 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={status !== 'ready'}
                                >
                                    <svg
                                        className="w-5 h-5 text-white transform rotate-90"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                Powered by JetAI
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages - Show when there are messages */}
            {messages.length > 0 && (
                <>
                    <div className="flex-1 overflow-y-auto max-w-4xl w-full mx-auto space-y-4 py-4">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] ${message.role === 'user' ? 'bg-indigo-600 text-white rounded-2xl px-6 py-3' : 'bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-3'}`}>
                                    <div className="text-sm font-semibold mb-1 opacity-70">
                                        {message.role === 'user' ? 'You' : 'AI'}
                                    </div>
                                    <div className={`${message.role === 'user' ? 'text-white' : 'text-gray-900'} prose prose-sm max-w-none`}>
                                        {message.parts.map((part, index) =>
                                            part.type === 'text' ? (
                                                <ReactMarkdown key={index}>{part.text}</ReactMarkdown>
                                            ) : null
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-3">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                        <span>AI is typing...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input - Fixed at bottom when there are messages */}
                    <div className="w-full max-w-4xl mx-auto pb-4">
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg transition-all focus-within:ring-2 focus-within:ring-indigo-500">
                                <svg
                                    className="w-5 h-5 text-gray-400 mr-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    name="input"
                                    disabled={status !== 'ready'}
                                    placeholder="Ask a question..."
                                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 text-lg disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    className="ml-4 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={status !== 'ready'}
                                >
                                    <svg
                                        className="w-5 h-5 text-white transform rotate-90"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            </div>
        </>
    );
}