import { Request, Response } from "express";
import { send } from "../services/messageService";

export const sendMessage = async (request: Request, response: Response) => {
    const { user } = request;
    const { content, receiverId } = request.body;
    const requiredFields = ["content", "receiverId"];

    for (let field of requiredFields) {
        if (!request.body[field] || request.body[field].lenth === 0) {
            return response
                .status(400)
                .json({ data: null, error: `Missing ${field}` });
        }
    }
    if (!user)
        return response
            .status(400)
            .json({ data: null, error: "Sender is not found" });
    try {
        const senderId = user?.userId;
        const message = await send(content, senderId, receiverId);

        response.status(201).json({ data: message, error: null });
    } catch (error) {
        response
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
