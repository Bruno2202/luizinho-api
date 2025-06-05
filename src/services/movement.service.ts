import { Client, Movement } from "@prisma/client";
import { ClientRepository } from "../repositories/client.repository";
import { validate } from 'uuid';
import { validateCpf } from "../utils/validateCpf.utils";
import { CityService } from "./city.service";
import { CarService } from "./car.service";
import { MovementRepository } from "../repositories/movement.repository";

export class MovementService {
    constructor(
        private readonly repository: MovementRepository,
        private readonly carService: CarService
    ) { }

    async getAllMovements() {
        return await this.repository.getAllMovements();
    }

    async getByCar(car: string) {
        try {
            if (!car || car.trim().length === 0) {
                throw new Error("Descrição do carro é inválida");
            }

            const movement = await this.repository.getByCar(car);

            if (!movement) {
                throw new Error("A movimentação com o carro informado não foi encontrada");
            }

            return movement;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            if (!id || id === 0) {
                throw new Error("ID da movimentação é inválido");
            }

            const movement = await this.repository.getById(id);

            if (!movement) {
                throw new Error("A movimentação com o ID informado não foi encontrada");
            }

            return movement;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerMovement(movement: Movement) {
        try {
            await this.carService.getById(movement.carId);

            return await this.repository.registerMovement(movement);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateMovement(movement: Movement) {
        try {
            await this.getById(movement.id);
            await this.carService.getById(movement.carId);

            return await this.repository.updateMovement(movement);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteMovement(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteMovement(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}