import { IsMongoId } from 'class-validator';

export class DeleteLogicInfoDto {
  @IsMongoId()
  readonly logicId: string;
}
