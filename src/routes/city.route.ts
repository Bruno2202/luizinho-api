import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { City } from '@prisma/client';
import { CityController } from '../controllers/city.controller';
import { CityService } from '../services/city.service';
import { CityRepository } from '../repositories/city.repository';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const repository = new CityRepository;
export const service = new CityService(repository);
const controller = new CityController(service);

export default async function cityRoute(fastify: FastifyInstance) {
    fastify.addHook('preHandler', AuthMiddleware);
    
    fastify.get('/city', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllCities(request, reply)
    })

    fastify.get(
        '/city/name/:name',
        async (request: FastifyRequest<{ Params: City }>, reply: FastifyReply) => {
            return controller.getByName(request, reply)
        }
    )

    fastify.get(
        '/city/id/:id',
        async (request: FastifyRequest<{ Params: City }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )

    fastify.post(
        '/city',
        async (request: FastifyRequest<{ Body: City }>, reply: FastifyReply) => {
            return controller.registerCity(request, reply)
        }
    )

    fastify.put(
        '/city',
        async (request: FastifyRequest<{ Body: City }>, reply: FastifyReply) => {
            return controller.updateCity(request, reply)
        }
    )

    fastify.delete(
        '/city/:id',
        async (request: FastifyRequest<{ Params: City }>, reply: FastifyReply) => {
            return controller.deleteCity(request, reply)
        }
    )
}
