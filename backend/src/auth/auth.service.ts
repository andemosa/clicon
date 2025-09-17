import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDTO: CreateUserDto) {
    const userExists = await this.usersService.findUserByEmail(
      createUserDTO.email,
    );

    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    createUserDTO.password = hashedPassword;

    const user = await this.usersService.createUser(createUserDTO);
    return {
      message: `${user.email} signed up successfully`,
    };
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.usersService.findUserByEmail(loginDTO.email);

    if (!user || !(await bcrypt.compare(loginDTO.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { user, token };
  }
}
