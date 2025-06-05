import { Store } from "@prisma/client";
import { StoreRepository } from "../repositories/store.repository";

export class StoreService {
    constructor(private readonly repository: StoreRepository) { }

    async getStore() {
        return await this.repository.getStore();
    }

    async updateStore(store: Store) {
        try {
            return await this.repository.updateStore(store);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
