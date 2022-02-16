import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Length} from "class-validator";
import { Position } from "./Position";
import { MatchDetail } from "./MatchDetail";


@Entity()
export class Player {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    @Length(4, 20)
    name: string;

    @ManyToOne(() => Position, position => position.players)
    position: Position; //default one in general

    @OneToMany(() => MatchDetail, matchDetailes => matchDetailes.player)
    matchDetailes: MatchDetail[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;

}
