import { Request, Response } from 'express';
import { liveChatService } from '../services/livechatService';
import { IClientUser } from '../types/client/user.interface';
import { getSocketInstance } from '../config/socketConfig';
import { IClientMessage } from '../types/client/message.interface';

export const getRecentMessages = async (req: Request, res: Response) => {

    try {
        console.log('this is the getRecentMessages function');
        const messages = await liveChatService.getRecentMessages();

        return res.status(200).json({ messages });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { id: userId } = req.user as IClientUser;
        const { message } = req.body;

        const newMessage = await liveChatService.postMessage({ userId, message });

        const io = getSocketInstance();
        io?.emit('chat:message', newMessage as IClientMessage);

        return res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}