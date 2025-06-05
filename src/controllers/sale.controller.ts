import { FastifyReply, FastifyRequest } from "fastify";
import { Sale } from "@prisma/client";
import { SaleService } from "../services/sale.service";
import { SaleBody } from "../interfaces/sale.interface";

export class SaleController {
    constructor(private readonly service: SaleService) { }

    async registerSale(req: FastifyRequest<{ Body: SaleBody }>, reply: FastifyReply) {
        try {
            const { sale, movementId }: SaleBody = req.body;

            const registeredSale = await this.service.registerSale(sale, movementId);

            return reply.send(registeredSale);
        } catch (error: any) {
            console.log(`Erro ao registrar saída: ${error.message}`);

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

    async updateSale(req: FastifyRequest<{ Body: Sale }>, reply: FastifyReply) {
        try {
            const sale: Sale = req.body

            const updatedSale = await this.service.updateSale(sale);

            return reply.send(updatedSale);
        } catch (error: any) {
            console.log(`Erro ao atualizar saída: ${error.message}`);

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

    async deleteSale(req: FastifyRequest<{ Params: Sale }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const deletedSale = await this.service.deleteSale(Number(id));

            return reply.send(deletedSale);
        } catch (error: any) {
            console.log(`Erro ao excluir saída: ${error.message}`);

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