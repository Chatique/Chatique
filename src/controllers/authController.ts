import { Request, Response } from "express";
import { register, login } from "../services/authService";
import generateToken from "../helper/jwtHelper";

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const requiredFields = ["name", "email", "password"];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res
                .status(400)
                .json({ data: null, error: `Missing ${field}` });
        }
    }
    try {
        const user = await register(name, email, password);
        const token = generateToken(user);
        if (token) {
            return res.status(201).json({
                data: { token: token },
                error: null,
            });
        }
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
        const token = generateToken(user);
        if (token) {
            return res.status(200).json({
                data: { token: token },
                error: null,
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, error: (error as Error).message });
    }
};
