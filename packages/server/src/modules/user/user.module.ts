import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity } from '@entities/user-entity/user-entity.service';
import { UserController } from '@controllers/user/user.controller';
import { UserService } from '@use-cases/user/user.service';
import { User, UserSchema } from '@models/user/user.schema';
import { UserModel } from '@models/user/user.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserModel],
  exports: [UserService],
})
export class UserModule {}
