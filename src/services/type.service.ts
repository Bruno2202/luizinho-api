import { Type } from "@prisma/client";
import { TypeRepository } from "../repositories/type.repository";

export class TypeService {
    constructor(private readonly repository: TypeRepository) { }

    async getAllTypes() {
        return await this.repository.getAllTypes();
    }

    async getByDescription(description: string) {
        try {
            if (!description || description.trim().length === 0) {
                throw new Error("Descrição do tipo é inválida");
            }

            return await this.repository.getByDescription(description);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            if (!id || id === 0) {
                throw new Error("ID do tipo é inválido");
            }

            const type = await this.repository.getById(id);

            if (!type) {
                throw new Error("O tipo com o ID informado não foi encontrado");
            }

            return type;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerType(type: Type) {
        try {
            if (!type.description || type.description.trim().length === 0) {
                throw new Error("Descrição do tipo é inválida");
            }

            return await this.repository.registerType(type);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateType(type: Type) {
        try {
            await this.getById(Number(type.id));

            return await this.repository.updateType(type);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteType(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteType(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
