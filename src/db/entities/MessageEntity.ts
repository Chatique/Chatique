import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./UserEntity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid", { name: "message_id" })
    messageId: string;

    @Column({ name: "sender_id" })
    senderId: string;

    @Column({ name: "receiver_id" })
    receiverId: string;

    @ManyToOne(() => User, (user) => user.userId, { onDelete: "CASCADE" })
    @JoinColumn({ name: "sender_id", referencedColumnName: "userId" })
    sender: User;

    @ManyToOne(() => User, (user) => user.userId, { onDelete: "CASCADE" })
    @JoinColumn({ name: "receiver_id", referencedColumnName: "userId" })
    receiver: User;

    @Column({ type: "varchar" })
    content: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
    updatedAt: Date;
}
