import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Monitor } from '../monitors/monitor.entity';

@Entity()
export class SoftwareVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: string;

  @OneToMany(
    () => Monitor,
    monitors => monitors.softwareVersion,
  )
  monitors: Monitor[];
}
