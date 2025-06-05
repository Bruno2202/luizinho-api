import { City } from "@prisma/client";
import { CityRepository } from "../repositories/city.repository";

export class CityService {
    constructor(private readonly repository: CityRepository) { }

    async getAllCities() {
        return await this.repository.getAllCities();
    }

    async getByName(name: string) {
        try {
            if (!name || name.trim().length === 0) {
                throw new Error("Nome da cidade é inválido")
            }

            return await this.repository.getByName(name);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            if (!id || id === 0) {
                throw new Error("ID da cidade é inválido");
            }

            const city = await this.repository.getById(id);

            if (!city) {
                throw new Error("A cidade com o ID informado não foi encontrada");
            }

            return city;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerCity(city: City) {
        try {
            if (!city.name || city.name.trim().length === 0) {
                throw new Error("Nome da cidade é inválido");
            }

            return await this.repository.registerCity(city);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCity(city: City) {
        try {
            await this.getById(Number(city.id));

            return await this.repository.updateCity(city);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteCity(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteCity(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}