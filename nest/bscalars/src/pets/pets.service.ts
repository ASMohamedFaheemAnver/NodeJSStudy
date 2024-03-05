import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { updatePetInput } from './dto/update-pet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async createPet(createPetInput: createPetInput): Promise<Pet> {
    console.log({ createPetInput });
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet);
  }

  async updatePet(updatePetInput: updatePetInput): Promise<Pet> {
    console.log({ updatePetInput });
    await this.petsRepository.update(
      { id: updatePetInput.id },
      { ...updatePetInput },
    );
    return updatePetInput;
  }

  async findAllPets(): Promise<Pet[]> {
    return this.petsRepository.find();
  }
}
