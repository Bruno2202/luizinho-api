import { Color } from "@prisma/client";
import { ColorRepository } from "../repositories/color.repository";

export class ColorService {
    constructor(private readonly repository: ColorRepository) { }

    async getAllColors() {
        return await this.repository.getAllColors();
    }

    async getByDescription(description: string) {
        try {
            if (!description || description.trim().length === 0) {
                throw new Error("Descrição da cor é inválida");
            }

            return await this.repository.getByDescription(description);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            if (!id || id === 0) {
                throw new Error("ID da cor é inválido");
            }

            const color = await this.repository.getById(id);

            if (!color) {
                throw new Error("A cor com o ID informado não foi encontrada");
            }

            return color;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerColor(color: Color) {
        try {
            if (!color.description || color.description.trim().length === 0) {
                throw new Error("Descrição da cor é inválida");
            }

            return await this.repository.registerColor(color);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateColor(color: Color) {
        try {
            await this.getById(Number(color.id));

            return await this.repository.updateColor(color);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteColor(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteColor(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
