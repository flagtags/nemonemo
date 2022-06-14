import { Module } from '@nestjs/common';
import { UserController } from '@controllers/user/user.controller';
import { UserService } from '@use-cases/user/user.service';
import { UserEntityService } from '@entities/user-entity/user-entity.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, UserEntityService],
})
export class UserModule {}
