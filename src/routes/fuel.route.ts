import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Fuel } from '@prisma/client';
import { FuelRepository } from '../repositories/fuel.repository';
import { FuelService } from '../services/fuel.service';
import { FuelController } from '../controllers/fuel.controller';

const repository = new FuelRepository;
const service = new FuelService(repository);
const controller = new FuelController(service);

export default async function fuelRoute(fastify: FastifyInstance) {
    fastify.get('/fuel', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllFuels(request, reply)
    })

    fastify.get(
        '/fuel/:description',
        async (request: FastifyRequest<{ Params: Fuel }>, reply: FastifyReply) => {
            return controller.getByDescritpion(request, reply)
        }
    )
}
