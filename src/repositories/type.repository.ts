import { Type, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TypeRepository {
    async getAllTypes() {
        try {
            const res = await prisma.type.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(description: string) {
        try {
            const res = await prisma.type.findMany({
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
            const res = await prisma.type.findUnique({
                where: {
                    id: Number(id)
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerType(type: Type) {
        try {
            const { id, ...data } = type;

            const res = await prisma.type.create({ data });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteType(id: number) {
        try {
            const res = await prisma.type.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateType(type: Type) {
        try {
            const res = await prisma.type.update({
                where: {
                    id: type.id
                },
                data: {
                    description: type.description
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
