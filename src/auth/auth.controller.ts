import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
  Patch,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { type JwtPayload } from './interfaces/jwt-payload.interface';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageMimeTypeValidator } from 'src/utils/image-file-validator.helper';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@CurrentUser() user: JwtPayload) {
    return await this.authService.signInWithRefreshToken(user.userId);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAuthProfile(@CurrentUser() user: JwtPayload) {
    return this.authService.getProfileById(user.userId);
  }

  @Patch('update-profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateProfile(
    @CurrentUser() { userId }: JwtPayload,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            errorMessage: 'Max file size is 5MB',
          }),
          new ImageMimeTypeValidator(),
        ],
      }),
    )
    image?: Express.Multer.File,
  ) {
    return this.authService.updateProfile(userId, updateProfileDto, image);
  }
}
