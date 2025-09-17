import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';

import { ChangePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpsertAddressDto } from './dto/upsert-address.dto';

import { AddressType } from './entities/address.entity';
import { User } from './entities/user.entity';

import { CurrentUser } from './current-user.decorator';
import { FileSizeValidationPipe } from 'src/common/pipes/file-size.pipe';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return this.usersService.getUserProfile(user.id);
  }

  @Get('dashboard')
  async getDashboard(@CurrentUser() user: User) {
    const currUser = await this.usersService.getUserProfile(user.id);

    if (!currUser) return null;

    const billingAddress = currUser.addresses.find(
      (item) => item.type === AddressType.BILLING,
    )!;

    return {
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email,
      phone: currUser.phone,
      avatar: currUser.avatar,
      billingAddress: billingAddress ? billingAddress : null,
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      orders: [],
      browsingHistory: [],
    };
  }

  @Patch('profile')
  @UseInterceptors(FileInterceptor('avatar')) // "avatar" is the field name from the frontend form
  async updateProfile(
    @CurrentUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile(new FileSizeValidationPipe()) file?: Express.Multer.File,
  ) {
    await this.usersService.updateProfile(user.id, updateProfileDto, file);
    return { message: 'Update profile successful' };
  }

  @Post('change-password')
  async changePassword(
    @CurrentUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.usersService.changePassword(user.id, changePasswordDto);
    return { message: 'Update password successful' };
  }

  // Address management endpoints
  @Get('addresses')
  async getAddresses(@CurrentUser() user: User) {
    return this.usersService.getUserAddresses(user.id);
  }

  @Post('addresses/:type')
  async upsertAddress(
    @CurrentUser() user: User,
    @Param('type') type: AddressType,
    @Body() upsertAddressDto: UpsertAddressDto,
  ) {
    return this.usersService.upsertAddress(user.id, {
      ...upsertAddressDto,
      type,
    });
  }
}
