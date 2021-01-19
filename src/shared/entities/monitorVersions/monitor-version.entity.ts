import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MonitorVersion {
  @PrimaryGeneratedColumn()
  id: number;
}
