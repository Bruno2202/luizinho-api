import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ColorService } from '../services/color.service';
import { ColorController } from '../controllers/color.controller';
import { ColorRepository } from '../repositories/color.repository';
import { Color } from '@prisma/client';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const repository = new ColorRepository();
export const service = new ColorService(repository);
const controller = new ColorController(service);

export default async function colorRoute(fastify: FastifyInstance) {
    fastify.addHook('preHandler', AuthMiddleware);

    fastify.get('/color', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllColors(request, reply)
    })

    fastify.get(
        '/color/description/:description',
        async (request: FastifyRequest<{ Params: Color }>, reply: FastifyReply) => {
            return controller.getByDescription(request, reply)
        }
    )

    fastify.get(
        '/color/id/:id',
        async (request: FastifyRequest<{ Params: Color }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )

    fastify.post(
        '/color',
        async (request: FastifyRequest<{ Body: Color }>, reply: FastifyReply) => {
            return controller.registerColor(request, reply)
        }
    )

    fastify.put(
        '/color',
        async (request: FastifyRequest<{ Body: Color }>, reply: FastifyReply) => {
            return controller.updateColor(request, reply)
        }
    )

    fastify.delete(
        '/color/:id',
        async (request: FastifyRequest<{ Params: Color }>, reply: FastifyReply) => {
            return controller.deleteColor(request, reply)
        }
    )
}
