import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.repo.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
    });

    return await this.repo.save(user);
  }

  async findOneById(id: string): Promise<User> {
    return await this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.repo.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    await this.repo.update(id, payload);

    return await this.findOneById(id);
  }
}
