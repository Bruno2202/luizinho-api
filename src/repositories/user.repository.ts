import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async getByEmail(email: string): Promise<User | null> {
        try {
            const res = await prisma.user.findUnique({
                where: { email }
            });

            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}