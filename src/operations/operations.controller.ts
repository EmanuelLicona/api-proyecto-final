import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentJwtPayload } from 'src/auth/decorators/jwt-payload.decorator';
import { type JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('operations')
@UseGuards(JwtAuthGuard)
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createOperation(@Body() createOperationDto: CreateOperationDto) {
    return await this.operationsService.createOperation(createOperationDto);
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getOperationListByUser(@CurrentJwtPayload() { userId }: JwtPayload) {
    return await this.operationsService.getOperatiosByUser(userId);
  }
}
