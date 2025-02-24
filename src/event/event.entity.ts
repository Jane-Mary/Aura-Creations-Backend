import { Entity, PrimaryGeneratedColumn,Column,ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/User/user.entity";
import { EventPlanner } from "src/event-planner/event-planner.entity";
import { EventStatus } from "src/enums/event-status.enum";
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    theme: string;

    @Column()
    date: Date;

    @Column()
    size: string;

    @Column()
    location: string;

    @Column({ type: 'enum', enum:EventStatus, default: EventStatus.PENDING })
    status: EventStatus;

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => EventPlanner, (planner) => planner.events)
    @JoinColumn({ name: 'event_planner_id' })
    eventPlanner: EventPlanner;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}