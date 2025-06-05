import { City } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { CityService } from "../services/city.service";

export class CityController {
    constructor(private readonly service: CityService) { }

    async getAllCities(req: FastifyRequest, reply: FastifyReply) {
        const cities = await this.service.getAllCities();

        return reply.send(cities);
    }

    async getByName(req: FastifyRequest<{ Params: City }>, reply: FastifyReply) {
        try {
            const { name } = req.params

            const cities: City[] = await this.service.getByName(name);

            if (cities.length === 0) {
                return reply.code(200).send({
                    message: "Nenhuma cidade encontrada"
                });
            }

            return reply.code(200).send(cities);
        } catch (error: any) {
            console.log(`Erro ao buscar cidade: ${error.message}`);

            switch (error.message) {
                case "Nome da cidade é inválido":
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

    async getById(req: FastifyRequest<{ Params: City }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const city: City = await this.service.getById(Number(id));

            if (!city) {
                return reply.code(200).send({
                    message: "Nenhuma cidade encontrada"
                });
            }

            return reply.code(200).send(city);
        } catch (error: any) {
            console.log(`Erro ao buscar cidade: ${error.message}`);

            switch (error.message) {
                case "ID da cidade é inválido":
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

    async registerCity(req: FastifyRequest<{ Body: City }>, reply: FastifyReply) {
        try {
            const brand: City = req.body

            const registeredCity = await this.service.registerCity(brand);

            return reply.send(registeredCity);
        } catch (error: any) {
            console.log(`Erro ao cadastrar cidade: ${error.message}`);

            switch (error.message) {
                case "Nome da cidade é inválido":
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

    async updateCity(req: FastifyRequest<{ Body: City }>, reply: FastifyReply) {
        try {
            const city: City = req.body

            const updatedCity = await this.service.updateCity(city);

            return reply.send(updatedCity);
        } catch (error: any) {
            console.log(`Erro ao atualizar cidade: ${error.message}`);

            switch (error.message) {
                case "ID da cidade é inválido":
                case "A cidade com o ID informado não foi encontrada":
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

    async deleteCity(req: FastifyRequest<{ Params: City }>, reply: FastifyReply) {
        try {

            const { id } = req.params
            const numericId = Number(id);

            const deletedCity = await this.service.deleteCity(numericId);

            return reply.send(deletedCity);
        } catch (error: any) {
            console.log(`Erro ao excluir cidade: ${error.message}`);

            switch (error.message) {
                case "ID da cidade é inválido":
                case "A cidade com o ID informado não foi encontrada":
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
