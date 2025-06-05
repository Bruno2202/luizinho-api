import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Client } from '@prisma/client';
import { ClientRepository } from '../repositories/client.repository';
import { ClientService } from '../services/client.service';
import { ClientController } from '../controllers/client.controller';
import { service as cityService } from './city.route';

const repository = new ClientRepository();
export const service = new ClientService(repository, cityService);
const controller = new ClientController(service);

export default async function clientRoute(fastify: FastifyInstance) {
    fastify.get('/client', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllClients(request, reply)
    })

    fastify.get(
        '/client/name/:name',
        async (request: FastifyRequest<{ Params: Client }>, reply: FastifyReply) => {
            return controller.getByName(request, reply)
        }
    )

    fastify.get(
        '/client/id/:id',
        async (request: FastifyRequest<{ Params: Client }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )

    fastify.post(
        '/client',
        async (request: FastifyRequest<{ Body: Client }>, reply: FastifyReply) => {
            return controller.registerClient(request, reply)
        }
    )

    fastify.put(
        '/client',
        async (request: FastifyRequest<{ Body: Client }>, reply: FastifyReply) => {
            return controller.updateClient(request, reply)
        }
    )

    fastify.delete(
        '/client/:id',
        async (request: FastifyRequest<{ Params: Client }>, reply: FastifyReply) => {
            return controller.deleteClient(request, reply)
        }
    )
}