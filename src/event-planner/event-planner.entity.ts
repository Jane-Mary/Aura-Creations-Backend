import { Entity, PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Event } from "src/event/event.entity";
import { Portfolio } from "src/portfolio/portfolio.entity";
import { Session } from "src/session/session.entity";

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

    @OneToMany(() => Portfolio, (portfolio) => portfolio.eventPlanner, { cascade: true })
    portfolios: Portfolio[];

    @OneToMany(() => Event, (event) => event.eventPlanner)
    events: Event[];

    @OneToMany(() => Session , (session) => session.eventPlanner)
    session : Session[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}