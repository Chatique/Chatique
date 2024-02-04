import { Chat } from "../entities/ChatEntity";
import { User } from "../entities/UserEntity";
import dataSource from "../postgres.config";

const chatRepo = dataSource.getRepository(Chat);

export const saveChat = async (chatUser: User[]) => {
    try {
        const newChat = new Chat();
        newChat.users = chatUser;

        const savedChat = await chatRepo.save(newChat);

        return savedChat;
    } catch (error) {
        throw new Error("Failed to save chat");
    }
};

export const existingChat = async (chatUser: User[]) => {
    return await chatRepo
        .createQueryBuilder("chat")
        .innerJoin("chat.users", "user", "user.userId IN (:...userIds)", {
            userIds: chatUser.map((user) => user.userId),
        })
        .groupBy("chat.chatId")
        .having("COUNT(chat.chatId) = :userCount", {
            userCount: chatUser.length,
        })
        .getOne();
};

export const findByChatId = async (chatId: string) => {
    return await chatRepo.findOne({
        where: { chatId },
    });
};
