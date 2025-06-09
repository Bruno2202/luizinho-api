import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import { User } from '@prisma/client';
import { service as userService } from '../routes/user.route';

export const service = new AuthService(userService);
const controller = new AuthController(service);

export default async function authRoute(fastify: FastifyInstance) {
    fastify.post(
        '/auth/login',
        async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
            return controller.login(request, reply)
        }
    )
}