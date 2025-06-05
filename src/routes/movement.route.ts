import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Movement } from '@prisma/client';
import { MovementService } from '../services/movement.service';
import { MovementController } from '../controllers/movement.controller';
import { service as carService } from '../routes/car.route';
import { MovementRepository } from '../repositories/movement.repository';

const repository = new MovementRepository();
export const service = new MovementService(repository, carService);
const controller = new MovementController(service);

export default async function movementRoute(fastify: FastifyInstance) {
    fastify.get('/movement', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllMovements(request, reply)
    });

    fastify.get('/movement/car/:car', async (request: FastifyRequest<{ Params: { car: string } }>, reply: FastifyReply) => {
        return controller.getByCar(request, reply);
    });

    fastify.get('/movement/id/:id', async (request: FastifyRequest<{ Params: Movement }>, reply: FastifyReply) => {
        return controller.getById(request, reply)
    });

    fastify.post(
        '/movement',
        async (request: FastifyRequest<{ Body: Movement }>, reply: FastifyReply) => {
            return controller.registerMovement(request, reply)
        }
    );

    fastify.put(
        '/movement',
        async (request: FastifyRequest<{ Body: Movement }>, reply: FastifyReply) => {
            return controller.updateMovement(request, reply)
        }
    );

    fastify.delete(
        '/movement/:id',
        async (request: FastifyRequest<{ Params: Movement }>, reply: FastifyReply) => {
            return controller.deleteMovement(request, reply)
        }
    );
}