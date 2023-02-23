import { LogicNotFoundError } from '@errors/logic';
import {
  DuplicatedUserError,
  NotAuthenticatedError,
  UserNotFoundError,
} from '@errors/user';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export default class ExceptionFactory {
  static createException(error: Error) {
    switch (error.constructor) {
      case DuplicatedUserError:
        return new BadRequestException(error.message);
      case UserNotFoundError:
      case LogicNotFoundError:
        return new NotFoundException(error.message);
      case NotAuthenticatedError:
        return new UnauthorizedException(error.message);

      default:
        return new InternalServerErrorException(error.message);
    }
  }
}
