import { State, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class StateRepository {
    async getAllStates() {
        try {
            const res = await prisma.state.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByName(name: string) {
        try {
            const res = await prisma.state.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: name,
                                mode: "insensitive",
                            },
                        },
                        {
                            id: {
                                contains: name,
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

    async getById(id: string) {
        try {
            const res = await prisma.state.findUnique({
                where: {
                    id: id
                },
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}