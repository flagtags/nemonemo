import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import Jwt from 'jsonwebtoken';
import config from '@config';
import { UserService } from '@use-cases/user/user.service';
import { NotAuthorizedError } from '@errors/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { token } = request.cookies;

    try {
      const res = Jwt.verify(token, config.jwtSecret);

      if (typeof res === 'string') throw new NotAuthorizedError();

      const userId = res._id;
      const hasUser = await this.userService.hasUser({ _id: userId });

      if (hasUser) {
        return true;
      }
    } catch (error) {
      console.log('error', error);
    }

    throw new NotAuthorizedError();
  }
}
