import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Form } from 'src/forms/entities';
import { AuthModule } from 'src/auth/auth.module';
import { FormsModule } from 'src/forms/forms.module';
import { AnswersModule } from 'src/answers/answers.module';

@Module({
  controllers: [SeedController],
  providers: [
    SeedService,
  ],
  imports: [
    TypeOrmModule.forFeature([User, Form]),
    AuthModule,
    FormsModule,
    AnswersModule
  ]
})
export class SeedModule {}
