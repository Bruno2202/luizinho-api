import { Transmission, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TransmissionRepository {
    async getAllTransmissions() {
        try {
            const res = await prisma.transmission.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: number) {
        try {
            const res = await prisma.transmission.findUnique({
                where: {
                    id: Number(id)
                },
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(description: string) {
        try {
            const res = await prisma.transmission.findMany({
                where: {
                    description: {
                        contains: description,
                        mode: "insensitive",
                    },
                },
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}