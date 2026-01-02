import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [OperationsController],
  providers: [OperationsService],
  imports: [UsersModule],
})
export class OperationsModule {}
