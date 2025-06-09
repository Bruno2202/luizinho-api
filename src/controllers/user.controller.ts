import { FastifyReply, FastifyRequest } from "fastify";
import { ClientService } from "../services/client.service";
import { User } from "@prisma/client";
import { UserService } from "../services/user.service";

export class UserController {
    constructor(private readonly service: UserService) { }

    async getByEmail(req: FastifyRequest<{ Params: User }>, reply: FastifyReply) {
        try {
            const { email } = req.params

            const user: User | null = await this.service.getByEmail(email);

            if (!user) {
                return reply.code(200).send({ message: "Usuário não encontrado" });
            }

            return reply.code(200).send(user);
        } catch (error: any) {
            console.log(`Erro ao buscar usuário: ${error.message}`);

            switch (error.message) {
                case "Email do usuário é inválido":
                    reply.code(404).send({
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