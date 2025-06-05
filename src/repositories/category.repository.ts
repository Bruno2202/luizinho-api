import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {
    async getAllCategories() {
        try {
            const res = await prisma.category.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByDescription(description: string) {
        try {
            const res = await prisma.category.findMany({
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
            const res = await prisma.category.findUnique({
                where: {
                    id: Number(id)
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerCategory(category: Category) {
        try {
            const { id, ...data } = category;
            const res = await prisma.category.create({ data });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteCategory(id: number) {
        try {

            const res = await prisma.category.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCategory(category: Category) {
        try {
            const res = await prisma.category.update({
                where: {
                    id: category.id
                },
                data: {
                    description: category.description
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}