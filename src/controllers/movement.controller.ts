import { FastifyReply, FastifyRequest } from "fastify";
import { Movement } from "@prisma/client";
import { MovementService } from "../services/movement.service";

export class MovementController {
    constructor(private readonly service: MovementService) { }

    async getAllMovements(req: FastifyRequest, reply: FastifyReply) {
        const movements = await this.service.getAllMovements();

        return reply.send(movements);
    }

    async getByCar(req: FastifyRequest<{ Params: { car: string } }>, reply: FastifyReply) {
        try {
            const { car } = req.params;

            const movements: Movement[] = await this.service.getByCar(car);

            if (movements.length === 0) {
                return reply.code(200).send({
                    movements,
                    message: "Nenhuma movimentação encontrada"
                });
            }

            return reply.code(200).send(movements);
        } catch (error: any) {
            console.log(`Erro ao buscar movimentação: ${error.message}`);

            switch (error.message) {
                case "Descrição do carro é inválida":
                    reply.code(404).send({ message: error.message });
                    break;

                default:
                    reply.code(500).send({ message: error.message });
                    break;
            }
        }
    }

    async getById(req: FastifyRequest<{ Params: Movement }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const movement: Movement = await this.service.getById(Number(id));

            if (!movement) {
                return reply.code(200).send({
                    movement,
                    message: "Nenhuma movimentação encontrada"
                });
            }

            return reply.code(200).send(movement);
        } catch (error: any) {
            console.log(`Erro ao buscar movimentação: ${error.message}`);

            switch (error.message) {
                case "ID da movimentação é inválido":
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

    async registerMovement(req: FastifyRequest<{ Body: Movement }>, reply: FastifyReply) {
        try {
            const movement: Movement = req.body

            const registeredMovement = await this.service.registerMovement(movement);

            return reply.send(registeredMovement);
        } catch (error: any) {
            console.log(`Erro ao registrar movimentação: ${error.message}`);

            switch (error.message) {
                case "ID da movimentação é inválido":
                case "A movimentação com o ID informado não foi encontrada":
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

    async updateMovement(req: FastifyRequest<{ Body: Movement }>, reply: FastifyReply) {
        try {
            const movement: Movement = req.body

            const updatedMovement = await this.service.updateMovement(movement);

            return reply.send(updatedMovement);
        } catch (error: any) {
            console.log(`Erro ao atualizar movimentação: ${error.message}`);

            switch (error.message) {
                case "ID da movimentação é inválido":
                case "A movimentação com o ID informado não foi encontrada":
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

    async deleteMovement(req: FastifyRequest<{ Params: Movement }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const deletedMovement = await this.service.deleteMovement(Number(id));

            return reply.send(deletedMovement);
        } catch (error: any) {
            console.log(`Erro ao excluir movimentação: ${error.message}`);

            switch (error.message) {
                case "ID da movimentação é inválido":
                case "A movimentação com o ID informado não foi encontrada":
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