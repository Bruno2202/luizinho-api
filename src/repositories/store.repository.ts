import { PrismaClient, Store } from "@prisma/client";

const prisma = new PrismaClient();

export class StoreRepository {
    async getStore() {
        try {
            const res = await prisma.store.findFirst({
                include: {
                    city: true
                }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateStore(store: Store) {
        try {
            const res = await prisma.store.update({
                where: {
                    id: store.id
                },
                data: store
            })

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
