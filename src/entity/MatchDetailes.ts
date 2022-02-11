import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Contains, IsInt, Length, IsEmail, IsDate, Min, Max} from "class-validator";
import { Player } from "./Player";
import { Position } from "./Position";
import { Match } from "./Match";

@Entity()
export class MatchDetailes {

    @PrimaryGeneratedColumn('uuid')
    id!: number;
    
    @ManyToOne(() => Match, match => match.matchDetailes)
    match!: Match;

    @ManyToOne(() => Player, player => player.matchDetailes)
    player!: Player;

    @ManyToOne(() => Position, position => position.matchDetailes)
    position!: Position;

    @Column({default: () => '0'})
    changeTime: number;

}
