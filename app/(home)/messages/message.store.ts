import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: Date | string; // Allow string for hydration compatibility
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    type?: string;
    status?: 'sending' | 'sent' | 'error';
}

export interface Conversation {
    id: string;
    lastMessageAt: Date | string | null;
    otherUser: {
        id: string;
        name: string;
        avatar: string | null;
    };
    lastMessage: {
        content: string;
        createdAt: Date | string;
        senderId: string;
    } | null;
}

interface MessageStore {
    // Denormalized messages: { [messageId]: Message }
    messages: Record<string, Message>;

    // Mapped by conversation: { [conversationId]: messageIds[] }
    conversationMessages: Record<string, string[]>;

    // Conversations List
    conversations: Conversation[];

    // Actions
    addMessage: (message: Message) => void;
    addMessages: (conversationId: string, messages: Message[]) => void;
    setMessages: (conversationId: string, messages: Message[]) => void;
    getMessage: (messageId: string) => Message | undefined;
    getMessagesByConversationId: (conversationId: string) => Message[];
    removeMessage: (messageId: string) => void;
    setConversations: (conversations: Conversation[]) => void;
}

export const useMessageStore = create<MessageStore>()(
    persist(
        (set, get) => ({
            messages: {},
            conversationMessages: {},
            conversations: [],

            addMessage: (message) => {
                set((state) => {
                    // If message already exists, just update the content/metadata in messages map
                    // but don't duplicate ID in conversationMessages
                    const exists = !!state.messages[message.id];
                    const currentConversationIds = state.conversationMessages[message.conversationId] || [];

                    return {
                        messages: {
                            ...state.messages,
                            [message.id]: message,
                        },
                        conversationMessages: {
                            ...state.conversationMessages,
                            [message.conversationId]: exists
                                ? currentConversationIds
                                : [...currentConversationIds, message.id],
                        },
                    };
                });
            },

            // Useful for pagination or batch updates
            addMessages: (conversationId, newMessages) => {
                set((state) => {
                    const messageMap = { ...state.messages };
                    const currentIds = state.conversationMessages[conversationId] || [];
                    const newIds: string[] = [];

                    newMessages.forEach((msg) => {
                        messageMap[msg.id] = msg;
                        if (!currentIds.includes(msg.id)) {
                            newIds.push(msg.id);
                        }
                    });

                    const combinedIds = [...currentIds, ...newIds];

                    return {
                        messages: messageMap,
                        conversationMessages: {
                            ...state.conversationMessages,
                            [conversationId]: combinedIds
                        }
                    };
                });
            },

            setMessages: (conversationId, messages) => {
                set((state) => {
                    const messageMap = { ...state.messages };
                    const ids: string[] = [];

                    messages.forEach((msg) => {
                        messageMap[msg.id] = msg;
                        ids.push(msg.id);
                    });

                    return {
                        messages: {
                            ...state.messages,
                            ...messageMap // Merge new messages into global map
                        },
                        conversationMessages: {
                            ...state.conversationMessages,
                            [conversationId]: ids,
                        },
                    };
                });
            },

            getMessage: (messageId) => {
                return get().messages[messageId];
            },

            getMessagesByConversationId: (conversationId) => {
                const state = get();
                const ids = state.conversationMessages[conversationId] || [];
                const msgs = ids.map((id) => state.messages[id]).filter(Boolean);

                return msgs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            },

            removeMessage: (messageId) => {
                set((state) => {
                    const message = state.messages[messageId];
                    if (!message) return state;

                    const newMessages = { ...state.messages };
                    delete newMessages[messageId];

                    const conversationIds = state.conversationMessages[message.conversationId] || [];
                    const newConversationIds = conversationIds.filter(id => id !== messageId);

                    return {
                        messages: newMessages,
                        conversationMessages: {
                            ...state.conversationMessages,
                            [message.conversationId]: newConversationIds
                        }
                    };
                });
            },

            setConversations: (conversations) => set({ conversations }),
        }),
        {
            name: 'message-storage', // unique name
            storage: createJSONStorage(() => localStorage),
            // We persist everything (messages and map), so full offline support for viewed chats
            partialize: (state) => ({
                messages: state.messages,
                conversationMessages: state.conversationMessages,
                conversations: state.conversations, // Persist conversations
            }),
        }
    )
);
