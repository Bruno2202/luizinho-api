import { Category } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryService } from "../services/category.service";

export class CategoryController {
    constructor(private readonly service: CategoryService) { }

    async getAllCategories(req: FastifyRequest, reply: FastifyReply) {
        const categories = await this.service.getAllCategories();

        return reply.send(categories);
    }

    async getByDescription(req: FastifyRequest<{ Params: Category }>, reply: FastifyReply) {
        try {
            const { description } = req.params

            const categories: Category[] = await this.service.getByDescription(description);

            if (categories.length === 0) {
                return reply.code(200).send({
                    message: "Nenhuma categoria encontrada"
                });
            }

            return reply.code(200).send(categories);
        } catch (error: any) {
            console.log(`Erro ao buscar categoria: ${error.message}`);

            switch (error.message) {
                case "Descrição da categoria é inválida":
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

    async getById(req: FastifyRequest<{ Params: Category }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const category: Category = await this.service.getById(id);

            if (!category) {
                return reply.code(200).send({
                    message: "Nenhuma categoria encontrada"
                });
            }

            return reply.code(200).send(category);
        } catch (error: any) {
            console.log(`Erro ao buscar categoria: ${error.message}`);

            switch (error.message) {
                case "ID da categoria é inválido":
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

    async registerCategory(req: FastifyRequest<{ Body: Category }>, reply: FastifyReply) {
        try {
            const category: Category = req.body

            const registeredCategory = await this.service.registerCategory(category);

            return reply.send(registeredCategory);
        } catch (error: any) {
            console.log(`Erro ao cadastrar categoria: ${error.message}`);

            switch (error.message) {
                case "Descrição da categoria é inválida":
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

    async updateCategory(req: FastifyRequest<{ Body: Category }>, reply: FastifyReply) {
        try {
            const category: Category = req.body

            const updatedCategory = await this.service.updateCategory(category);

            return reply.send(updatedCategory);
        } catch (error: any) {
            console.log(`Erro ao atualizar categoria: ${error.message}`);

            switch (error.message) {
                case "ID da categoria é inválido":
                case "A categoria com o ID informado não foi encontrada":
                    reply.code(500).send({
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

    async deleteCategory(req: FastifyRequest<{ Params: Category }>, reply: FastifyReply) {
        try {

            const { id } = req.params
            const numericId = Number(id);

            const deletedCategory = await this.service.deleteCategory(numericId);

            return reply.send(deletedCategory);
        } catch (error: any) {
            console.log(`Erro ao excluir categoria: ${error.message}`);

            switch (error.message) {
                case "ID da categoria é inválido":
                case "A categoria com o ID informado não foi encontrada":
                    reply.code(500).send({
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