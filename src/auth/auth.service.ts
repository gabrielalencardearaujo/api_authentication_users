import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDTO } from './AuthResponseDTO';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly usersServices: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  signIn(username: string, password: string): AuthResponseDTO {
    const foundUser = this.usersServices.findByUsername(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException(); //Classe nativa do NestJs que dispara um erro de nao autorizado.
    }

    const payload = { sub: foundUser.id, username: foundUser.username }; //recomenda-se que use o atributo sub para informar o id do usuario

    const token = this.jwtService.sign(payload);

    return { token, expireIn: this.jwtExpirationTimeInSeconds };
  }
}
