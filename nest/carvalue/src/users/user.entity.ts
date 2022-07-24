import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// UserEntity is ok but community convention is User
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  email: string;

  // Nest recommended approach to remove password from response
  // @Exclude()
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log({ message: 'inserted user', user: this });
  }
  @AfterUpdate()
  logUpdate() {
    console.log({ message: 'updated user', user: this });
  }
  @AfterRemove()
  logRemove() {
    console.log({ message: 'removed user', user: this });
  }
}
