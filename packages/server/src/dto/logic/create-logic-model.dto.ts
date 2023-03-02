export class CreateLogicModelDto {
  readonly answer: boolean[][];
  readonly hintRow: number[][];
  readonly hintColumn: number[][];
  readonly timeLimit: number;
  readonly title: string;
  readonly authorId: string;
  readonly size: number;
}
