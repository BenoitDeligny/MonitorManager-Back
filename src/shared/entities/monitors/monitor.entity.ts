import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Monitor {
  @PrimaryGeneratedColumn()
  id: number;
}
