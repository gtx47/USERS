import {User} from '../entities/user.entity';
import { UserRepositoryPort } from '../ports/user.repository.port';

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryPort){}

    async execute(data: {
        name: string;
        email: string;
        password: string;
        role: 'estudiante' | 'docente' | 'administrativo';

    }): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('El usuario ya existe');

        }
        const user = new User(
            crypto.randomUUID(),
            data.name,
            data.email,
            data.password,
            data.role,

        );
        return this.userRepository.save(user);

    }
}