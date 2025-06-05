import { FastifyReply, FastifyRequest } from "fastify";
import { Purchase } from "@prisma/client";
import { PurchaseService } from "../services/purchase.service";
import { PurchaseBody } from "../interfaces/purchase.interface";

export class PurchaseController {
    constructor(private readonly service: PurchaseService) { }

    async registerPurchase(req: FastifyRequest<{ Body: PurchaseBody }>, reply: FastifyReply) {
        try {
            console.log(req.body)
            const { purchase, movementId } = req.body;
                
            const registeredPurchase = await this.service.registerPurchase(purchase, movementId);

            return reply.send(registeredPurchase);
        } catch (error: any) {
            console.log(`Erro ao registrar entrada: ${error.message}`);

            switch (error.message) {
                case "":
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

    async updatePurchase(req: FastifyRequest<{ Body: Purchase }>, reply: FastifyReply) {
        try {
            const purchase: Purchase = req.body

            const updatedPurchase = await this.service.updatePurchase(purchase);

            return reply.send(updatedPurchase);
        } catch (error: any) {
            console.log(`Erro ao atualizar entrada: ${error.message}`);

            switch (error.message) {
                case "":
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

    async deletePurchase(req: FastifyRequest<{ Params: Purchase }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const deletedPurchase = await this.service.deletePurchase(Number(id));

            return reply.send(deletedPurchase);
        } catch (error: any) {
            console.log(`Erro ao excluir entrada: ${error.message}`);

            switch (error.message) {
                case "":
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