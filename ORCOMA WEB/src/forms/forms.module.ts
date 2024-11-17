import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form, FormQuestion } from './entities';
import { AuthModule } from 'src/auth/auth.module';
import { FormVideo } from './entities/form-video.entity';

@Module({
  controllers: [FormsController],
  providers: [FormsService],
  imports: [
    TypeOrmModule.forFeature([Form, FormQuestion, FormVideo]),
    AuthModule,
  ],
  exports: [
    FormsService,
    TypeOrmModule,
  ]
})
export class FormsModule {}
