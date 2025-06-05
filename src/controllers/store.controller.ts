import { FastifyReply, FastifyRequest } from "fastify";
import { StoreService } from "../services/store.service";
import { Store } from "@prisma/client";

export class StoreController {
    constructor(private readonly service: StoreService) { }

    async getStore(req: FastifyRequest, reply: FastifyReply) {
        const store = await this.service.getStore();

        return reply.send(store);
    }

    async updateStore(req: FastifyRequest<{ Body: Store }>, reply: FastifyReply) {
        try {
            const store: Store = req.body

            const updatedStore = await this.service.updateStore(store);

            return reply.send(updatedStore);
        } catch (error: any) {
            console.log(`Erro ao atualizar loja: ${error.message}`);

            switch (error.message) {
                case "ID da loja é inválido":
                case "A loja não foi encontrada":
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