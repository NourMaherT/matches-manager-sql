import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Length} from "class-validator";
import {Player} from "./Player";
import { MatchDetailes } from "./MatchDetailes";

export enum positions {
    offencive = "offensive",
    defencive = "defensive",
    midFielder = "midfielder",
    rightWinger = "right winger",
    leftWinger = "left winger",
    goalKeeper = "goal keeper"
}

@Entity()
export class Position {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ 
        nullable: false, 
        unique: true,
        type: "enum",
        enum: positions
    })
    @Length(4, 20)
    name!: positions;

    @OneToMany(() => Player, player => player.position)
    players: Player[];

    @OneToMany(() => MatchDetailes, matchDetailes => matchDetailes.position)
    matchDetailes: MatchDetailes[];
}
