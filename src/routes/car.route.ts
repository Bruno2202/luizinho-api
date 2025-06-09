import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Car } from '@prisma/client';
import { CarRepository } from '../repositories/car.repository';
import { CarService } from '../services/car.service';
import { CarController } from '../controllers/car.controller';
import { service as modelService } from './model.route';
import { service as brandService } from './brand.route';
import { service as typeService } from './type.route';
import { service as categoryService } from './category.route';
import { service as transmissionService } from './transmission.route';
import { service as fuelService } from './fuel.route';
import { service as colorService } from './color.route';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const repository = new CarRepository();
export const service = new CarService(repository, modelService, brandService, typeService, categoryService, transmissionService, fuelService, colorService);
const controller = new CarController(service);

export default async function carRoute(fastify: FastifyInstance) {
    fastify.addHook('preHandler', AuthMiddleware);

    fastify.get(
        '/car',
        { preHandler: AuthMiddleware },
        async (request: FastifyRequest, reply: FastifyReply) => {
            return controller.getAllCars(request, reply)
        }
    )

    fastify.get(
        '/car/description/:description',
        async (request: FastifyRequest<{ Params: Car }>, reply: FastifyReply) => {
            return controller.getByDescription(request, reply)
        }
    )

    fastify.get(
        '/car/id/:id',
        async (request: FastifyRequest<{ Params: Car }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )

    fastify.post(
        '/car',
        async (request: FastifyRequest<{ Body: Car }>, reply: FastifyReply) => {
            return controller.registerCar(request, reply)
        }
    )

    fastify.put(
        '/car',
        async (request: FastifyRequest<{ Body: Car }>, reply: FastifyReply) => {
            return controller.updateCar(request, reply)
        }
    )

    fastify.delete(
        '/car/:id',
        async (request: FastifyRequest<{ Params: Car }>, reply: FastifyReply) => {
            return controller.deleteCar(request, reply)
        }
    )
}