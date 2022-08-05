export class UpdateUserDto {
  readonly _id: string;
  readonly name?: string;
  readonly userName?: string;
  readonly password?: string;
  readonly isBanned: boolean;
}
