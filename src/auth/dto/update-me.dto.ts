import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateMeDto {
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
