import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FormsModule } from 'src/forms/forms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    AuthModule,
    FormsModule
  ],
  exports: [
    TypeOrmModule,
    FeedbackService
  ]
})
export class FeedbackModule {}
