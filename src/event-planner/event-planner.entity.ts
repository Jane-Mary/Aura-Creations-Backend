import { Entity, PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Event } from "src/event/event.entity";
import { Portfolio } from "../portfolio/portfolio.entity"
import { Session } from "src/session/session.entity";

@Entity()
export class EventPlanner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bio: string;

    @Column()
    number: string;

    @OneToMany(() => Portfolio, (portfolio) => portfolio.eventPlanner)
    portfolios: Portfolio[];

    @OneToMany(() => Event, (event) => event.eventPlanner)
    events: Event[];

    @OneToMany(() => Session , (session) => session.eventPlanner)
    sessions : Session[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}