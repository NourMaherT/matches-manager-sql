import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Length} from "class-validator";
import { Position } from "./Position";


@Entity()
export class Player {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    @Length(4, 20)
    name: string;

    @ManyToOne(() => Position, position => position.players)
    position: Position;

}