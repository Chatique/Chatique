import { Chat } from "../entities/ChatEntity";
import { Message } from "../entities/MessageEntity";
import dataSource from "../postgres.config";

const messageRepo = dataSource.getRepository(Message);

export const saveMessage = async (message: Message) => {
    return await messageRepo.save(message);
};

export const findByChat = async (chat: Chat) => {
    return await messageRepo
        .createQueryBuilder("message")
        .leftJoin("message.chat", "chat")
        .addSelect("chat.chatId")
        .leftJoin("message.sender", "sender")
        .addSelect("sender.userId")
        .addSelect("sender.name")
        .addSelect("sender.email")
        .leftJoin("message.receiver", "receiver")
        .addSelect("receiver.userId")
        .addSelect("receiver.name")
        .addSelect("receiver.email")
        .where("message.chat = :chat", { chat: chat.chatId })
        .orderBy("message.created_at", "DESC")
        .getMany();
};
