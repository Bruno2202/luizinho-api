import { Client } from "@prisma/client";
import { ClientRepository } from "../repositories/client.repository";
import { validate } from 'uuid';
import { validateCpf } from "../utils/validateCpf.utils";
import { CityService } from "./city.service";

export class ClientService {
    constructor(
        private readonly repository: ClientRepository,
        private readonly cityService: CityService,
    ) { }

    async getAllClients() {
        return await this.repository.getAllClients();
    }

    async getByName(name: string) {
        try {
            if (!name || name.trim().length === 0) {
                throw new Error("Nome do cliente é inválido");
            }

            return await this.repository.getByName(name);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: string) {
        try {
            if (!id || id.trim().length === 0 || !validate(id)) {
                throw new Error("ID do cliente é inválido");
            }

            const client = await this.repository.getById(id);

            if (!client) {
                throw new Error("O cliente com o ID informado não foi encontrado");
            }

            return client;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getByCpf(cpf: string) {
        try {
            if (!cpf || !validateCpf(cpf)) {
                throw new Error("O CPF do cliente é inválido");
            }

            const client = await this.repository.getByCpf(cpf);

            return client;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerClient(client: Client) {
        try {
            if (!client.name || client.name.trim().length === 0 || client.name.trim().length > 50) {
                throw new Error("O nome do cliente é inválido");
            }

            if (!client.cityId || !this.cityService.getById(client.cityId)) {
                throw new Error("O ID da cidade do cliente é inválido");
            }

            const existingClient = await this.getByCpf(client.cpf);
            if (existingClient) {
                throw new Error(`O CPF já está registrado`);
            }

            return await this.repository.registerClient(client);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateClient(client: Client) {
        try {
            await this.getById(client.id);

            return await this.repository.updateClient(client);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteClient(id: string) {
        try {
            await this.getById(id);

            return await this.repository.deleteClient(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}