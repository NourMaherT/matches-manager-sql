import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Length, IsDate} from "class-validator";

@Entity()
export class Match {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ nullable: false })
    @Length(4, 256)
    team1: string;

    @Column({ nullable: false })
    @Length(4, 256)
    team2: string;

    @Column({default: () => 'Now()'})
    date: Date;

}
