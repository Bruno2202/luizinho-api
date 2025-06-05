import { Client, PrismaClient } from "@prisma/client";
import { formatCpf } from "../utils/formatCpf";
import { formatDate } from "../utils/formatDate";

const prisma = new PrismaClient();

export class ClientRepository {
    async getAllClients() {
        try {
            const res = await prisma.client.findMany({
                include: {
                    city: true
                }
            });

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
                },
                include: {
                    city: true,
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
                },
                include: {
                    city: true
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
        const { id, cityId, ...clientData } = client;
        console.log(client)

        try {
            const res = await prisma.client.create({
                data: {
                    ...clientData,
                    cpf: client.cpf ? formatCpf(client.cpf) : null,
                    birthDate: client.birthDate ? formatDate(client.birthDate) : null,
                    ...(client.cityId != null && { city: { connect: { id: client.cityId } } }),
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
        const { id, cityId, ...clientData } = client;
        console.log(client)
        try {
            const res = await prisma.client.update({
                where: {
                    id: client.id
                },
                data: {
                    ...clientData,
                    cpf: client.cpf ? formatCpf(client.cpf) : null,
                    birthDate: client.birthDate ? formatDate(client.birthDate) : null,
                    ...(client.cityId != null && { city: { connect: { id: client.cityId } } }),
                },
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}