import { Car, PrismaClient } from "@prisma/client";
import { formatPlate } from "../utils/formatPlate";

const prisma = new PrismaClient();

export class CarRepository {
    async getAllCars() {
        try {
            const res = await prisma.car.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(description: string) {
        try {
            const res = await prisma.car.findMany({
                where: {
                    description: {
                        contains: description,
                        mode: "insensitive"
                    }
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            const res = await prisma.car.findUnique({
                where: {
                    id: id
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerCar(car: Car) {
        try {
            const { plate, ...CarData } = car;

            console.log(car)
            const formatedPlate = formatPlate(plate);

            const data: any = {
                ...CarData,
                plate: formatedPlate,
            };

            const res = await prisma.car.create({ data });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteCar(id: number) {
        try {
            const res = await prisma.car.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCar(car: Car) {
        try {
            const { typeId, categoryId, transmissionId, colorId, modelId, brandId, ...CarData } = car;

            const typeIdNumber = Number(typeId);
            const categoryIdNumber = Number(categoryId);
            const transmissionIdNumber = Number(transmissionId);
            const colorIdNumber = Number(colorId);
            const modelIdNumber = Number(modelId);
            const brandIdNumber = Number(brandId);

            const res = await prisma.car.update({
                where: {
                    id: car.id
                },
                data: {
                    ...CarData,
                    typeId: typeIdNumber,
                    categoryId: categoryIdNumber,
                    transmissionId: transmissionIdNumber,
                    colorId: colorIdNumber,
                    modelId: modelIdNumber,
                    brandId: brandIdNumber,
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}