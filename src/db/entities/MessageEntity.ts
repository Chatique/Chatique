import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./UserEntity";
import { Chat } from "./ChatEntity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid", { name: "message_id" })
    messageId: string;

    @Column({ type: "varchar" })
    content: string;

    @ManyToOne(() => User)
    sender: User;

    @ManyToOne(() => User)
    receiver: User;

    @ManyToOne(() => Chat)
    chat: Chat;

    @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
    updatedAt: Date;
}
