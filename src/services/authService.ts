import { User } from "../db/entities/UserEntity";
import { isCredentialTaken, saveUser } from "../db/repositories/UserRepository";
import { hashPassword } from "../helper/passwordHelper";

export const registerNewUser = async (
    username: string,
    email: string,
    password: string
) => {
    await validateCredentials(username, email, password);
    password = await hashPassword(password);
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    try {
        return await saveUser(user);
    } catch (error) {
        throw error;
    }
};

const validateCredentials = async (
    username: string,
    email: string,
    password: string
) => {
    if (username.length < 6 || username.length > 50) {
        throw new Error("Username name must be between 6 to 50 characters");
    }
    const usernameRegex = /^[a-z0-9_]+$/i;
    if (!usernameRegex.test(username))
        throw new Error(
            "Invalid Username. Username can contain aphabets, numbers and underscore only"
        );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid Email id");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    const existingUser = await isCredentialTaken(username, email);
    if (existingUser) {
        if (existingUser.username === username) {
            throw new Error("Username is taken");
        }
        if (existingUser.email === email) {
            throw new Error("Email id already exists");
        }
    }
};
