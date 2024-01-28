import { Request, Response } from "express";
import { registerNewUser } from "../services/authService";

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const requiredFields = ["username", "email", "password"];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res
                .status(400)
                .json({ data: null, error: `Missing ${field}` });
        }
    }
    try {
        const newUser = await registerNewUser(username, email, password);
        return res.status(201).json({
            data: { username: newUser.username, email: newUser.email },
            error: null,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
