import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Contains, IsInt, Length, IsEmail, IsDate, Min, Max} from "class-validator"

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

}
