import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Param, ParseUUIDPipe, Delete, Body, Get } from '@nestjs/common'
import { FilesService } from './files.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { createFileFilter } from './helpers/fileFilter.helper'
import { ValidRoles } from 'src/auth/interfaces'
import { Auth } from 'src/auth/decorators'
import { CreateFormVideoDto } from 'src/forms/dto'
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('files')
@Auth(ValidRoles.admin)
export class FilesController {
  constructor(private readonly filesService: FilesService) { }




  @Get('signed-url/:filePath')
  @ApiOperation({
    summary: 'Generate signed URL',
    description:
      'Generates a signed URL from the storage service, for accessing a file located at the specified path.',
  })
  @ApiParam({
    name: 'filePath',
    type: String,
    description:
      'Path of the file in the storage service (e.g., `forms/{formId}/filename.mp4`).',
  })
  @ApiResponse({
    status: 200,
    description: 'Signed URL generated successfully.',
  })
  async getFileSignedUrl(@Param('filePath') filePath: string): Promise<string> {
    return this.filesService.getFileSignedUrl(filePath);
  }





  @Post('upload-form-video/:id')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: createFileFilter(['mp4', 'avi', 'mov']),
  }))

  @ApiOperation({
    summary: 'Upload video for a specific form',
    description:
      'Uploads a video to the folder `forms/{formId}` and stores it in the database.',
  })
  @ApiParam({
    name: 'formId',
    type: String,
    description: 'ID of the form. Determines the target folder: `forms/{formId}`.',
  })
  @ApiBody({
    description: 'Video file to upload along with its metadata.',
  })
  @ApiResponse({
    status: 200,
    description: 'Video uploaded successfully. Signed URL returned.',
  })

  uploadFormVideo(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createFormVideoDto: CreateFormVideoDto,
  ) {

    if (!file)
      throw new BadRequestException("Unvalid file type")

    return this.filesService.uploadFormVideo(id, file, createFormVideoDto)
  }





  @Post('reports')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: createFileFilter(['pdf']),
  }))

  @ApiOperation({
    summary: 'Upload global metrics file',
    description: 'Uploads a file to `reports/globals/{date}` in the storage service.',
  })
  @ApiBody({ description: 'Global metrics file to upload.' })
  @ApiResponse({
    status: 200,
    description: 'Global metrics file uploaded successfully.',
  })

  uploadGlobalMetrics(
    @UploadedFile() file: Express.Multer.File
  ) {

    if (!file)
      throw new BadRequestException("Unvalid file type")

    return this.filesService.uploadGlobalMetrics(file)
  }




  @Post('reports/users/:userId')
  @UseInterceptors(FileInterceptor('file'))

  @ApiOperation({
    summary: 'Upload user report',
    description: 'Uploads a report to `reports/users/{userId}/{date}` in the storage service.',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user for whom the report is being uploaded.',
  })
  @ApiBody({ description: 'User report file to upload.' })
  @ApiResponse({
    status: 200,
    description: 'User report uploaded successfully.',
  })

  async uploadUserReport(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File
  ) {

    if(!file) throw new BadRequestException("Unvalid file type")

    return this.filesService.uploadUserReport(userId, file)
  }





  @Delete('forms/:url')

  @ApiOperation({
    summary: 'Delete form video',
    description: 'Deletes a video from the folder `forms/{filePath}`.',
  })
  @ApiBody({
    description: 'Relative path of the file to delete inside `forms`.',
  })
  @ApiResponse({
    status: 200,
    description: 'Video deleted successfully.',
  })

  async deleteFormVideo(@Param('url') videoPath: string) {
    return this.filesService.deleteFormVideo(videoPath)
  }





  @Delete('globals/:url')

  @ApiOperation({
    summary: 'Delete global metrics file',
    description: 'Deletes a file from the folder `reports/globals/{filePath}`.',
  })
  @ApiBody({
    description: 'Relative path of the file to delete inside `reports/globals`.',
  })
  @ApiResponse({
    status: 200,
    description: 'Global metrics file deleted successfully.',
  })

  async deleteGlobalReport(@Param('url') reportPath: string) {
    return this.filesService.deleteGlobalsFile(reportPath)
  }





  @Delete('reports/users/:userId/:reportPath')

  @ApiOperation({
    summary: 'Delete user-specific file',
    description:
      'Deletes a file from the folder `reports/users/{userId}/{filePath}` in the storage service.',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user whose file is being deleted.',
  })
  @ApiBody({
    description: 'Relative path of the file to delete inside the user’s folder.',
  })
  @ApiResponse({
    status: 200,
    description: 'User-specific file deleted successfully.',
  })
  
  async deleteUserReport(
    @Param('userId') userId: string,
    @Param('reportPath') reportPath: string
  ) {
    return this.filesService.deleteUserFile(userId, reportPath)
  }
}
