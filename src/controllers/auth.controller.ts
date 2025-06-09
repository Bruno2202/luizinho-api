import jwt from 'jsonwebtoken';
import AuthService from '../services/auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '@prisma/client';

const JWT_SECRET: string = process.env.JWT_SECRET!;

export default class AuthController {
    constructor(private readonly service: AuthService) { }

    async login(req: FastifyRequest<{ Body: User }>, reply: FastifyReply) {
        try {
            const user: User = req.body

            await this.service.login(user);

            const payload = {
                id: user.id,
                user: user.name,
                email: user.email
            };

            const token = jwt.sign(
                payload,
                JWT_SECRET,
                // { expiresIn: "2h" }
            );

            return reply.code(200).send({ token });
        } catch (error: any) {
            console.log(`Não foi possível realizar login: ${error.message}`);
            switch (error.message) {
                case "ID do usuário inválido":
                case "Email já utilizado":
                case "Email do usuário é inválido":
                    reply.code(400).send({
                        message: error.message
                    });
                    break;

                default:
                    reply.code(500).send({
                        message: error.message
                    });
                    break;
            }
        }
    }
}