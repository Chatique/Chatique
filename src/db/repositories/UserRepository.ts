import { User } from "../entities/UserEntity";
import dataSource from "../postgres.config";

const userRepo = dataSource.getRepository(User);

export const saveUser = async (user: User) => {
    return await userRepo.save(user);
};

export const findById = async (userId: string) => {
    return await userRepo.findOne({
        where: { userId },
        select: ["userId", "name", "email"],
    });
};

export const findByUser = async (
    userId: string,
    name: string,
    email: string
) => {
    return await userRepo.findOne({
        where: [{ userId }, { name }, { email }],
        select: ["userId", "email", "name"],
    });
};

export const findByEmail = async (email: string) => {
    return await userRepo.findOne({
        where: { email },
        select: ["userId", "email", "name"],
    });
};
