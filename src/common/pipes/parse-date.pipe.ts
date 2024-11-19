import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  
    transform(value: string) {
        const date = new Date(value);
    
        if (isNaN(date.getTime())) {
          throw new BadRequestException(`Invalid date format: ${value}`);
        }
    
        return date as Date;
    }

}