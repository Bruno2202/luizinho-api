import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Transmission } from '@prisma/client';
import { TransmissionRepository } from '../repositories/transmission.repository';
import { TransmissionService } from '../services/transmission.service';
import { TransmissionController } from '../controllers/transmission.controller';

const repository = new TransmissionRepository;
export const service = new TransmissionService(repository);
const controller = new TransmissionController(service);

export default async function transmissionRoute(fastify: FastifyInstance) {
    fastify.get('/transmission', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllTransmissions(request, reply)
    })

    fastify.get(
        '/transmission/descriptionq:description',
        async (request: FastifyRequest<{ Params: Transmission }>, reply: FastifyReply) => {
            return controller.getByDescription(request, reply)
        }
    )

    fastify.get(
        '/transmission/id/:id',
        async (request: FastifyRequest<{ Params: Transmission }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )
}
