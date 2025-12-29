import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  // ? Este metodo se invoca si el JWT no ha expirado y si la firma hace match con el payload.
  validate(payload: JwtPayload) {
    return {
      ...payload,
    }; // * Todo lo que retornemos se agregara a la Request
  }
}
