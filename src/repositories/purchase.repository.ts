import { PrismaClient, Purchase } from "@prisma/client";

const prisma = new PrismaClient();

export class PurchaseRepository {
    async getById(id: number) {
        try {
            const res = await prisma.purchase.findUnique({
                where: {
                    id: id
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerPurchase(purchase: Purchase, movementId: number) {
        try {
            const purchaseData = {
                sellerId: purchase.sellerId,
                purchaseValue: purchase.purchaseValue,
                purchaseDate: purchase.purchaseDate ? new Date(purchase.purchaseDate) : null
            }

            const result = await prisma.$transaction(async (tx) => {
                const purchaseRecord = await tx.purchase.create({
                    data: purchaseData
                });

                await tx.movement.update({
                    where: {
                        id: movementId
                    },
                    data: {
                        purchaseId: purchaseRecord.id,
                    }
                });

                return purchaseRecord;
            });

            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deletePurchase(id: number) {
        try {
            await prisma.movement.deleteMany({
                where: {
                    purchaseId: id
                }
            })

            const res = await prisma.purchase.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updatePurchase(purchase: Purchase) {
        try {
            const res = await prisma.purchase.update({
                where: {
                    id: purchase.id
                },
                data: purchase
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}