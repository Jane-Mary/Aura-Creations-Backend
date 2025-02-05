import { Entity, PrimaryGeneratedColumn,Column,ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/User/user.entity";
import { EventPlanner } from "src/event-planner/event-planner.entity";
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    number: number;

    @Column()
    theme: string;

    @Column()
    date: Date

    @Column()
    size: string;

    @Column()
    location: string;

    @Column()
    status: string;

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: 'user_id' })
    user: User;


    @ManyToOne(() => EventPlanner, (planner) => planner.events)
    @JoinColumn({ name: 'event_planner_id' })
    eventPlanner: EventPlanner;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}