import { Purchase } from "@prisma/client";

export interface PurchaseBody {
    movementId: number;
    purchase: Purchase
}