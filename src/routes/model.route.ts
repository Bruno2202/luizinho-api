import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ModelController } from '../controllers/model.controller';
import { ModelService } from '../services/model.service';
import { ModelRepository } from '../repositories/model.repository';
import { Model } from '@prisma/client';

const repository = new ModelRepository();
export const service = new ModelService(repository);
const controller = new ModelController(service);

export default async function modelRoute(fastify: FastifyInstance) {
    fastify.get('/model', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllModels(request, reply);
    });

    fastify.get(
        '/model/description/:description',
        async (request: FastifyRequest<{ Params: Model }>, reply: FastifyReply) => {
            return controller.getByDescription(request, reply)
        }
    )

    fastify.get(
        '/model/id/:id',
        async (request: FastifyRequest<{ Params: Model }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )

    fastify.post(
        '/model',
        async (request: FastifyRequest<{ Body: Model }>, reply: FastifyReply) => {
            return controller.registerModel(request, reply)
        }
    )

    fastify.put(
        '/model',
        async (request: FastifyRequest<{ Body: Model }>, reply: FastifyReply) => {
            return controller.updateModel(request, reply)
        }
    )

    fastify.delete(
        '/model/:id',
        async (request: FastifyRequest<{ Params: Model }>, reply: FastifyReply) => {
            return controller.deleteModel(request, reply)
        }
    )
}
