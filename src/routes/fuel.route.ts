import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Fuel } from '@prisma/client';
import { FuelRepository } from '../repositories/fuel.repository';
import { FuelService } from '../services/fuel.service';
import { FuelController } from '../controllers/fuel.controller';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const repository = new FuelRepository;
export const service = new FuelService(repository);
const controller = new FuelController(service);

export default async function fuelRoute(fastify: FastifyInstance) {
    fastify.addHook('preHandler', AuthMiddleware);

    fastify.get('/fuel', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllFuels(request, reply)
    })

    fastify.get(
        '/fuel/description/:description',
        async (request: FastifyRequest<{ Params: Fuel }>, reply: FastifyReply) => {
            return controller.getByDescritpion(request, reply)
        }
    )

    fastify.get(
        '/fuel/id/:id',
        async (request: FastifyRequest<{ Params: Fuel }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )
}
