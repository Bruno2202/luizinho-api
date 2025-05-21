import { Color } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { ColorService } from "../services/color.service";

export class ColorController {
    constructor(private readonly service: ColorService) { }

    async getAllColors(req: FastifyRequest, reply: FastifyReply) {
        const colors = await this.service.getAllColors();

        return reply.send(colors);
    }

    async getById(req: FastifyRequest<{ Params: Color }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const color: Color = await this.service.getById(id);

            if (!color) {
                return reply.code(200).send({
                    message: "Nenhuma cor encontrada"
                });
            }

            return reply.code(200).send(color);
        } catch (error: any) {
            console.log(`Erro ao buscar cor: ${error.message}`);

            switch (error.message) {
                case "ID da cor é inválida":
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

    async getByDescription(req: FastifyRequest<{ Params: Color }>, reply: FastifyReply) {
        try {
            const { description } = req.params

            const colors: Color[] = await this.service.getByDescription(description);

            if (colors.length === 0) {
                return reply.code(200).send({
                    message: "Nenhuma cor encontrada"
                });
            }

            return reply.code(200).send(colors);
        } catch (error: any) {
            console.log(`Erro ao buscar cor: ${error.message}`);

            switch (error.message) {
                case "Descrição da cor é inválida":
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

    async registerColor(req: FastifyRequest<{ Body: Color }>, reply: FastifyReply) {
        try {
            const color: Color = req.body

            const registeredColor = await this.service.registerColor(color);

            return reply.send(registeredColor);
        } catch (error: any) {
            console.log(`Erro ao cadastrar cor: ${error.message}`);

            switch (error.message) {
                case "Descrição da cor é inválido":
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

    async updateColor(req: FastifyRequest<{ Body: Color }>, reply: FastifyReply) {
        try {
            const color: Color = req.body

            const updatedColor = await this.service.updateColor(color);

            return reply.send(updatedColor);
        } catch (error: any) {
            console.log(`Erro ao atualizar cor: ${error.message}`);

            switch (error.message) {
                case "ID da cor é inválido":
                case "A cor com o ID informado não foi encontrada":
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

    async deleteColor(req: FastifyRequest<{ Params: Color }>, reply: FastifyReply) {
        try {

            const { id } = req.params
            const numericId = Number(id);

            const deletedColor = await this.service.deleteColor(numericId);

            return reply.send(deletedColor);
        } catch (error: any) {
            console.log(`Erro ao excluir cor: ${error.message}`);

            switch (error.message) {
                case "ID da cor é inválido":
                case "A cor com o ID informado não foi encontrada":
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