import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TypeService } from '../services/type.service';
import { TypeController } from '../controllers/type.controller';
import { TypeRepository } from '../repositories/type.repository';
import { Type } from '@prisma/client';

const repository = new TypeRepository();
export const service = new TypeService(repository);
const controller = new TypeController(service);

export default async function typeRoute(fastify: FastifyInstance) {
    fastify.get('/type', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllTypes(request, reply);
    });

    fastify.get(
        '/type/description/:description',
        async (request: FastifyRequest<{ Params: Type }>, reply: FastifyReply) => {
            return controller.getByDescription(request, reply)
        }
    )

    fastify.get(
        '/type/id/:id',
        async (request: FastifyRequest<{ Params: Type }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )

    fastify.post(
        '/type',
        async (request: FastifyRequest<{ Body: Type }>, reply: FastifyReply) => {
            return controller.registerType(request, reply)
        }
    )

    fastify.put(
        '/type',
        async (request: FastifyRequest<{ Body: Type }>, reply: FastifyReply) => {
            return controller.updateType(request, reply)
        }
    )

    fastify.delete(
        '/type/:id',
        async (request: FastifyRequest<{ Params: Type }>, reply: FastifyReply) => {
            return controller.deleteType(request, reply)
        }
    )
}
