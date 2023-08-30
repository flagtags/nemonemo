import { IsEmail, IsNotEmpty } from 'class-validator';

class UserNameHasUserDto implements UserNameDtoType {
  readonly userName: string;
  readonly password?: string;
}

class IdHasUserDto implements IdDtoType {
  readonly _id: string;
  readonly password?: string;
}

interface UserNameDtoType {
  readonly userName: string;
}

interface IdDtoType {
  readonly _id: string;
}

export type HasUserDto = UserNameHasUserDto | IdHasUserDto;
