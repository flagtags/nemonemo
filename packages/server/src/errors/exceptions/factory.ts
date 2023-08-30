import { EmptyRequestError } from '@errors/common';
import { LogicNotFoundError } from '@errors/logic';
import {
  DuplicatedUserError,
  NotAuthenticatedError,
  UserNotFoundError,
  NotAuthorizedError,
} from '@errors/user';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';

export default class ExceptionFactory {
  static createException(error: Error) {
    if (error instanceof HttpException) return error;

    switch (error.constructor) {
      case DuplicatedUserError:
      case EmptyRequestError:
        return new BadRequestException(error.message);
      case UserNotFoundError:
      case LogicNotFoundError:
        return new NotFoundException(error.message);
      case NotAuthenticatedError:
      case NotAuthorizedError:
        return new UnauthorizedException(error.message);

      default:
        return new InternalServerErrorException(error.message);
    }
  }
}
