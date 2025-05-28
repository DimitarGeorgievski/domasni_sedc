import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Headers,
  Head,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CredentialDto } from './dto/credentials.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userData: CreateUserDto) {
    return this.authService.registerUser(userData);
  }

  @HttpCode(200)
  @Post('login')
  async loginUser(@Body() credentials: CredentialDto, @Res() res: Response) {
    const { user, token, refreshToken } =
      await this.authService.loginUser(credentials);
    res.set('access-token', token);
    res.set('refresh-token', refreshToken);
    res.json(user);
  }
  @HttpCode(204)
  @Post('refresh-token')
  async refreshAccessToken(
    @Res() res: Response,
    @Headers('refresh-token') refreshToken: string,
  ) {
    const { token } = await this.authService.refreshAccessToken(refreshToken);
    res.set('access-token', token);
    res.sendStatus(204);
  }
  @HttpCode(204)
  @Post('logout')
  logoutUser(@Headers('refresh-token') refreshToken: string) {
    return this.authService.logoutUser(refreshToken);
  }
}