import { Request, Response } from "express";
import { register, login } from "../services/authService";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

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
        const user = await register(username, email, password);
        jwt.sign(
            { email: user.email, id: user.id, name: user.username },
            JWT_SECRET,
            { expiresIn: "30d" },
            (error, token) => {
                if (error) {
                    throw error;
                }
                return res.status(201).json({
                    data: { token: token },
                    error: null,
                });
            }
        );
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const requiredFields = ["email", "password"];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res
                .status(400)
                .json({ data: null, error: `Missing ${field}` });
        }
    }
    try {
        const user = await login(email, password);
        jwt.sign(
            { email: user.email, id: user.id, name: user.username },
            JWT_SECRET,
            { expiresIn: "30d" },
            (error, token) => {
                if (error) {
                    throw error;
                }
                return res.status(201).json({
                    data: { token: token },
                    error: null,
                });
            }
        );
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
