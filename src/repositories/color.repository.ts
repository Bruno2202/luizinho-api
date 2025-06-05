import { Color, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ColorRepository {
    async getAllColors() {
        try {
            const res = await prisma.color.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(description: string) {
        try {
            const res = await prisma.color.findMany({
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
            const res = await prisma.color.findUnique({
                where: {
                    id: Number(id)
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerColor(color: Color) {
        try {
            const { id, ...data } = color;

            const res = await prisma.color.create({ data })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteColor(id: number) {
        try {
            const res = await prisma.color.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateColor(color: Color) {
        try {
            const res = await prisma.color.update({
                where: {
                    id: color.id
                },
                data: {
                    description: color.description
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
