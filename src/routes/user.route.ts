import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

const repository = new UserRepository();
export const service = new UserService(repository);
const controller = new UserController(service);

export default async function userRoute(fastify: FastifyInstance) {
    fastify.get('/user/:email', async (request: FastifyRequest<{ Params: User }>, reply: FastifyReply) => {
        return controller.getByEmail(request, reply)
    })
}