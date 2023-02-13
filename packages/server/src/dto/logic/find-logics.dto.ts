import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindLogicsDto {
  @IsNumber({ allowNaN: false })
  readonly pageIndex: number;
  @IsNumber({ allowNaN: false })
  readonly pageSize: number;
}
