import { Model } from "@prisma/client";
import { ModelRepository } from "../repositories/model.repository";

export class ModelService {
    constructor(private readonly repository: ModelRepository) { }

    async getAllModels() {
        return await this.repository.getAllModels();
    }

    async getByDescription(description: string) {
        try {
            if (!description || description.trim().length === 0) {
                throw new Error("Descrição do modelo é inválido");
            }

            return await this.repository.getByDescription(description);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            if (!id || id === 0) {
                throw new Error("ID do modelo é inválido");
            }

            const model = await this.repository.getById(id);

            if (!model) {
                throw new Error("O modelo com o ID informado não foi encontrado");
            }

            return model;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerModel(model: Model) {
        try {
            if (!model.description || model.description.trim().length === 0) {
                throw new Error("Descrição do modelo é inválido");
            }

            return await this.repository.registerModel(model);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateModel(model: Model) {
        try {
            await this.getById(Number(model.id));

            return await this.repository.updateModel(model);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteModel(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteModel(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
