import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { PasswordHandler } from 'src/utils/password-handler';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (!PasswordHandler.verifyPassword(pass, user.password)) {
      throw new UnauthorizedException("Password doesn't match");
    }

    const { accessToken, refreshToken, tokenPayload } =
      await this.generateJwtAccessToken(user);

    return {
      user: tokenPayload,
      accessToken,
      refreshToken,
    };
  }

  async signInWithRefreshToken(userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const { accessToken, refreshToken, tokenPayload } =
      await this.generateJwtAccessToken(user);

    return {
      user: tokenPayload,
      accessToken,
      refreshToken,
    };
  }

  async verifyUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.usersService.getUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const refreshTokenMatches = user.refreshToken === refreshToken;

      if (!refreshTokenMatches) {
        throw new UnauthorizedException(' Refresh token is not valid');
      }

      return {
        userId: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }

  async getProfileById(userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
    };
  }

  // =============================================================================
  // Private methods
  // =============================================================================
  private async generateJwtAccessToken(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    tokenPayload: JwtPayload;
  }> {
    const expirationSeconds = parseInt(
      this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION'),
    );

    const refreshExpirationSeconds = parseInt(
      this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION'),
    );

    const tokenPayload: JwtPayload = {
      userId: user.id,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${expirationSeconds}s`,
    });

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${refreshExpirationSeconds}s`,
    });

    const userUpdate = await this.usersService.updateLastLogin(
      user.id,
      refreshToken,
    );

    if (!userUpdate) {
      throw new InternalServerErrorException('Error updating last login');
    }

    return {
      tokenPayload,
      accessToken,
      refreshToken,
    };
  }
}
