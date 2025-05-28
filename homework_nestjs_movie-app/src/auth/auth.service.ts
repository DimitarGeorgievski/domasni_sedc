import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CredentialDto } from './dto/credentials.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async registerUser(userData: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(userData.email);
    if (userExists) throw new BadRequestException('User already exists');
    const hashedPassword = await hash(userData.password, 8);
    userData.password = hashedPassword;
    await this.usersService.create(userData);
  }
  async loginUser(credentials: CredentialDto) {
    const foundUser = await this.usersService.findByEmail(credentials.email);
    if (!foundUser) throw new UnauthorizedException('invalid credentials');
    const isPasswordValid = await compare(
      credentials.password,
      foundUser.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('invalid credentials');
    const token = await this.jwtService.signAsync({ userId: foundUser.id, role: foundUser.role });
    const refreshToken = await this.jwtService.signAsync(
      { userId: foundUser.id },
      {
        secret: this.configService.get('SECRET_REFRESH_TOKEN'),
        expiresIn: '7d',
      },
    );
    await this.usersService.saveRefreshToken(foundUser.id, refreshToken);
    const { password, refreshTokens, ...userWithoutPass } = foundUser;
    return {
      user: userWithoutPass,
      token,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const { userId } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('SECRET_REFRESH_TOKEN'),
      });
      const foundUser = await this.usersService.findUser(userId);
      const tokenExists = foundUser.refreshTokens.some(
        (token) => token === refreshToken,
      );
      if (!tokenExists) throw new Error();
      const token = await this.jwtService.signAsync({ userId: foundUser.id, role: foundUser.role });
      return { token };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException();
    }
  }
  async logoutUser(refreshToken: string) {
    try {
      const { userId } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('SECRET_REFRESH_TOKEN'),
      });
      await this.usersService.RemoveRefreshToken(userId, refreshToken);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("couldn't logout user");
    }
  }
}