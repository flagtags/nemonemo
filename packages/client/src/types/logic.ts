export interface ILogic {
  _id: string;
  answer: boolean[][];
  hintRow: number[][];
  hintColumn: number[][];
  timeLimit: number;
  title: string;
  authorId: string;
  size: number;
}
