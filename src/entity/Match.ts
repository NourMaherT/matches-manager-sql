import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Length} from "class-validator";
import { MatchDetail } from "./MatchDetail";

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

    @OneToMany(() => MatchDetail, matchDetailes => matchDetailes.player)
    matchDetailes: MatchDetail[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;

}
