import { Message } from "../db/entities/MessageEntity";
import { saveMessage } from "../db/repositories/MessageRepository";
import { findById } from "../db/repositories/UserRepository";

export const send = async (
    content: string,
    senderId: string,
    receiverId: string
) => {
    const receiver = await findById(receiverId);
    if (!receiver) throw new Error("Reciever is not found");

    const message = new Message();
    message.senderId = senderId;
    message.receiverId = receiverId;
    message.content = content;

    return await saveMessage(message);
};
