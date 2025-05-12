import { Client, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ClientRepository {
    async getAllClients() {
        try {
            const res = await prisma.client.findMany();

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByName(name: string) {
        try {
            const res = await prisma.client.findMany({
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

    async getById(id: string) {
        try {
            const res = await prisma.client.findUnique({
                where: {
                    id: id
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByCpf(cpf: string) {
        try {
            const res = await prisma.client.findUnique({
                where: {
                    cpf: cpf
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerClient(client: Client) {
        const { cityId, ...clientData } = client;
        const cityIdNumber = Number(cityId);

        try {
            const res = await prisma.client.create({
                data: {
                    ...clientData,
                    cityId: cityIdNumber,
                },
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteClient(id: string) {
        try {
            const res = await prisma.client.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateClient(client: Client) {

        try {
            const res = await prisma.client.update({
                where: {
                    id: client.id
                },
                data: client
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}