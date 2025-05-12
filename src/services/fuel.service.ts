import { FuelRepository } from "../repositories/fuel.repository";

export class FuelService {
    constructor(private readonly repository: FuelRepository) { }

    async getAllFuels() {
        return await this.repository.getAllFuels();
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