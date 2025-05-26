import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CredentialDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async registerUser(userData: CreateUserDto) {
    const user = await this.usersService.findByEmail(userData.email);
    if (user) throw new BadRequestException('User already exists');
    const hashedPass = await hash(userData.password, 8);
    userData.password = hashedPass;
    await this.usersService.createUser(userData);
  }
  async loginUser(credentials: CredentialDto) {
    const user = await this.usersService.findByEmail(credentials.email);
    if (!user) throw new UnauthorizedException('invalid credentials');
    const isPassValid = await compare(credentials.password, user.password);
    if (!isPassValid) throw new UnauthorizedException('invalid credentials');
    const token = await this.jwtService.signAsync({ userId: user.id, roles: [user.role] });
    const refreshToken = await this.jwtService.signAsync(
      { userId: user.id },
      {
        secret: this.configService.get('SECRET_REFRESH_TOKEN'),
        expiresIn: '7d',
      },
    );
    await this.usersService.saveRefreshToken(user.id, refreshToken);
    const { password, refreshTokens, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
      refreshToken,
    };
  }
  async logoutUser(refreshToken: string) {
    try {
      const { userId } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('SECRET_REFRESH_TOKEN'),
      });
      await this.usersService.removeRefreshToken(userId, refreshToken);
    } catch (error) {
      throw new BadRequestException(
        'something went wrong, user cannot be logout',
      );
    }
  }
  async refreshAccessToken(refreshToken: string) {
    try {
      const { userId } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('SECRET_REFRESH_TOKEN'),
      });
      const user = await this.usersService.findUser(userId);
      const tokenValid = user.refreshTokens.some(
        (token) => token === refreshToken,
      );
      if (!tokenValid) throw new Error();
      const token = await this.jwtService.signAsync({ userId: user.id, roles: [user.role] });
      return { token };
    } catch (error) {
        throw new ForbiddenException();
    }
  }
}
