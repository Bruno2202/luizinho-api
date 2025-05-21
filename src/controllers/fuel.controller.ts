import { FastifyReply, FastifyRequest } from "fastify";
import { Fuel } from "@prisma/client";
import { FuelService } from "../services/fuel.service";

export class FuelController {
    constructor(private readonly service: FuelService) { }

    async getAllFuels(req: FastifyRequest, reply: FastifyReply) {
        const fuels = await this.service.getAllFuels();

        return reply.send(fuels);
    }

    async getByDescritpion(req: FastifyRequest<{ Params: Fuel }>, reply: FastifyReply) {
        try {
            const { description } = req.params

            const fuels: Fuel[] = await this.service.getByDescription(description);

            if (fuels.length === 0) {
                return reply.code(200).send({
                    fuels,
                    message: "Nenhum combustível encontrado"
                });
            }

            return reply.code(200).send(fuels);
        } catch (error: any) {
            console.log(`Erro ao buscar combustível: ${error.message}`);

            switch (error.message) {
                case "Descrição do combustível é inválida":
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

    async getById(req: FastifyRequest<{ Params: Fuel }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const fuel: Fuel = await this.service.getById(id);

            if (!fuel) {
                return reply.code(200).send({
                    fuel,
                    message: "Nenhum combustível encontrado"
                });
            }

            return reply.code(200).send(fuel);
        } catch (error: any) {
            console.log(`Erro ao buscar combustível: ${error.message}`);

            switch (error.message) {
                case "ID do combustível é inválida":
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