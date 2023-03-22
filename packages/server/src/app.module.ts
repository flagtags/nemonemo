import { AllExceptionFilter } from '@errors/exceptions/filter';
import { LogicModule } from '@modules/logic/logic.module';
import { LogicInfoModule } from '@modules/logicInfo/logicInfo.module';
import { UserModule } from '@modules/user/user.module';
import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

const { protocol, url, name, password } = config.mongodb;
@Module({
  imports: [
    MongooseModule.forRoot(`${protocol}://${name}:${password}@${url}`, {
      connectionFactory: (connection: Connection) => {
        if (connection.readyState === 1) {
          Logger.log('MongoDB connected');
        }

        connection.on('disconnected', () => {
          Logger.log('DB disconnected');
        });

        return connection;
      },
    }),
    UserModule,
    LogicModule,
    LogicInfoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
