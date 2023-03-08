import { IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class UpdateLogicInfoDto {
  @IsMongoId()
  readonly logicId: string;
  @IsNumber()
  @IsOptional()
  readonly views?: number;
  @IsNumber()
  @IsOptional()
  readonly solvedCount?: number;
  @IsNumber()
  @IsOptional()
  readonly likes?: number;
  @IsNumber()
  @IsOptional()
  readonly averageSolveTimeMs?: number;
  @IsNumber()
  @IsOptional()
  readonly bestSolveTimeMs?: number;
}
