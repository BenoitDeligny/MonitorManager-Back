import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Monitor } from '../monitors/monitor.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  address: string;

  @Column()
  department: number;

  @ManyToOne(
    () => User,
    commercial => commercial.customers,
  )
  commercial: User;

  @OneToMany(
    () => Monitor,
    monitor => monitor.owner,
  )
  monitors: Monitor[];
}
