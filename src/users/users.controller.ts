import { Controller, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update-profile')
  updateProfile(@CurrentUser() user: JwtPayload) {
    return {
      ...user,
    };
  }
}
