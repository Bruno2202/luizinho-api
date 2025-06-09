import { User } from "@prisma/client"
import { UserService } from "./user.service"

export default class AuthService {
    constructor(private readonly userService: UserService) { }

    async login(user: User) {
        try {
            if (!user || user.id <= 0) {
                throw new Error("ID do usuário inválido")
            }

            const isValidUser: User | null = await this.userService.getByEmail(user.email)
            if (!isValidUser) {
                throw new Error("Usuário não encontrado")
            }

            if (isValidUser.password !== user.password) {
                throw new Error("Senha inválida")
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}