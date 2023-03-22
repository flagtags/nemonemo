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
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { token } = request.cookies;

    try {
      const encoded = Jwt.sign({ userName: 'j03y14' }, config.jwtSecret);
      console.log(encoded);
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImowM3kxNCIsImlhdCI6MTY3OTQ5NDYxMn0.jolvdnxXys_g5fRa2b1-kX--JV38GQ91XZlhZYm60xg
      const res = Jwt.verify(token, config.jwtSecret);

      if (typeof res === 'string') throw new NotAuthorizedError();

      const userName = res.userName;
      const hasUser = this.userService.hasUser({ userName });
      if (hasUser) {
        return true;
      }
    } catch (error) {
      console.log('error', error);
    }

    throw new NotAuthorizedError();
  }
}
