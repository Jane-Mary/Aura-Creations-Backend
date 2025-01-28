import { Entity, PrimaryGeneratedColumn,Column,ManyToOne } from "typeorm";
import { EventPlanner } from "src/event-planner/event-planner.entity";

@Entity()
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    //array of strings
    @Column()
    image: string;

    @ManyToOne(() => EventPlanner , (planner) => planner.id)
    planner: EventPlanner

}