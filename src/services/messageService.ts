import { Message } from "../db/entities/MessageEntity";
import { User } from "../db/entities/UserEntity";
import {
    existingChat,
    findByChatId,
    saveChat,
} from "../db/repositories/ChatRepository";
import { findByChat, saveMessage } from "../db/repositories/MessageRepository";
import { findByUserId } from "../db/repositories/UserRepository";

export const send = async (
    content: string,
    sender: User,
    receiverId: string
) => {
    try {
        const receiver = await findByUserId(receiverId);
        if (!receiver) {
            throw new Error("Receiver not found");
        }

        const chatUsers = [sender, receiver].sort();

        let chat;

        const isChatExists = await existingChat(chatUsers);
        if (isChatExists) chat = isChatExists;
        else {
            chat = await saveChat(chatUsers);
        }

        const message = new Message();
        message.sender = sender;
        message.receiver = receiver;
        message.content = content;
        message.chat = chat;

        const savedMessage = await saveMessage(message);

        return savedMessage;
    } catch (error) {
        throw error;
    }
};

export const get = async (sender: User, chatId: string) => {
    try {
        const chat = await findByChatId(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }

        const messages = await findByChat(chat);
        const formattedMessages = messages.map((message) => ({
            ...message,
            chatId: message.chat.chatId,
            chat: undefined,
        }));
        return formattedMessages;
    } catch (error) {
        throw error;
    }
};
