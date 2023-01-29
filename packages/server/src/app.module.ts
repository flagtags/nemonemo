import { Logger, Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@controllers/user/user.controller';
import { UserModule } from '@modules/user/user.module';
import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'mongoose';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
