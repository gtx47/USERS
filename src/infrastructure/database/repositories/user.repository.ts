import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryPort } from '../../../domain/ports/user.repository.port';
import { User } from '../../../domain/entities/user.entity';
import { UserMongo, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(UserMongo.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const doc = await this.userModel.findById(id).exec();
    if (!doc) return null;
    return new User(doc._id.toString(), doc.name, doc.email, doc.password, doc.role as any, doc.isActive);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    if (!doc) return null;
    return new User(doc._id.toString(), doc.name, doc.email, doc.password, doc.role as any, doc.isActive);
  }

  async save(user: User): Promise<User> {
    const created = new this.userModel({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
    });
    const saved = await created.save();
    return new User(saved._id.toString(), saved.name, saved.email, saved.password, saved.role as any, saved.isActive);
  }

  async findAll(): Promise<User[]> {
    const docs = await this.userModel.find().exec();
    return docs.map(doc => new User(doc._id.toString(), doc.name, doc.email, doc.password, doc.role as any, doc.isActive));
  }
}
