import { StateRepository } from "../repositories/state.repository";

export class StateService {
    constructor(private readonly repository: StateRepository) { }

    async getAllStates() {
        return await this.repository.getAllStates();
    }

    async getByName(name: string) {
        try {
            if (!name || name.trim().length === 0) {
                throw new Error("Nome do estado é inválido");
            }

            return await this.repository.getByName(name);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: string) {
        try {
            if (!id || id.trim().length === 0) {
                throw new Error("ID do estado é inválido");
            }

            return await this.repository.getById(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}