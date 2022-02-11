import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Length} from "class-validator";
import { MatchDetailes } from "./MatchDetailes";

@Entity()
export class Match {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ nullable: false })
    @Length(4, 256)
    team1!: string;

    @Column({ nullable: false })
    @Length(4, 256)
    team2!: string;

    @Column({default: () => 'Now()'})
    date: Date;

    @OneToMany(() => MatchDetailes, matchDetailes => matchDetailes.player)
    matchDetailes: MatchDetailes[];

}
