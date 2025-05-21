import { FuelRepository } from "../repositories/fuel.repository";

export class FuelService {
    constructor(private readonly repository: FuelRepository) { }

    async getAllFuels() {
        return await this.repository.getAllFuels();
    }

    async getById(id: string) {
        try {
            if (!id || id.trim().length === 0) {
                throw new Error("ID do combustível é inválido");
            }

            const fuel = await this.repository.getById(id);

            if (!fuel) {
                throw new Error("A combustível com o ID informado não foi encontrado");
            }

            return fuel;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(description: string) {
        try {
            if (!description || description.trim().length === 0) {
                throw new Error("Descrição do combustível é inválida");
            }

            return await this.repository.getByDescription(description);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}