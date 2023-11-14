import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IJwtPayload, IUserPayload } from './auth.interface';
import { ConfigService } from '@nestjs/config';
import { IAllConfig } from 'src/configs/config.interface';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateMeDto } from 'src/auth/dto/update-me.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<IAllConfig>,
  ) {}

  async login(userPayload: IUserPayload) {
    const payload: IJwtPayload = {
      email: userPayload.email,
      sub: userPayload.userId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.getOrThrow('auth.jwtRefreshSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.jwtRefreshExpires', {
          infer: true,
        }),
      }),
      user: await this.usersService.findOneById(userPayload.userId),
    };
  }

  async register(createUserDto: RegisterDto) {
    return await this.usersService.create(createUserDto);
  }

  async refresh(userPayload: IUserPayload): Promise<{ accessToken: string }> {
    const payload: IJwtPayload = {
      email: userPayload.email,
      sub: userPayload.userId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserPayload> | null {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        email: user.email,
        userId: user.id,
      };
    }

    return null;
  }

  async getMe(userId: string) {
    return this.usersService.findOneById(userId);
  }

  async updateMe(userId: string, body: UpdateMeDto) {
    return this.usersService.update(userId, body);
  }

  async changePassword(userId: string, body: ChangePasswordDto) {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(user.password, body.oldPassword))) {
      throw new BadRequestException('Old password is not match');
    }

    const newPassword = await bcrypt.hash(body.newPassword, 10);

    await this.usersService.update(userId, {
      password: newPassword,
    });
  }
}
