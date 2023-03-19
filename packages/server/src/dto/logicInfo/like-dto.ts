import { IsMongoId } from 'class-validator';

export class LikeDto {
  @IsMongoId()
  readonly logicId: string;
  @IsMongoId()
  readonly userId: string;
}
