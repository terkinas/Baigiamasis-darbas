import { LivechatRepository } from "../database/repository/livechatRepository";

class LiveChatService {
    private livechatRepository: LivechatRepository;

    constructor() {
        this.livechatRepository = new LivechatRepository();
    }

    async getRecentMessages() {
        try {
            const messages = await this.livechatRepository.recentMessages();
            return messages;
        } catch (error) {
            throw error;
        }
    }

    async postMessage({ userId, message }: { userId: string, message: string }) {
        try {
            const newMessage = await this.livechatRepository.addMessage({ userId, message });
            return newMessage;
        } catch (error) {
            throw error;
        }
    
    }

    async getAllMessages() {
        try {
            const messages = await this.livechatRepository.allMessages();
            return messages;
        } catch (error) {
            throw error;
        }
    }

    async deleteMessage(id: string) {
        try {
            await this.livechatRepository.deleteMessage(id);
        } catch (error) {
            throw error;
        }
    }
}

export const liveChatService = new LiveChatService();