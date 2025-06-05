import { FastifyReply, FastifyRequest } from "fastify";
import { ClientService } from "../services/client.service";
import { Client } from "@prisma/client";

export class ClientController {
    constructor(private readonly service: ClientService) { }

    async getAllClients(req: FastifyRequest, reply: FastifyReply) {
        const clients = await this.service.getAllClients();

        return reply.send(clients);
    }

    async getByName(req: FastifyRequest<{ Params: Client }>, reply: FastifyReply) {
        try {
            const { name } = req.params

            const clients: Client[] = await this.service.getByName(name);

            if (clients.length === 0) {
                return reply.code(200).send({
                    clients,
                    message: "Nenhum cliente encontrado"
                });
            }

            return reply.code(200).send(clients);
        } catch (error: any) {
            console.log(`Erro ao buscar cliente: ${error.message}`);

            switch (error.message) {
                case "Nome do cliente é inválido":
                    reply.code(404).send({
                        clients: [],
                        message: error.message
                    });
                    break;

                default:
                    reply.code(500).send({
                        message: error.message
                    });
                    break;
            }
        }
    }

    async getById(req: FastifyRequest<{ Params: Client }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const client: Client = await this.service.getById(id);

            if (!client) {
                return reply.code(200).send({
                    client,
                    message: "Nenhum cliente encontrado"
                });
            }

            return reply.code(200).send(client);
        } catch (error: any) {
            console.log(`Erro ao buscar cliente: ${error.message}`);

            switch (error.message) {
                case "ID do cliente é inválido":
                    reply.code(404).send({
                        clients: [],
                        message: error.message
                    });
                    break;

                default:
                    reply.code(500).send({
                        message: error.message
                    });
                    break;
            }
        }
    }

    async registerClient(req: FastifyRequest<{ Body: Client }>, reply: FastifyReply) {
        try {
            const client: Client = req.body

            const registeredClient = await this.service.registerClient(client);

            return reply.send(registeredClient);
        } catch (error: any) {
            console.log(`Erro ao cadastrar cliente: ${error.message}`);

            switch (error.message) {
                case "O nome do cliente é inválido":
                case "O CPF do cliente é inválido":
                case "O ID da cidade do cliente é inválido":
                case "O CPF já está registrado":
                case "O RG informado é inválido":
                    reply.code(500).send({
                        message: error.message
                    });
                    break;

                default:
                    reply.code(500).send({
                        message: error.message
                    });
                    break;
            }
        }
    }

    async updateClient(req: FastifyRequest<{ Body: Client }>, reply: FastifyReply) {
        try {
            const client: Client = req.body

            const updatedClient = await this.service.updateClient(client);

            return reply.send(updatedClient);
        } catch (error: any) {
            console.log(`Erro ao atualizar cliente: ${error.message}`);

            switch (error.message) {
                case "ID do cliente é inválido":
                case "O cliente com o ID informado não foi encontrado":
                case "O CPF já está registrado":
                case "O RG informado é inválido":
                    reply.code(400).send({
                        message: error.message
                    });
                    break;

                default:
                    reply.code(500).send({
                        message: error.message
                    });
                    break;
            }
        }
    }

    async deleteClient(req: FastifyRequest<{ Params: Client }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const deletedClient = await this.service.deleteClient(id);

            return reply.send(deletedClient);
        } catch (error: any) {
            console.log(`Erro ao excluir cliente: ${error.message}`);

            switch (error.message) {
                case "ID do cliente é inválido":
                case "O cliente com o ID informado não foi encontrado":
                    reply.code(400).send({
                        message: error.message
                    });
                    break;

                default:
                    reply.code(500).send({
                        message: error.message
                    });
                    break;
            }
        }
    }
}