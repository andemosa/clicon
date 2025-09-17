import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { User } from './entities/user.entity';
import { UserAddress, AddressType } from './entities/address.entity';

import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { ChangePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpsertAddressDto } from './dto/upsert-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserAddress)
    private readonly addressRepository: Repository<UserAddress>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    const user = await this.findById(userId);

    if (!user) throw new BadRequestException('User not found');

    let avatar = user.avatar;
    let avatarId = user.avatarId;

    if (file) {
      if (avatarId) {
        await this.cloudinaryService.deleteImage(avatarId);
      }

      const uploaded = await this.cloudinaryService.uploadImage(
        file,
        'avatars',
      );
      avatar = uploaded['secure_url'];
      avatarId = uploaded['public_id'];
    }

    Object.assign(user, {
      ...updateProfileDto,
      ...(avatar && { avatar: avatar }),
      ...(avatarId && { avatarId: avatarId }),
    });
    return this.userRepository.save(user);
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.findById(userId);

    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

    await this.userRepository.update(userId, { password: hashedPassword });
  }

  async upsertAddress(
    userId: string,
    upsertAddressDto: UpsertAddressDto,
  ): Promise<UserAddress> {
    const user = await this.findById(userId);

    // Check if address already exists for this type
    let address = await this.addressRepository.findOne({
      where: { user: { id: userId }, type: upsertAddressDto.type },
    });

    if (address) {
      // Update existing address
      Object.assign(address, upsertAddressDto, { user });
    } else {
      // Create new address
      address = this.addressRepository.create({
        ...upsertAddressDto,
        user,
      });
    }

    return this.addressRepository.save(address);
  }

  async getUserAddresses(
    userId: string,
  ): Promise<{ billing?: UserAddress; shipping?: UserAddress }> {
    const addresses = await this.addressRepository.find({
      where: { user: { id: userId } },
      order: { type: 'ASC' },
    });

    const result: { billing?: UserAddress; shipping?: UserAddress } = {};

    addresses.forEach((address) => {
      if (address.type === AddressType.BILLING) {
        result.billing = address;
      } else if (address.type === AddressType.SHIPPING) {
        result.shipping = address;
      }
    });

    return result;
  }

  async getUserProfile(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['addresses'],
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
