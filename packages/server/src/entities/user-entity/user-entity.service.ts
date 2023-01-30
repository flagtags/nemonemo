import { UserEntityDto } from '@dto/user/user-entity.dto';
import { Injectable } from '@nestjs/common';

export class UserEntity {
  userName: string;

  name: string;

  password: string;

  isBanned: boolean;

  constructor(useEntityDto: UserEntityDto) {
    this.userName = useEntityDto.userName;
    this.name = useEntityDto.name;
    this.password = useEntityDto.password;
    this.isBanned = false;
  }
}
