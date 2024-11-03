import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Answer } from './entities/answer.entity';
import { FormsModule } from 'src/forms/forms.module';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
    TypeOrmModule.forFeature([Answer]),
    AuthModule,
    FormsModule,
  ],
  exports: [
    AnswersService,
    TypeOrmModule,
  ]
})
export class AnswersModule {}
