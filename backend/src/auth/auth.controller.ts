import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RequestUser } from './types/request-user';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('signin')
  async signin(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) res: any,
  ): Promise<{ message: string }> {
    const { token } = await this.authService.login(loginDTO);

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax', // Use 'lax' for CSRF protection
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: '/', // Cookie path
    });
    return { message: 'Login successful' };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Req() req: { user: RequestUser }): Promise<{ email: string }> {
    const user = await this.userService.findUserByEmail(req.user.email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: any): { message: string } {
    res.clearCookie('access_token');
    return { message: 'Signout successful' };
  }
}
