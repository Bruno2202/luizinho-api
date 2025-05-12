import { Movement, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MovementRepository {
    async getAllMovements() {
        try {
            const res = await prisma.movement.findMany();

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
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerMovement(movement: Movement) {
        try {
            const res = await prisma.movement.create({
                data: movement
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