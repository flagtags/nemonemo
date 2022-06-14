import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User.EntityService } from './user.entity/user.entity.service';
import { UserEntityModule } from './entities/user-entity/user-entity.module';
import { UserEntityModule } from './entities/user-entity/user-entity/user-entity.module';
import { UserEntityModule } from './user-entity/user-entity.module';
import { UserEntityService } from 'src/user/user-entity.service';
import { User.EntityService } from './user.entity/user.entity.service';

@Module({
  imports: [UserModule, UserEntityModule],
  controllers: [AppController],
  providers: [AppService, User.EntityService, UserEntityService],
})
export class AppModule {}
