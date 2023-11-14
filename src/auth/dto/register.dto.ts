import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'email is already in use',
  })
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty()
  readonly password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly firstName: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly lastName: string | null;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  readonly dob: Date | null;
}
