import { Car, PrismaClient } from "@prisma/client";
import { formatPlate } from "../utils/formatPlate";

const prisma = new PrismaClient();

export class CarRepository {
    async getAllCars() {
        try {
            const res = await prisma.car.findMany({
                include: {
                    model: true,
                    brand: true,
                    category: true,
                    color: true,
                    fuel: true,
                    transmission: true,
                    type: true
                }
            });

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

    async getByPlate(plate: string) {
        try {
            const res = await prisma.car.findUnique({
                where: {
                    plate: plate
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerCar(car: Car) {
        try {
            const data: any = {
                description: car.description,
                plate: formatPlate(car.plate),
                manufactureYear: car.manufactureYear,
                modelYear: car.modelYear,
                mileage: car.mileage,
                salePrice: car.salePrice,
                observation: car.observation,
                sold: car.sold,
                brand: { connect: { id: car.brandId } },
                model: { connect: { id: car.modelId } },
                ...(car.categoryId != null && { category: { connect: { id: car.categoryId } } }),
                ...(car.typeId != null && { type: { connect: { id: car.typeId } } }),
                ...(car.transmissionId != null && { transmission: { connect: { id: car.transmissionId } } }),
                ...(car.fuelId != null && { fuel: { connect: { id: car.fuelId } } }),
                ...(car.colorId != null && { color: { connect: { id: car.colorId } } }),
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

            const res = await prisma.car.update({
                where: {
                    id: car.id
                },
                data: {
                    ...car,
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}