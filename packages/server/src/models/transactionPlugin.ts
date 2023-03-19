import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ClientSession } from 'mongoose';
import { IModelResponse } from './response';

@Injectable()
export class TransactionPlugin {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async execute<T>(
    callback: (session: ClientSession) => Promise<IModelResponse<T>>,
  ) {
    const session = await this.connection.startSession();

    const res = await session.withTransaction(() => callback(session), {
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' },
    });

    await session.endSession();

    return res;
  }
}
