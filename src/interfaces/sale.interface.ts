import { Sale } from "@prisma/client";

export interface SaleBody {
    movementId: number;
    sale: Sale
}