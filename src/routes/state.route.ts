import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { State } from '@prisma/client';
import { StateService } from '../services/state.service';
import { StateRepository } from '../repositories/state.repository';
import { StateController } from '../controllers/state.controller';

const repository = new StateRepository;
const service = new StateService(repository);
const controller = new StateController(service);

export default async function stateRoute(fastify: FastifyInstance) {
    fastify.get('/state', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllStates(request, reply)
    })

    fastify.get(
        '/state/name/:name',
        async (request: FastifyRequest<{ Params: State }>, reply: FastifyReply) => {
            return controller.getByName(request, reply)
        }
    )

    fastify.get(
        '/state/id/:id',
        async (request: FastifyRequest<{ Params: State }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )
}
