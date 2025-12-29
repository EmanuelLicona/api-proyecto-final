import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordHandler } from 'src/utils/password-handler';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (!PasswordHandler.verifyPassword(pass, user.password)) {
      throw new UnauthorizedException("Password doesn't match");
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }
}
