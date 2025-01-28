import { Entity, PrimaryGeneratedColumn,Column,ManyToOne } from "typeorm";


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
    size: number;

    @Column()
    location: string;


    @Column()
    status: string;
}