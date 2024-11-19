import { Storage } from '@google-cloud/storage';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

export class GoogleCloudStorageProvider {
    private storage: Storage;
    private bucketName: string;
    private baseURL: string

    constructor() {
        this.storage = new Storage();

        this.bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

        this.validateStorageConfig()

        this.baseURL = `https://storage.cloud.google.com/${this.bucketName}/`
    }

    private async validateStorageConfig(): Promise<void> {
        try {
            const [buckets] = await this.storage.getBuckets();
            const bucketNames = buckets.map((bucket) => bucket.name)

            if (!bucketNames.includes(this.bucketName)) {
                throw new Error(`Bucket "${this.bucketName}" does not exist or is inaccessible.`)
            }

            console.log(`GCS initialized. Bucket "${this.bucketName}" is accessible.`);
        } catch (error) {
            console.error(`Error initializing Google Cloud Storage: ${error.message}`)
            throw new Error('Failed to initialize GCS. Check credentials and bucket configuration.')
        }
    }

    async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
        const bucket = this.storage.bucket(this.bucketName)
        const blob = bucket.file(path)
        await blob.save(file.buffer, {
            contentType: file.mimetype,
            resumable: false,
        });
        return `${this.baseURL}${path}`
    }

    async generateSignedUrl(filePath: string): Promise<string> {
        try {

            const file = this.storage.bucket(this.bucketName).file(filePath)

            const [exists] = await file.exists()
            if (!exists) {
              throw new NotFoundException(`File ${filePath} does not exist in the bucket`);
            }
      
            // Obtener el Signed URL
            const [url] = await file.getSignedUrl({
                version: 'v4',
                action: "read",
                expires: Date.now() + 15 * 60 * 1000, // 15 minutos
            });
      
            return url;

          } catch (error) {
            console.error('Error generating Signed URL:', error);
            throw new InternalServerErrorException('Failed to generate Signed URL. Check server logs');
          }
    }

    async deleteFile(path: string): Promise<void> {
        const bucket = this.storage.bucket(this.bucketName);
        await bucket.file(path).delete()
    }
}

