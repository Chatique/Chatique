import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm";
import { User } from "./UserEntity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn("uuid", { name: "chat_id" })
    chatId: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
    updatedAt: Date;
}
