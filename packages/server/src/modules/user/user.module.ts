import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntityService } from '@entities/user-entity/user-entity.service';
import { UserController } from '@controllers/user/user.controller';
import { UserService } from '@use-cases/user/user.service';
import { User, UserSchema } from '@models/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserEntityService],
})
export class UserModule {}
