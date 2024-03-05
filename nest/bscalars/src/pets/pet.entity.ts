import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HashedIDScalar } from 'src/scalars/HashedID';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field((_) => HashedIDScalar)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;
}
