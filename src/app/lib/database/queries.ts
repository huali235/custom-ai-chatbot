import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
import {prisma} from './prisma';

// Types based on Prisma schema
export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: string;
  content: string;
  model?: string;
  createdAt: Date;
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

/**
 * Create a new conversation
 * @param title - Optional title for the conversation (defaults to "New Chat")
 * @returns The newly created conversation
 */
export async function createConversation(title?: string) {
  // Create conversation with Prisma
  const conversation = await prisma.conversation.create({
    data: {
      title: title || 'New Chat',
    },
  });

  return conversation as Conversation;
}

/**
 * Get all conversations for the sidebar
 * Ordered by most recently updated first
 * @returns Array of conversations
 */
export async function getAllConversations() {
  // Fetch all conversations, ordered by most recent
  const conversations = await prisma.conversation.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return conversations as Conversation[];
}

/**
 * Get a single conversation with all its messages
 * @param conversationId - The ID of the conversation to retrieve
 * @returns Conversation with all messages
 */
export async function getConversationWithMessages(conversationId: string) {
  // Fetch conversation with related messages
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc', // Sort messages by creation time (oldest first)
        },
      },
    },
  });

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  return conversation as ConversationWithMessages;
}

/**
 * Save a new message to a conversation
 * @param conversationId - The ID of the conversation
 * @param role - The role of the message sender (e.g., "user" or "assistant")
 * @param content - The message content
 * @param model - Optional model name used to generate the message
 * @returns The newly created message
 */
export async function saveMessage(
  conversationId: string,
  role: string,
  content: string,
  model?: string
) {
  // Create message with Prisma
  const message = await prisma.message.create({
    data: {
      conversationId,
      role,
      content,
      model,
    },
  });

  // Update the conversation's updatedAt timestamp
  await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  return message as Message;
}

/**
 * Delete a conversation and all its messages
 * Messages are automatically deleted due to CASCADE in Prisma schema
 * @param conversationId - The ID of the conversation to delete
 */
export async function deleteConversation(conversationId: string) {
  // Delete conversation (messages are cascade deleted)
  await prisma.conversation.delete({
    where: {
      id: conversationId,
    },
  });
}

/**
 * Update the title of a conversation
 * @param conversationId - The ID of the conversation to update
 * @param title - The new title
 * @returns The updated conversation
 */
export async function updateConversationTitle(
  conversationId: string,
  title: string
) {
  // Update conversation title with Prisma
  const conversation = await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      title,
    },
  });

  return conversation as Conversation;
}
