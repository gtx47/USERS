import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import {UserMongo, UserSchema} from './infrastructure/database/schemas/user.schema';
import {UserRepository} from './infrastructure/database/repositories/user.repository';
import { UserRepositoryPort } from './domain/ports/user.repository.port';
import { UserController } from './infrastructure/http/controllers/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/univalleshop-users'),
    MongooseModule.forFeature([{ name: UserMongo.name, schema: UserSchema}]),
  ],
  controllers: [UserController],
  providers: [UserRepository],
})
export class AppModule {}
