import { Model } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { ModelService } from "../services/model.service";

export class ModelController {
    constructor(private readonly service: ModelService) { }

    async getAllModels(req: FastifyRequest, reply: FastifyReply) {
        const models = await this.service.getAllModels();
        return reply.send(models);
    }

    async getByDescription(req: FastifyRequest<{ Params: Model }>, reply: FastifyReply) {
        try {
            const { description } = req.params

            const models: Model[] = await this.service.getByDescription(description);

            if (models.length === 0) {
                return reply.code(200).send({
                    models,
                    message: "Nenhum modelo encontrado"
                });
            }

            return reply.code(200).send(models);
        } catch (error: any) {
            console.log(`Erro ao buscar modelo: ${error.message}`);

            switch (error.message) {
                case "Descrição da modelo é inválido":
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

    async getById(req: FastifyRequest<{ Params: Model }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const model: Model = await this.service.getById(id);

            if (!model) {
                return reply.code(200).send({
                    model,
                    message: "Nenhum modelo encontrado"
                });
            }

            return reply.code(200).send(model);
        } catch (error: any) {
            console.log(`Erro ao buscar modelo: ${error.message}`);

            switch (error.message) {
                case "ID da modelo é inválido":
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

    async registerModel(req: FastifyRequest<{ Body: Model }>, reply: FastifyReply) {
        try {
            const model: Model = req.body

            const registeredModel = await this.service.registerModel(model);

            return reply.send(registeredModel);
        } catch (error: any) {
            console.log(`Erro ao cadastrar modelo: ${error.message}`);

            switch (error.message) {
                case "Descrição do modelo é inválido":
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

    async updateModel(req: FastifyRequest<{ Body: Model }>, reply: FastifyReply) {
        try {
            const model: Model = req.body

            const updatedModel = await this.service.updateModel(model);

            return reply.send(updatedModel);
        } catch (error: any) {
            console.log(`Erro ao atualizar modelo: ${error.message}`);

            switch (error.message) {
                case "ID do modelo é inválido":
                case "O modelo com o ID informado não foi encontrado":
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

    async deleteModel(req: FastifyRequest<{ Params: Model }>, reply: FastifyReply) {
        try {

            const { id } = req.params
            const numericId = Number(id);

            const deletedModel = await this.service.deleteModel(numericId);

            return reply.send(deletedModel);
        } catch (error: any) {
            console.log(`Erro ao excluir modelo: ${error.message}`);

            switch (error.message) {
                case "ID do modelo é inválido":
                case "O modelo com o ID informado não foi encontrado":
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
