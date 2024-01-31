import { Chat } from "../entities/ChatEntity";
import { User } from "../entities/UserEntity";
import dataSource from "../postgres.config";

const chatRepo = dataSource.getRepository(Chat);

export const saveChat = async (chatUser: User[]) => {
    try {
        // Create a new Chat instance with the provided users
        const newChat = new Chat();
        newChat.users = chatUser;

        // Save the new chat using the repository
        const savedChat = await chatRepo.save(newChat);

        return savedChat;
    } catch (error) {
        console.error("Error saving chat:", error);
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
