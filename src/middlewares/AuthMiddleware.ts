import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET!;

export async function AuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authorization = request.headers.authorization;

        if (!authorization) {
            reply.status(401).send({
                success: false,
                code: 401,
                message: 'Token de autenticação não informado',
            });
            return;
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            reply.status(401).send({
                success: false,
                code: 401,
                message: 'Token inválido',
            });
            return;
        }

        jwt.verify(token, JWT_SECRET);

    } catch (error: any) {
        console.error(`Não foi possível autenticar sessão: ${error.message}`);

        reply.status(401).send({
            success: false,
            code: 401,
            message: 'Token inválido ou expirado',
        });
    }
}
