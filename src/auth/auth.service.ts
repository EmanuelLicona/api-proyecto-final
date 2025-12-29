import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { PasswordHandler } from 'src/utils/password-handler';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (!PasswordHandler.verifyPassword(pass, user.password)) {
      throw new UnauthorizedException("Password doesn't match");
    }

    const expirationMs = parseInt(
      this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS'),
    );

    const refreshExpirationMs = parseInt(
      this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS'),
    );

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${expirationMs}ms`,
    });

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${refreshExpirationMs}ms`,
    });

    return {
      user: tokenPayload,
      accessToken,
      refreshToken,
    };
  }
}
