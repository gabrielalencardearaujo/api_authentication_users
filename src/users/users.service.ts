import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    { id: '1', username: 'Galencar', password: 'senha123' },
  ];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = hashSync(newUser.password, 13);

    this.users.push(newUser);
    console.log(this.users);
  }

  findByUsername(username: string): UserDto | null {
    return this.users.find((user) => user.username === username);
  }
}
