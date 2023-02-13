import { IsNumber } from 'class-validator';

export class FindOneLogicDto {
  @IsNumber()
  readonly _id: number;
}
