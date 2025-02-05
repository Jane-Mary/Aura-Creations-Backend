import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Session } from "src/session/session.entity";
import { Event } from "src/event/event.entity";
import { UserRole } from "src/enums/user-role.enum";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
    }

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER  })
      role: UserRole;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;  

    @OneToMany(() => Session, (session) => session.user) 
    sessions: Session[];

    @OneToMany(() => Event, (event) => event.eventPlanner) 
    events: Event[];
}
