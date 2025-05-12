import { PrismaClient, Sale } from "@prisma/client";

const prisma = new PrismaClient();

export class SaleRepository {
    async getById(id: number) {
        try {
            const res = await prisma.sale.findUnique({
                where: {
                    id: id
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerSale(sale: Sale, movementId: number) {
        try {
            const saleData = {
                buyerId: sale.buyerId,
                saleValue: sale.saleValue,
                costValue: sale.costValue ? sale.costValue : null,
                observation: sale.observation ? sale.observation : null,
                paymentCondition: sale.paymentCondition ? sale.paymentCondition : null,
                saleDate: sale.saleDate ? new Date(sale.saleDate) : null
            }

            const result = await prisma.$transaction(async (tx) => {
                const saleRecord = await tx.sale.create({
                    data: saleData
                });

                await tx.movement.update({
                    where: {
                        id: movementId
                    },
                    data: {
                        saleId: saleRecord.id
                    }
                });

                return saleRecord;
            });

            return result;
        } catch (error: any) {
            throw new Error(error.message);

        }
    }

    async deleteSale(id: number) {
        try {
            await prisma.movement.deleteMany({
                where: {
                    saleId: id
                }
            })

            const res = await prisma.sale.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateSale(sale: Sale) {
        try {
            const res = await prisma.sale.update({
                where: {
                    id: sale.id
                },
                data: sale
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}