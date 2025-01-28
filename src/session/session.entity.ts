import { Entity, PrimaryGeneratedColumn,Column,ManyToOne } from "typeorm";
import { User } from "src/User/user.entity";
import { EventPlanner } from "src/event-planner/event-planner.entity";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

   

}