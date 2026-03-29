import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'First Name of the user', example: 'sajak' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Lase Name of the user', example: 'shrestha' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Email Name of the user',
    example: 'username@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password Name of the user',
    example: 'mypassword123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
