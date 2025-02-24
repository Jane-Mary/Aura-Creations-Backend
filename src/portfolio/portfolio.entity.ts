import { Entity, PrimaryGeneratedColumn,Column,ManyToOne, JoinColumn } from "typeorm";
import { EventPlanner } from "../event-planner/event-planner.entity";

@Entity()
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    //array of strings
    @Column("text", { array: true })
    image: string;

    @ManyToOne(() => EventPlanner , (eventPlanner) => eventPlanner.portfolios)
    eventPlanner: EventPlanner

}