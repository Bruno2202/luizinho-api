import { Car } from "@prisma/client";
import { CarRepository } from "../repositories/car.repository";
import { validatePlate } from "../utils/validatePlate.utils";
import { ColorService } from "./color.service";
import { TransmissionService } from "./transmission.service";
import { CategoryService } from "./category.service";
import { TypeService } from "./type.service";
import { BrandService } from "./brand.service";
import { ModelService } from "./model.service";
import { FuelService } from "./fuel.service";
import { formatPlate } from "../utils/formatPlate";

export class CarService {
    constructor(
        private readonly repository: CarRepository,
        private readonly modelService: ModelService,
        private readonly brandService: BrandService,
        private readonly typeService: TypeService,
        private readonly categoryService: CategoryService,
        private readonly transmissionService: TransmissionService,
        private readonly fuelService: FuelService,
        private readonly colorService: ColorService,
    ) { }

    async getAllCars() {
        return await this.repository.getAllCars();
    }

    async getByDescription(description: string) {
        try {
            if (!description || description.trim().length === 0) {
                throw new Error("Descrição do carro é inválida");
            }

            return await this.repository.getByDescription(description);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByCar(id: number) {
        try {
            if (!id) {
                throw new Error("ID do carro é inválido");
            }

            const car = await this.repository.getById(id);

            if (!car) {
                throw new Error("O carro com o ID informado não foi encontrado");
            }

            return car;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            if (!id) {
                throw new Error("ID do carro é inválido");
            }

            const car = await this.repository.getById(id);

            if (!car) {
                throw new Error("O carro com o ID informado não foi encontrado");
            }

            return car;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByPlate(plate: string) {
        try {
            if (!validatePlate(plate)) {
                throw new Error("Placa do carro é inválida");
            }

            const res = await this.repository.getByPlate(plate);

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerCar(car: Car) {
        try {
            await this.validateCar(car);

            await this.modelService.getById(car.modelId);
            await this.brandService.getById(car.brandId);

            return await this.repository.registerCar(car);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCar(car: Car) {
        try {
            await this.validateCar(car);

            await this.getById(car.id);

            return await this.repository.updateCar(car);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteCar(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteCar(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async validateCar(car: Car) {
        if (!car.description || car.description.trim().length === 0 || car.description.trim().length > 50) {
            throw new Error("A descricação do carro é inválido");
        }

        if (typeof car.sold !== 'boolean') {
            throw new Error("Status do carro não foi informado");
        }

        if (car.typeId) {
            await this.typeService.getById(car.typeId);
        }

        if (car.categoryId) {
            await this.categoryService.getById(car.categoryId);
        }

        if (car.transmissionId) {
            await this.transmissionService.getById(car.transmissionId);
        }

        if (car.fuelId) {
            await this.fuelService.getById(car.fuelId);
        }

        if (car.colorId) {
            await this.colorService.getById(car.colorId);
        }

        if (car.plate) {
            const existingCar = await this.getByPlate(formatPlate(car.plate));
            if (existingCar && existingCar.id !== car.id) {
                throw new Error("A placa informada já está em uso");
            }
        }
    }
}