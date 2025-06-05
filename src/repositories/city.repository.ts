import { City, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CityRepository {
    async getAllCities() {
        try {
            const res = await prisma.city.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByName(name: string) {
        try {
            const res = await prisma.city.findMany({
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
            const res = await prisma.city.findUnique({
                where: {
                    id: Number(id)
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerCity(city: City) {
        try {
            const { id, ...data } = city;

            const res = await prisma.city.create({ data })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteCity(id: number) {
        try {
            const res = await prisma.city.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCity(city: City) {
        try {
            const res = await prisma.city.update({
                where: {
                    id: city.id
                },
                data: {
                    name: city.name
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
