import { Brand } from "@prisma/client";
import { BrandRepository } from "../repositories/brand.repository";

export class BrandService {
    constructor(private readonly repository: BrandRepository) { }

    async getAllBrands() {
        return await this.repository.getAllBrands();
    }

    async getByName(name: string) {
        try {
            if (!name || name.trim().length === 0) {
                throw new Error("Nome da marca é inválido");
            }

            return await this.repository.getByName(name);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            if (!id || id === 0) {
                throw new Error("ID da marca é inválido");
            }

            const brand = await this.repository.getById(id);

            if (!brand) {
                throw new Error("A marca com o ID informado não foi encontrada");
            }

            return brand;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerBrand(brand: Brand) {
        try {
            if (!brand.name || brand.name.trim().length === 0) {
                throw new Error("Nome da marca é inválido");
            }

            return await this.repository.registerBrand(brand);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateBrand(brand: Brand) {
        try {
            await this.getById(Number(brand.id));

            return await this.repository.updateBrand(brand);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteBrand(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteBrand(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}