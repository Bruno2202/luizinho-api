import { FastifyReply, FastifyRequest } from "fastify";
import { State } from "@prisma/client";
import { StateService } from "../services/state.service";

export class StateController {
    constructor(private readonly service: StateService) { }

    async getAllStates(req: FastifyRequest, reply: FastifyReply) {
        const states = await this.service.getAllStates();

        return reply.send(states);
    }

    async getByName(req: FastifyRequest<{ Params: State }>, reply: FastifyReply) {
        try {
            const { name } = req.params

            const states: State[] = await this.service.getByName(name);

            if (states.length === 0) {
                return reply.code(200).send({
                    states,
                    message: "Nenhum estado encontrado"
                });
            }

            return reply.code(200).send(states);
        } catch (error: any) {
            console.log(`Erro ao buscar estado: ${error.message}`);

            switch (error.message) {
                case "Nome do estado é inválido":
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

    async getById(req: FastifyRequest<{ Params: State }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const state = await this.service.getById(id);

            if (!state) {
                return reply.code(200).send({
                    state,
                    message: "Nenhum estado encontrado"
                });
            }
            return reply.code(200).send(state);
        } catch (error: any) {
            console.log(`Erro ao buscar estado: ${error.message}`);

            switch (error.message) {
                case "ID do estado é inválido":
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