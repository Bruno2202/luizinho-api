import { FastifyReply, FastifyRequest } from "fastify";
import { Car } from "@prisma/client";
import { CarService } from "../services/car.service";

export class CarController {
    constructor(private readonly service: CarService) { }

    async getAllCars(req: FastifyRequest, reply: FastifyReply) {
        const cars = await this.service.getAllCars();

        return reply.send(cars);
    }

    async getByDescription(req: FastifyRequest<{ Params: Car }>, reply: FastifyReply) {
        try {
            const { description } = req.params

            const cars: Car[] = await this.service.getByDescription(description);

            if (cars.length === 0) {
                return reply.code(200).send({
                    cars,
                    message: "Nenhum carro encontrado"
                });
            }

            return reply.code(200).send(cars);
        } catch (error: any) {
            console.log(`Erro ao buscar carro: ${error.message}`);

            switch (error.message) {
                case "Descrição do carro é inválida":
                    reply.code(404).send({
                        cars: [],
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

    async getById(req: FastifyRequest<{ Params: Car }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const cars: Car = await this.service.getById(Number(id));

            if (!cars) {
                return reply.code(200).send({
                    cars,
                    message: "Nenhum carro encontrado"
                });
            }

            return reply.code(200).send(cars);
        } catch (error: any) {
            console.log(`Erro ao buscar carro: ${error.message}`);

            switch (error.message) {
                case "ID do carro é inválida":
                    reply.code(404).send({
                        cars: [],
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

    async registerCar(req: FastifyRequest<{ Body: Car }>, reply: FastifyReply) {
        try {
            const car: Car = req.body
            console.log(car)

            const registeredCar = await this.service.registerCar(car);

            return reply.send(registeredCar);
        } catch (error: any) {
            console.log(`Erro ao cadastrar carro: ${error.message}`);

            switch (error.message) {
                case "A descrição do carro é inválida":
                case "Placa do carro é inválida":
                case "A placa informada já está em uso":
                case "O status de venda não foi informado":
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

    async updateCar(req: FastifyRequest<{ Body: Car }>, reply: FastifyReply) {
        try {
            const car: Car = req.body

            const updatedCar = await this.service.updateCar(car);

            return reply.send(updatedCar);
        } catch (error: any) {
            console.log(`Erro ao atualizar carro: ${error.message}`);

            switch (error.message) {
                case "ID do carro é inválido":
                case "O carro com o ID informado não foi encontrado":
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

    async deleteCar(req: FastifyRequest<{ Params: Car }>, reply: FastifyReply) {
        try {
            const { id } = req.params

            const deletedCar = await this.service.deleteCar(Number(id));

            return reply.send(deletedCar);
        } catch (error: any) {
            console.log(`Erro ao excluir carro: ${error.message}`);

            switch (error.message) {
                case "ID do carro é inválido":
                case "O carro com o ID informado não foi encontrado":
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