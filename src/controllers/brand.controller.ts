import { Brand } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { BrandService } from "../services/brand.service";

export class BrandController {
    constructor(private readonly service: BrandService) { }

    async getAllBrands(req: FastifyRequest, reply: FastifyReply) {
        const brands = await this.service.getAllBrands();

        return reply.send(brands);
    }

    async getByName(req: FastifyRequest<{ Params: Brand }>, reply: FastifyReply) {
        try {
            if (!req.params.name) {
                return reply.code(200).send({
                    message: "Nenhuma marca encontrada"
                });
            }

            const { name } = req.params

            const brands: Brand[] = await this.service.getByName(name);

            if (brands.length === 0) {
                return reply.code(200).send({
                    message: "Nenhuma marca encontrada"
                });
            }

            return reply.code(200).send(brands);
        } catch (error: any) {
            console.log(`Erro ao buscar marca: ${error.message}`);

            switch (error.message) {
                case "Nome da marca é inválido":
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

    async getById(req: FastifyRequest<{ Params: Brand }>, reply: FastifyReply) {
        try {
            if (!req.params.id) {
                return reply.code(200).send({
                    message: "Nenhuma marca encontrada com o id informado"
                });
            }

            const { id } = req.params

            const brand: Brand = await this.service.getById(id);

            if (!brand) {
                return reply.code(200).send({
                    message: "Nenhuma marca encontrada"
                });
            }

            return reply.code(200).send(brand);
        } catch (error: any) {
            console.log(`Erro ao buscar marca: ${error.message}`);

            switch (error.message) {
                case "ID da marca é inválido":
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

    async registerBrand(req: FastifyRequest<{ Body: Brand }>, reply: FastifyReply) {
        try {
            const brand: Brand = req.body

            const registeredBrand = await this.service.registerBrand(brand);

            return reply.send(registeredBrand);
        } catch (error: any) {
            console.log(`Erro ao cadastrar marca: ${error.message}`);

            switch (error.message) {
                case "Nome da marca é inválido":
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

    async updateBrand(req: FastifyRequest<{ Body: Brand }>, reply: FastifyReply) {
        try {
            const brand: Brand = req.body

            const updatedBrand = await this.service.updateBrand(brand);

            return reply.send(updatedBrand);
        } catch (error: any) {
            console.log(`Erro ao atualizar marca: ${error.message}`);

            switch (error.message) {
                case "ID da marca é inválido":
                case "A marca com o ID informado não foi encontrada":
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

    async deleteBrand(req: FastifyRequest<{ Params: Brand }>, reply: FastifyReply) {
        try {

            const { id } = req.params
            const numericId = Number(id);

            const deletedBrand = await this.service.deleteBrand(numericId);

            return reply.send(deletedBrand);
        } catch (error: any) {
            console.log(`Erro ao excluir marca: ${error.message}`);

            switch (error.message) {
                case "ID da marca é inválido":
                case "A marca com o ID informado não foi encontrada":
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