import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Is2DCellStateArray } from '../../validator/Is2DCellStateArray';

export class CreateLogicServiceDto {
  @Is2DCellStateArray({ message: 'answer must be a 2D  array' })
  readonly answer: boolean[][];
  @IsNumber()
  readonly timeLimit: number;
  @IsString()
  readonly title: string;
  @IsString()
  readonly authorId: string;
}
