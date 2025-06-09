import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { validateEmail } from "../utils/validateEmail";

export class UserService {
    constructor(private readonly repository: UserRepository) { }

    async getByEmail(email: string): Promise<User | null> {
        try {
            if (!email || email.trim().length === 0) {
                throw new Error("Email do usuário é inválido");
            }

            const isValidEmail: boolean = validateEmail(email);
            if (!isValidEmail) {
                throw new Error("Email do usuário é inválido");
            }

            return await this.repository.getByEmail(email);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}