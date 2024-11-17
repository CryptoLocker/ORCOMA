import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { GoogleCloudStorageProvider } from './providers/google-cloud-storage.provider';
import { FormsModule } from 'src/forms/forms.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FilesController],
  providers: [
    GoogleCloudStorageProvider,
    FilesService
  ],
  imports: [
    FormsModule,
    AuthModule
  ],
  exports: [
    FilesService
  ]
})
export class FilesModule {}
