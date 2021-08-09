import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createPetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver()
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query((_) => [Pet])
  findAllPets(): Promise<Pet[]> {
    return this.petsService.findAllPets();
  }

  @Mutation((_) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: createPetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }
}
