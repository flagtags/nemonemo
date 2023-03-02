import { IsMongoId } from 'class-validator';

export class DeleteLogicDto {
  @IsMongoId()
  readonly _id: string;
}
