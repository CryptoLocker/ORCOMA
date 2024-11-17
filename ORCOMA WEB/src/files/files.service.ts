import {Injectable } from '@nestjs/common'
import { GoogleCloudStorageProvider } from './providers/google-cloud-storage.provider'
import { FormsService } from '../forms/forms.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly storageProvider: GoogleCloudStorageProvider,
    private readonly formsService: FormsService
  ) { }

  async uploadFormVideo(formId: string, video: Express.Multer.File): Promise<string> {
    const filePath = `forms/${formId}`

    //Save the video in the database
    await this.formsService.updateFormVideo(formId, filePath)
    
    await this.storageProvider.uploadFile(video, filePath)

    return this.storageProvider.generateSignedUrl(filePath)
  }

  async uploadGlobalMetrics(file: Express.Multer.File) {
    const filePath = `reports/globals/${this.getFormattedDate}`
    await this.storageProvider.uploadFile(file, filePath)
    return this.storageProvider.generateSignedUrl(filePath)
  }

  async uploadUserReport(userId: string, file: Express.Multer.File): Promise<string> {
    const filePath = `reports/users/${userId}/${this.getFormattedDate}`

    await this.storageProvider.uploadFile(file, filePath)
    
    return this.storageProvider.generateSignedUrl(filePath)
  }

  async deleteFormVideo(filePath: string): Promise<void> {
    const fullPath = `forms/${filePath}`
    await this.storageProvider.deleteFile(fullPath)
  }

  async deleteGlobalsFile(filePath: string): Promise<void> {
    const fullPath = `reports/globals/${filePath}`
    await this.storageProvider.deleteFile(fullPath)
  }

  async deleteUserFile(userId: string, filePath: string): Promise<void> {
    const fullPath = `reports/users/${userId}/${filePath}`
    await this.storageProvider.deleteFile(fullPath)
  }

  //Get current date in the format yyyy-MM-dd-hh:mm
  private getFormattedDate(): string {

    const pad = (num: number): string => String(num).padStart(2, '0')
    const now = new Date()
    const year = now.getFullYear()
    const month = pad(now.getMonth() + 1)
    const day = pad(now.getDate())
    const hours = pad(now.getHours())
    const minutes = pad(now.getMinutes())

    return `${year}-${month}-${day}_${hours}:${minutes}`
  }

}