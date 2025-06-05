import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Sale } from '@prisma/client';
import { SaleRepository } from '../repositories/sale.repository';
import { SaleService } from '../services/sale.service';
import { SaleController } from '../controllers/sale.controller';
import { service as clientService } from '../routes/client.route';
import { SaleBody } from '../interfaces/sale.interface';
import { service as movementService } from '../routes/movement.route';

const repository = new SaleRepository();
const service = new SaleService(repository, clientService, movementService);
const controller = new SaleController(service);

export default async function saleRoute(fastify: FastifyInstance) {
    fastify.post(
        '/sale',
        async (request: FastifyRequest<{ Body: SaleBody }>, reply: FastifyReply) => {
            return controller.registerSale(request, reply)
        }
    )

    fastify.put(
        '/sale',
        async (request: FastifyRequest<{ Body: Sale }>, reply: FastifyReply) => {
            return controller.updateSale(request, reply)
        }
    )

    fastify.delete(
        '/sale/:id',
        async (request: FastifyRequest<{ Params: Sale }>, reply: FastifyReply) => {
            return controller.deleteSale(request, reply)
        }
    )
}