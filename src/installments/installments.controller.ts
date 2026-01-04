import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { DateUtils } from 'src/utils/date.utils';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MarkLateInstallmentsDto } from './dto/mark-late-installments.dto';

@Controller('installments')
@UseGuards(JwtAuthGuard)
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Post('mark-late')
  async markLateInstallments(
    @Body() markLateInstallmentsDto: MarkLateInstallmentsDto,
  ) {
    const endOfTodayHN = DateUtils.endOfDayLocal(markLateInstallmentsDto.date);
    await this.installmentsService.markLateInstallments(endOfTodayHN);
  }
}
