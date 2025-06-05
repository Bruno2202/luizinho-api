import { Brand, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BrandRepository {
    async getAllBrands() {
        try {
            const res = await prisma.brand.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByName(name: string) {
        try {
            const res = await prisma.brand.findMany({
                where: {
                    name: {
                        contains: name,
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
            const res = await prisma.brand.findUnique({
                where: {
                    id: Number(id)
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerBrand(brand: Brand) {
        try {
            const { id, ...data } = brand;

            const res = await prisma.brand.create({ data })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteBrand(id: number) {
        try {
            const res = await prisma.brand.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateBrand(brand: Brand) {
        try {
            const res = await prisma.brand.update({
                where: {
                    id: brand.id
                },
                data: {
                    name: brand.name
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}