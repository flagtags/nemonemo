import { EmptyRequestError } from '@errors/common';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AtLeastOnePropertyValidationPipe implements PipeTransform<any> {
  async transform(value: any) {
    if (Object.values(value).length === 0) throw new EmptyRequestError();

    return value;
  }
}
