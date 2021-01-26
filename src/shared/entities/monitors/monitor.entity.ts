import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { MonitorVersion } from '../monitorVersions/monitor-version.entity';
import { SoftwareVersion } from '../softwareVersions/software-version.entity';

@Entity()
export class Monitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column({ type: 'date', nullable: true })
  deliveryDate: Date;

  @Column({ type: 'date', nullable: true })
  startingDate: Date;

  @Column({ type: 'date', nullable: true })
  exchangeDate: Date;

  @Column({ nullable: true })
  disposal: string;

  @ManyToOne(
    () => MonitorVersion,
    version => version.monitors,
  )
  monitorVersion: MonitorVersion;

  @ManyToOne(
    () => SoftwareVersion,
    software => software.version,
  )
  softwareVersion: SoftwareVersion;

  @ManyToOne(
    () => Customer,
    owner => owner.monitors,
  )
  owner: Customer;
}
