import { Sale } from "@prisma/client";
import { ClientService } from "./client.service";
import { SaleRepository } from "../repositories/sale.repository";
import { MovementService } from "./movement.service";

export class SaleService {
    constructor(
        private readonly repository: SaleRepository,
        private readonly clienteService: ClientService,
        private readonly movementService: MovementService
    ) { }

    async getById(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID da saída é inválido");
            }

            const sale = await this.repository.getById(id);

            if (!sale) {
                throw new Error("A saída com o ID informado não foi encontrada");
            }

            return sale;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerSale(sale: Sale, movementId: number) {
        try {
            if (!sale.saleValue || sale.saleValue <= 0) {
                throw new Error("Saída com valor de venda inválido");
            }

            if (sale.costValue && sale.costValue <= 0) {
                throw new Error("Saída com valor de custo inválido");
            }

            await this.movementService.getById(movementId);
            await this.clienteService.getById(sale.buyerId);

            return await this.repository.registerSale(sale, movementId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateSale(sale: Sale) {
        try {
            await this.getById(sale.id);

            return await this.repository.updateSale(sale);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteSale(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deleteSale(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}