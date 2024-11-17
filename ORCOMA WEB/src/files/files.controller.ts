import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Param, ParseUUIDPipe, Delete } from '@nestjs/common'
import { FilesService } from './files.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { createFileFilter } from './helpers/fileFilter.helper'
import { ValidRoles } from 'src/auth/interfaces'
import { Auth } from 'src/auth/decorators'

@Controller('files')
@Auth(ValidRoles.admin, ValidRoles.superUser)
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('forms/:id')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: createFileFilter(['mp4', 'avi', 'mov']),
  }))
  uploadFormVideo(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File
  ) {

    if (!file)
      throw new BadRequestException("Unvalid file type")

    return this.filesService.uploadFormVideo(id, file)
  }

  @Post('reports')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: createFileFilter(['pdf']),
  }))
  uploadGlobalMetrics(
    @UploadedFile() file: Express.Multer.File
  ) {

    if (!file)
      throw new BadRequestException("Unvalid file type")

    return this.filesService.uploadGlobalMetrics(file)
  }

  @Post('reports/users/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserReport(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File
  ) {

    if(!file) throw new BadRequestException("Unvalid file type")

    return this.filesService.uploadUserReport(userId, file)
  }

  @Delete('forms/:url')
  async deleteFormVideo(@Param('url') videoPath: string) {
    return this.filesService.deleteFormVideo(videoPath)
  }

  @Delete('globals/:url')
  async deleteGlobalReport(@Param('url') reportPath: string) {
    return this.filesService.deleteGlobalsFile(reportPath)
  }

  @Delete('reports/users/:userId/:reportPath')
  async deleteUserReport(
    @Param('userId') userId: string,
    @Param('reportPath') reportPath: string
  ) {
    return this.filesService.deleteUserFile(userId, reportPath)
  }
}
