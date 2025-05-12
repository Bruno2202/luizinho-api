import { Purchase } from "@prisma/client";
import { PurchaseRepository } from "../repositories/purchase.repository";
import { ClientService } from "./client.service";
import { MovementService } from "./movement.service";

export class PurchaseService {
    constructor(
        private readonly repository: PurchaseRepository,
        private readonly clienteService: ClientService,
        private readonly movementService: MovementService
    ) { }

    async getById(id: number) {
        try {
            if (!id || id <= 0) {
                throw new Error("ID da entrada é inválido");
            }

            const purchase = await this.repository.getById(id);

            if (!purchase) {
                throw new Error("A entrada com o ID informado não foi encontrada");
            }

            return purchase;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerPurchase(purchase: Purchase, movementId: number) {
        try {
            if (!purchase.purchaseValue || purchase.purchaseValue <= 0) {
                throw new Error("Entrada com valor inválido");
            }

            if (!purchase.purchaseDate) {
                throw new Error("A data de entrada é inválida");
            }

            await this.movementService.getById(movementId);
            await this.clienteService.getById(purchase.sellerId);

            return await this.repository.registerPurchase(purchase, movementId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updatePurchase(purchase: Purchase) {
        try {
            await this.getById(purchase.id);

            return await this.repository.updatePurchase(purchase);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deletePurchase(id: number) {
        try {
            await this.getById(id);

            return await this.repository.deletePurchase(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}