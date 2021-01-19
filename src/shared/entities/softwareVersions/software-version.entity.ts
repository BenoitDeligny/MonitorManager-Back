import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SoftwareVersion {
  @PrimaryGeneratedColumn()
  id: number;
}
