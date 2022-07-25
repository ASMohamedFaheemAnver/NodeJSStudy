import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
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
  // @Column({ select: false })
  @Column()
  password: string;

  // ()=> Report is to avoid circular dependency
  @OneToMany(() => Report, (report) => report.user, {
    // eager: false,
    // lazy: true,
  })
  reports: Report[];

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
