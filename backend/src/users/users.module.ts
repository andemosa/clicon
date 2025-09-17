import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { User } from './entities/user.entity';
import { UserAddress } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress]), CloudinaryModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
