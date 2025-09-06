import { create } from 'zustand';
import { Message, ChatStore } from '@/types/chat';
import { generateId } from '@/lib/utils';

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  
  addMessage: (message: Message) => 
    set((state) => ({ 
      messages: [...state.messages, message] 
    })),
  
  setLoading: (loading: boolean) => 
    set({ isLoading: loading }),
  
  clearMessages: () => 
    set({ messages: [] }),
}));

export const createMessage = (content: string, role: 'user' | 'assistant'): Message => ({
  id: generateId(),
  content,
  role,
  timestamp: new Date(),
});