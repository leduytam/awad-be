import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './guards/jwt-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { UpdateMeDto } from 'src/auth/dto/update-me.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: RegisterDto) {
    return this.authService.register(createUserDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtGuard)
  async refresh(@Req() req: Request) {
    return this.authService.refresh(req.user);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async me(@Req() req: Request) {
    return this.authService.getMe(req.user.userId);
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  async updateMe(@Req() req: Request, @Body() body: UpdateMeDto) {
    return this.authService.updateMe(req.user.userId, body);
  }

  @Post('me/change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async changePassword(@Req() req: Request, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(req.user.userId, body);
  }
}
