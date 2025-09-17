import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    const maxSize = 5 * 1024 * 1024; // 5MB (adjust as needed)

    if (!value?.size) {
      throw new BadRequestException('File not found or invalid.');
    }

    if (value.size > maxSize) {
      throw new BadRequestException(
        `File too large. Max allowed size is ${maxSize / 1024}KB`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
}
