import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  street: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;
}