import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../../../domain/use-cases/create-user.use-case';
import { UserRepository } from '../../database/repositories/user.repository';

@Controller('users')
export class UserController {
  private readonly createUserUseCase: CreateUserUseCase;

  constructor(private readonly userRepository: UserRepository) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  @Post('register')
  async register(@Body() body: {
    name: string;
    email: string;
    password: string;
    role: 'estudiante' | 'docente' | 'administrativo';
  }) {
    return this.createUserUseCase.execute(body);
  }

  @Get()
  async findAll() {
    return this.userRepository.findAll();
  }
}
