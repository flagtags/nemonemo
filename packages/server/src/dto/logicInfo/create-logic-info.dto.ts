import { IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreateLogicInfoDto {
  @IsMongoId()
  readonly logicId: string;
  @IsNumber()
  readonly views: number;
  @IsNumber()
  readonly solvedCount: number;
  @IsNumber()
  readonly likes: number;
  @IsNumber()
  readonly averageSolvedTimeMs: number;
  @IsNumber()
  readonly bestSolvedTimeMs: number;
}
