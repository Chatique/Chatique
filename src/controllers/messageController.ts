import { Request, Response } from "express";
import { get, send } from "../services/messageService";

export const sendMessage = async (request: Request, response: Response) => {
    const sender = request.user;
    const { content, receiverId } = request.body;
    const requiredFields = ["content", "receiverId"];

    for (let field of requiredFields) {
        if (!request.body[field] || request.body[field].lenth === 0) {
            return response
                .status(400)
                .json({ data: null, error: `Missing ${field}` });
        }
    }
    if (!sender)
        return response
            .status(400)
            .json({ data: null, error: "Sender is not found" });
    try {
        const message = await send(content, sender, receiverId);

        response.status(201).json({ data: message, error: null });
    } catch (error) {
        response
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const getMessage = async (request: Request, response: Response) => {
    const sender = request.user;
    const { chatId } = request.query;

    if (!sender)
        return response
            .status(400)
            .json({ data: null, error: "Sender is not found" });
    try {
        if (!chatId || typeof chatId != "string")
            return response
                .status(400)
                .json({ data: null, error: "Invalid Chat ID" });
        const message = await get(sender, chatId as string);

        response.status(201).json({ data: message, error: null });
    } catch (error) {
        response
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
