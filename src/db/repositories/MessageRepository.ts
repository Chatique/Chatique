import { Message } from "../entities/MessageEntity";
import dataSource from "../postgres.config";

const messageRepo = dataSource.getRepository(Message);

export const saveMessage = async (message: Message) => {
    return await messageRepo.save(message);
};
