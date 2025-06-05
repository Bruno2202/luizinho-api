import { Movement, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MovementRepository {
    async getAllMovements() {
        try {
            const res = await prisma.movement.findMany({
                include: {
                    car: true,
                    purchase: true,
                    sale: true
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByCar(car: string) {
        try {
            if (!car || car.trim() === "") {
                throw new Error("Descrição do carro é inválida");
            }

            const res = await prisma.movement.findMany({
                where: {
                    car: {
                        description: {
                            contains: car,
                            mode: "insensitive"
                        }
                    }
                },
                include: {
                    car: true,
                    purchase: true,
                    sale: true
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    async getById(id: number) {
        try {
            const res = await prisma.movement.findUnique({
                where: {
                    id: id
                },
                include: {
                    car: true,
                    purchase: true,
                    sale: true
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerMovement(movement: Movement) {
        try {
            const { id, ...data } = movement;

            const res = await prisma.movement.create({
                data
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteMovement(id: number) {
        try {
            const res = await prisma.movement.delete({
                where: {
                    id: id
                }
            })

            if (res.purchaseId) {
                await prisma.purchase.delete({
                    where: {
                        id: res.purchaseId
                    }
                })

                if (res.saleId) {
                    await prisma.sale.delete({
                        where: {
                            id: res.saleId
                        }
                    })
                }
            }

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateMovement(movement: Movement) {

        try {
            const res = await prisma.movement.update({
                where: {
                    id: movement.id
                },
                data: movement
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}