import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Answer } from 'src/answers/entities/answer.entity';
import { User } from 'src/auth/entities/user.entity';
import { Form } from 'src/forms/entities/form.entity';
import { FormQuestion } from 'src/forms/entities/form-question.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Answer, User, Form, FormQuestion])
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
