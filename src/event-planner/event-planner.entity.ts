import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()
export class EventPlanner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bio: string;

    //array of strings
    @Column()
    portfolio: string;

    @Column()
    number: number;

}