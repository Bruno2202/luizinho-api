import { FastifyReply, FastifyRequest } from "fastify";
import { TransmissionService } from "../services/transmission.service";
import { Transmission } from "@prisma/client";

export class TransmissionController {
    constructor(private readonly service: TransmissionService) { }

    async getAllTransmissions(req: FastifyRequest, reply: FastifyReply) {
        const transmissions = await this.service.getAllTransmissions();

        return reply.send(transmissions);
    }

    async getByDescription(req: FastifyRequest<{ Params: Transmission }>, reply: FastifyReply) {
        try {
            const { description } = req.params

            const descriptions: Transmission[] = await this.service.getByDescription(description);

            if (descriptions.length === 0) {
                return reply.code(200).send({
                    descriptions,
                    message: "Nenhuma transmissão encontrada"
                });
            }

            return reply.code(200).send(descriptions);
        } catch (error: any) {
            console.log(`Erro ao buscar transmissão: ${error.message}`);

            switch (error.message) {
                case "Nome da transmissão é inválido":
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

    async getById(req: FastifyRequest<{ Params: Transmission }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const transmission: Transmission = await this.service.getById(id);

            if (!transmission) {
                return reply.code(200).send({
                    transmission,
                    message: "Nenhuma transmissão encontrada"
                });
            }

            return reply.code(200).send(id);
        } catch (error: any) {
            console.log(`Erro ao buscar transmissão: ${error.message}`);

            switch (error.message) {
                case "ID da transmissão é inválido":
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
}