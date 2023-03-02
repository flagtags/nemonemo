import { IsMongoId } from 'class-validator';

export class FindOneLogicDto {
  @IsMongoId()
  readonly _id: string;
}
