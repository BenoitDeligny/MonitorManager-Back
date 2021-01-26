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

  @Column({ nullable: false })
  lastname: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  alias: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(
    () => Role,
    role => role.users,
    {
      eager: true,
    },
  )
  role: Role;

  @OneToMany(
    () => Customer,
    customer => customer.commercial,
    {
      eager: true,
    },
  )
  customers: Customer[];
}
