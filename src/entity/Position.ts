import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {Length} from "class-validator";

export enum positions {
    offencive = "offencive",
    defencive = "defencive",
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

}
