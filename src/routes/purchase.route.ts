import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Purchase } from '@prisma/client';
import { PurchaseRepository } from '../repositories/purchase.repository';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseController } from '../controllers/purchase.controller';
import { PurchaseBody } from '../interfaces/purchase.interface';
import { service as clienteService } from '../routes/client.route';
import { service as movementService } from '../routes/movement.route';

const repository = new PurchaseRepository();
const service = new PurchaseService(repository, clienteService, movementService);
const controller = new PurchaseController(service);

export default async function purchaseRoute(fastify: FastifyInstance) {
    fastify.post(
        '/purchase',
        async (request: FastifyRequest<{ Body: PurchaseBody }>, reply: FastifyReply) => {
            return controller.registerPurchase(request, reply)
        }
    )

    fastify.put(
        '/purchase',
        async (request: FastifyRequest<{ Body: Purchase }>, reply: FastifyReply) => {
            return controller.updatePurchase(request, reply)
        }
    )

    fastify.delete(
        '/purchase/:id',
        async (request: FastifyRequest<{ Params: Purchase }>, reply: FastifyReply) => {
            return controller.deletePurchase(request, reply)
        }
    )
}