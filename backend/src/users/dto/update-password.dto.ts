import {
  IsString,
  MinLength,
  IsNotEmpty,
  MaxLength,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordsMatch', async: false })
export class PasswordsMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const dto = args.object as ChangePasswordDto;
    return dto.newPassword === dto.confirmPassword;
  }

  defaultMessage() {
    return 'New Password and Confirm Password do not match';
  }
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must contain uppercase, lowercase, number, and special character',
  })
  newPassword: string;

  @IsString()
  confirmPassword: string;

  @Validate(PasswordsMatchConstraint)
  passwordsMatch: boolean;
}
