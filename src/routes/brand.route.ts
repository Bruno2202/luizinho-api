import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { BrandController } from '../controllers/brand.controller';
import { BrandService } from '../services/brand.service';
import { Brand } from '@prisma/client';
import { BrandRepository } from '../repositories/brand.repository';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const repository = new BrandRepository;
export const service = new BrandService(repository);
const controller = new BrandController(service);

export default async function brandRoute(fastify: FastifyInstance) {
    fastify.addHook('preHandler', AuthMiddleware);

    fastify.get(
        '/brand',
        async (request: FastifyRequest, reply: FastifyReply) => {
            return controller.getAllBrands(request, reply)
        })

    fastify.get(
        '/brand/name/:name',
        async (request: FastifyRequest<{ Params: Brand }>, reply: FastifyReply) => {
            return controller.getByName(request, reply)
        }
    )

    fastify.get(
        '/brand/id/:id',
        async (request: FastifyRequest<{ Params: Brand }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )

    fastify.post(
        '/brand',
        async (request: FastifyRequest<{ Body: Brand }>, reply: FastifyReply) => {
            return controller.registerBrand(request, reply)
        }
    )

    fastify.put(
        '/brand',
        async (request: FastifyRequest<{ Body: Brand }>, reply: FastifyReply) => {
            return controller.updateBrand(request, reply)
        }
    )

    fastify.delete(
        '/brand/:id',
        async (request: FastifyRequest<{ Params: Brand }>, reply: FastifyReply) => {
            return controller.deleteBrand(request, reply)
        }
    )
}
