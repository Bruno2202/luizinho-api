import { Category } from "@prisma/client";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
    constructor(private readonly repository: CategoryRepository) { }

    async getAllCategories() {
        return await this.repository.getAllCategories();
    }

    async getByDescription(description: string) {
        try {
            if (!description || description.trim().length === 0) {
                throw new Error("Descrição da categoria é inválida")
            }

            return await this.repository.getByDescription(description);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            if (!id || id === 0) {
                throw new Error("ID da categoria é inválido");
            }

            const category = await this.repository.getById(id);

            if (!category) {
                throw new Error("A categoria com o ID informado não foi encontrada");
            }

            return category;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async registerCategory(category: Category) {
        try {
            if (!category.description || category.description.trim().length === 0) {
                throw new Error("Descrição da categoria é inválida");
            }

            return await this.repository.registerCategory(category);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCategory(category: Category) {
        try {
            await this.getById(Number(category.id));

            return await this.repository.updateCategory(category);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteCategory(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteCategory(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}