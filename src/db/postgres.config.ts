import { DataSource } from "typeorm";
import { User } from "./entities/UserEntity";
import { Message } from "./entities/MessageEntity";
import { Chat } from "./entities/ChatEntity";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT
        ? parseInt(process.env.POSTGRES_PORT)
        : 5432,
    username: process.env.POSTGRES_USERNAME || "chatique_user",
    password: process.env.POSTGRES_PASSWORD || "chatique_password",
    database: process.env.POSTGRES_DATABASE || "chatique",
    // logging: true,
    entities: [User, Message, Chat],
    synchronize: true,
});

export default dataSource;
