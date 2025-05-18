
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToOne, JoinColumn, } from 'typeorm';
import { User } from './user.entity';
import { Address } from './address.entity';

export enum EventType {
    RUNNING = "running", 
    TRAIl = "trail"
}

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    label: string;

    @Column({ type: "datetime"})
    date: Date

    @Column({
        type: "enum",
        enum: EventType,
        default: EventType.RUNNING
    })
    type: EventType;
    
    @ManyToMany(() => User)
    @JoinTable()
    participants: User[];

    @OneToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn()
    address: Address;

    getParticipant(participantId: number): User | undefined {
        return this.participants.find(p  => p.id = participantId);
    }
}
