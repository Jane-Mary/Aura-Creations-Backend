import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/User/user.entity";
import { EventPlanner } from "src/event-planner/event-planner.entity";
import { SessionStatus } from "src/enums/session-status.enum";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    scheduled_date: Date;

    @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.SCHEDULED })
    status: SessionStatus;

    @ManyToOne(() => User, (user) => user.sessions)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => EventPlanner, (eventPlanner) => eventPlanner.session) // Updated this line
    @JoinColumn({ name: 'event_planner_id' })
    eventPlanner: EventPlanner;
}