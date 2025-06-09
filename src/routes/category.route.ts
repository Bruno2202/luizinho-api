import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Category } from '@prisma/client';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { CategoryRepository } from '../repositories/category.repository';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const repository = new CategoryRepository;
export const service = new CategoryService(repository);
const controller = new CategoryController(service);

export default async function categoryRoute(fastify: FastifyInstance) {
    fastify.addHook('preHandler', AuthMiddleware);

    fastify.get('/category', async (request: FastifyRequest, reply: FastifyReply) => {
        return controller.getAllCategories(request, reply)
    })

    fastify.get(
        '/category/description/:description',
        async (request: FastifyRequest<{ Params: Category }>, reply: FastifyReply) => {
            return controller.getByDescription(request, reply)
        }
    )

    fastify.get(
        '/category/id/:id',
        async (request: FastifyRequest<{ Params: Category }>, reply: FastifyReply) => {
            return controller.getById(request, reply)
        }
    )

    fastify.post(
        '/category',
        async (request: FastifyRequest<{ Body: Category }>, reply: FastifyReply) => {
            return controller.registerCategory(request, reply)
        }
    )

    fastify.put(
        '/category',
        async (request: FastifyRequest<{ Body: Category }>, reply: FastifyReply) => {
            return controller.updateCategory(request, reply)
        }
    )

    fastify.delete(
        '/category/:id',
        async (request: FastifyRequest<{ Params: Category }>, reply: FastifyReply) => {
            return controller.deleteCategory(request, reply)
        }
    )
}
