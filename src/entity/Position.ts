import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Length} from "class-validator";
import {Player} from "./Player";
import { MatchDetail } from "./MatchDetail";

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

    @OneToMany(() => MatchDetail, matchDetailes => matchDetailes.position)
    matchDetailes: MatchDetail[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;
}
