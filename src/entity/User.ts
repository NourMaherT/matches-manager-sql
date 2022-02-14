import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Contains, IsInt, Length, IsEmail, IsDate, Min, Max} from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ nullable: false, unique: true })
    @Length(4, 20)
    username: string;

    @Column({ nullable: false })
    @Length(10, 1024)
    password: string;

    @Column({default: () => 'false'})
    isAdmin: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;

}
