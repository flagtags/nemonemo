import { IsString, IsNumber, IsMongoId, IsNotEmpty } from 'class-validator';

export class SolvedLogicDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  logicId: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  solvedTimeMs: number;
}
