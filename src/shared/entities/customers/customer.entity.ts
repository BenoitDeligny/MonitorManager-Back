import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Monitor } from '../monitors/monitor.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  customerName: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: true })
  department: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: true })
  commercialId: number;

  @ManyToOne(
    () => User,
    user => user.customers,
  )
  @JoinColumn()
  commercial: User;

  @OneToMany(
    () => Monitor,
    monitor => monitor.owner,
    {
      eager: true,
    },
  )
  monitors: Monitor[];
}
