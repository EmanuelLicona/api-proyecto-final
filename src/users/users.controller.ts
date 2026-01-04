import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentJwtPayload } from 'src/auth/decorators/jwt-payload.decorator';
import { type JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getUser(@CurrentJwtPayload() { userId }: JwtPayload) {
    return this.usersService.getUserProfileCredit(userId);
  }
}
