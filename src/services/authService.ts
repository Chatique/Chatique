import { User } from "../db/entities/UserEntity";
import { findByEmail, saveUser } from "../db/repositories/UserRepository";
import { comparePassword, hashPassword } from "../helper/passwordHelper";

export const register = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        await validateCredentials(name, email, password);
        password = await hashPassword(password);
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;

        return await saveUser(user);
    } catch (error) {
        throw error;
    }
};
export const login = async (email: string, password: string) => {
    try {
        validateEmail(email);
        const user = await findByEmail(email);

        if (!user) throw new Error("Email id not found");

        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) throw new Error("Incorrect password");

        return user;
    } catch (error) {
        throw error;
    }
};

const validateCredentials = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        validateName(name);
        validateEmail(email);
        validatePassword(password);

        const existingUser = await findByEmail(email);
        if (existingUser) {
            throw new Error("Email id already exists");
        }
    } catch (error) {
        throw error;
    }
};

const validateName = (name: string) => {
    if (name.length < 6 || name.length > 50) {
        throw new Error("Name must be between 6 to 50 characters");
    }
};

const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid Email id");
    }
};

const validatePassword = (password: string) => {
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }
};
