import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import {Length} from "class-validator";
import { Position } from "./Position";
import { MatchDetailes } from "./MatchDetailes";


@Entity()
export class Player {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    @Length(4, 20)
    name: string;

    @ManyToOne(() => Position, position => position.players)
    position: Position;

    @OneToMany(() => MatchDetailes, matchDetailes => matchDetailes.player)
    matchDetailes: MatchDetailes[];

}