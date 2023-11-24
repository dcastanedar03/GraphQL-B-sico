import { Pet } from "../types.ts";
import { PetModel } from "../db/pet.ts";
import { getPetFromModel } from "../controllers/getPetFromModel.ts";
import { GraphQLError } from "graphql";

export const Mutation = {
    addPet: async (_parent:unknown, args: {name: string, breed: string}):Promise<Pet> => {
            const pet = new PetModel({
                name: args.name,
                breed: args.breed
            });
    
            await pet.save();
            const petResponse:Pet = await getPetFromModel(pet);
            return petResponse;
    },
    deletePet: async (_parent:unknown, args: {id: string}):Promise<Pet> => {
            const petDelete = await PetModel.findByIdAndDelete(args.id);
            if(!petDelete){
                throw new GraphQLError(`No pet found with id ${args.id}`, {
                    extensions: {code: "NOT_FOUND"},
                });
            }

            const petResponse = await getPetFromModel(petDelete);
            return petResponse;
    },
    updatePet: async (_parent:unknown, args: {id: string, name: string, breed: string}):Promise<Pet> => {
            const petUpdate = await PetModel.findById(args.id);
            
            if(!petUpdate){
                throw new GraphQLError(`No pet found with id ${args.id}`, {
                    extensions: {code: "NOT_FOUND"},
                });
            }

            petUpdate.name = args.name;
            petUpdate.breed = args.breed;
            await petUpdate.save();         
            const petResponse = await getPetFromModel(petUpdate); 
            return petResponse;
    },
}