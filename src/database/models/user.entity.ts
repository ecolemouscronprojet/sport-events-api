
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum UserGender {
    MAN = "man", 
    WOMAN = "woman"
}

export enum UserRole {
    USER = "user",
    ORGANISER = "organiser"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({select: false})
    password: string;

    @Column({ length: 50 })
    firstname: string;

    @Column({ length: 50 })
    lastname: string;
    
    @Column({ type: "date"})
    birthday: Date;

    @Column({
        type: "enum",
        enum: UserGender,
        default: UserGender.MAN
    })
    gender: UserGender;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

}
