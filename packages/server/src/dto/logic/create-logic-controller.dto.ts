import {
  IsArray,
  IsNumber,
  IsString,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import Is2DBooleanArray from '../../validator/Is2DBooleanArray';

export class CreateLogicControllerDto {
  @Is2DBooleanArray({ message: 'answer must be a 2D boolean array' })
  readonly answer: boolean[][];
  @IsNumber()
  readonly timeLimit: number;
  @IsString()
  readonly title: string;
}
