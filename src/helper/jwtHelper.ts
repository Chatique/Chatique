import jwt from "jsonwebtoken";
import { User } from "../db/entities/UserEntity";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

const generateToken = (user: User) => {
    return jwt.sign(
        { email: user.email, userId: user.userId, name: user.name },
        JWT_SECRET,
        { expiresIn: "30d" }
    );
};

export default generateToken;
