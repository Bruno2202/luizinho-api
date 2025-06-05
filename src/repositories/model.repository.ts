import { Model, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ModelRepository {
    async getAllModels() {
        try {
            const res = await prisma.model.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(description: string) {
        try {
            const res = await prisma.model.findMany({
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
            const res = await prisma.model.findUnique({
                where: {
                    id: Number(id)
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerModel(model: Model) {
        try {
            const { id, ...data } = model;

            const res = await prisma.model.create({ data });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteModel(id: number) {
        try {
            const res = await prisma.model.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateModel(model: Model) {
        try {
            const res = await prisma.model.update({
                where: {
                    id: model.id
                },
                data: {
                    description: model.description
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
