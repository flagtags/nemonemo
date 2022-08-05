import { CreateUserDto } from '@dto/user/create-user.dto';
import { UserEntityService } from '@entities/user-entity/user-entity.service';
import { UserDocument } from '@models/user/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userEntityService: UserEntityService) {}

  register(createUserDto: CreateUserDto): UserDocument {
    return this.userEntityService.createUser(createUserDto);
  }
}
