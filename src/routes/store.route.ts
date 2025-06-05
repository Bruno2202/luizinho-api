import { Store } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StoreRepository } from '../repositories/store.repository';
import { StoreService } from '../services/store.service';
import { StoreController } from '../controllers/store.controller';

const repository = new StoreRepository();
export const service = new StoreService(repository);
const controller = new StoreController(service);

export default async function storeRoute(fastify: FastifyInstance) {
    fastify.get('/store', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getStore(request, reply)
    })

    fastify.put(
        '/store',
        async (request: FastifyRequest<{ Body: Store }>, reply: FastifyReply) => {
            return controller.updateStore(request, reply)
        }
    )
}
