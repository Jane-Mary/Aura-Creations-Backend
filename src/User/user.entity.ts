import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: 'event-planner' }) 
    role: string

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
    }

}