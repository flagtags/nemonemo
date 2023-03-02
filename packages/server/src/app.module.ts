import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@modules/user/user.module';
import { LogicModule } from '@modules/logic/logic.module';
import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'mongoose';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '@errors/exceptions/filter';

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
