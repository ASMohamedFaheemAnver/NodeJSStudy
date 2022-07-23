import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// UserEntity is ok but community convention is User
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
