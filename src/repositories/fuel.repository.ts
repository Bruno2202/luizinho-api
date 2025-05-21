import { Fuel, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FuelRepository {
    async getAllFuels() {
        try {
            const res = await prisma.fuel.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: string) {
        try {
            const res = await prisma.fuel.findUnique({
                where: {
                    id: id
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(description: string) {
        try {
            const res = await prisma.fuel.findMany({
                where: {
                    OR: [
                        {
                            description: {
                                contains: description,
                                mode: "insensitive",
                            },
                        },
                        {
                            id: {
                                contains: description,
                                mode: "insensitive",
                            },
                        },
                    ],
                },
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}