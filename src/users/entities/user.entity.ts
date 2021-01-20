import { Customer } from 'src/shared/entities/customers/customer.entity';
import { Role } from 'src/shared/entities/roles/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  alias: string;

  @Column()
  password: string;

  @ManyToOne(
    () => Role,
    role => role.users,
  )
  role: Role;

  @OneToMany(
    () => Customer,
    customer => customer.commercial,
  )
  customers: Customer[];
}
