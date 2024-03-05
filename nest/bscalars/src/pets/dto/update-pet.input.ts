import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { HashedIDScalar } from 'src/scalars/HashedID';

@InputType()
export class updatePetInput {
  @Field((_) => HashedIDScalar)
  id: number;

  @IsAlpha()
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;
}
