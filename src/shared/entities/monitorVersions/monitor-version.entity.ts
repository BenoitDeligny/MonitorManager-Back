import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Monitor } from '../monitors/monitor.entity';

@Entity()
export class MonitorVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: string;

  @OneToMany(
    () => Monitor,
    monitors => monitors.monitorVersion,
  )
  monitors: Monitor[];
}
