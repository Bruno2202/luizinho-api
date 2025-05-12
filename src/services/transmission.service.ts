import { TransmissionRepository } from "../repositories/transmission.repository";

export class TransmissionService {
    constructor(private readonly repository: TransmissionRepository) { }

    async getAllTransmissions() {
        return await this.repository.getAllTransmissions();
    }

    async getById(id: number) {
        try {
            const transmission = await this.repository.getById(id);

            if (!transmission) {
                throw new Error("A transmissão com o ID informado não foi encontrada");
            }

            return transmission;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(name: string) {
        try {
            if (!name || name.trim().length === 0) {
                throw new Error("Nome da transmissão é inválido");
            }

            return await this.repository.getByDescription(name);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}