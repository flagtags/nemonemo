import {
  IsNumber,
  IsString,
  ValidateIf,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import Is2DCellStateArray from '@validator/Is2DCellStateArray';

export class UpdateLogicDto {
  @IsMongoId()
  readonly _id: string;
  @Is2DCellStateArray({ message: 'answer must be a 2D boolean array' })
  @IsOptional()
  readonly answer?: boolean[][];
  @IsNumber()
  @IsOptional()
  readonly timeLimit?: number;
  @IsString()
  @IsOptional()
  readonly title?: string;
  @IsString()
  @IsOptional()
  readonly authorId?: string;
}
