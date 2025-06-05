import { Type } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { TypeService } from "../services/type.service";

export class TypeController {
    constructor(private readonly service: TypeService) { }

    async getAllTypes(req: FastifyRequest, reply: FastifyReply) {
        const types = await this.service.getAllTypes();

        return reply.send(types);
    }

    async getByDescription(req: FastifyRequest<{ Params: Type }>, reply: FastifyReply) {
        try {
            const { description } = req.params

            const types: Type[] = await this.service.getByDescription(description);

            if (types.length === 0) {
                return reply.code(200).send({
                    types,
                    message: "Nenhum tipo encontrado"
                });
            }

            return reply.code(200).send(types);
        } catch (error: any) {
            console.log(`Erro ao buscar tipo: ${error.message}`);

            switch (error.message) {
                case "Descrição do tipo é inválido":
                    reply.code(404).send({
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

    async getById(req: FastifyRequest<{ Params: Type }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const type: Type = await this.service.getById(id);

            if (!type) {
                return reply.code(200).send({
                    type,
                    message: "Nenhum tipo encontrado"
                });
            }

            return reply.code(200).send(type);
        } catch (error: any) {
            console.log(`Erro ao buscar tipo: ${error.message}`);

            switch (error.message) {
                case "ID do tipo é inválido":
                    reply.code(404).send({
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

    async registerType(req: FastifyRequest<{ Body: Type }>, reply: FastifyReply) {
        try {
            const type: Type = req.body

            const registeredType = await this.service.registerType(type);

            return reply.send(registeredType);
        } catch (error: any) {
            console.log(`Erro ao cadastrar tipo: ${error.message}`);

            switch (error.message) {
                case "Descrição do tipo é inválida":
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

    async updateType(req: FastifyRequest<{ Body: Type }>, reply: FastifyReply) {
        try {
            const type: Type = req.body

            const updatedType = await this.service.updateType(type);

            return reply.send(updatedType);
        } catch (error: any) {
            console.log(`Erro ao atualizar tipo: ${error.message}`);

            switch (error.message) {
                case "ID do tipo é inválido":
                case "O tipo com o ID informado não foi encontrado":
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

    async deleteType(req: FastifyRequest<{ Params: Type }>, reply: FastifyReply) {
        try {

            const { id } = req.params
            const numericId = Number(id);

            const deletedType = await this.service.deleteType(numericId);

            return reply.send(deletedType);
        } catch (error: any) {
            console.log(`Erro ao excluir tipo: ${error.message}`);

            switch (error.message) {
                case "ID do tipo é inválido":
                case "O tipo com o ID informado não foi encontrado":
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
}