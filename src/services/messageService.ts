import { Message } from "../db/entities/MessageEntity";
import { User } from "../db/entities/UserEntity";
import { existingChat, saveChat } from "../db/repositories/ChatRepository";
import { saveMessage } from "../db/repositories/MessageRepository";
import { findById } from "../db/repositories/UserRepository";

export const send = async (
    content: string,
    sender: User,
    receiverId: string
) => {
    try {
        const receiver = await findById(receiverId);
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
