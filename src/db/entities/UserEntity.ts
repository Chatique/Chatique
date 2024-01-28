import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid", { name: "user_id" })
    userId: string;

    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
    updatedAt: Date;
}
