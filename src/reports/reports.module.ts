import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthModule } from 'src/auth/auth.module';
import { FormsModule } from 'src/forms/forms.module';
import { AnswersModule } from 'src/answers/answers.module';
import { FeedbackModule } from 'src/feedback/feedback.module';

@Module({
    controllers: [],
    providers: [ReportsService],
    imports: [
      AuthModule,
      FormsModule,
      AnswersModule,
      FeedbackModule
    ],
    exports: [
      ReportsService,
    ]
  })
export class ReportsModule {}
