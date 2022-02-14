import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Contains, IsInt, Length, IsEmail, IsDate, Min, Max} from "class-validator";
import { Player } from "./Player";
import { Position } from "./Position";
import { Match } from "./Match";

@Entity()
export class MatchDetail {

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

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;

}
