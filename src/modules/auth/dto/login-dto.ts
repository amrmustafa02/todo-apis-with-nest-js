import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { RegexService } from '../../../core/services/regex.service';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    required: true,
    description: 'The email address of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  
  @ApiProperty({
    required: true,
    description: 'The password of the user',
    example: 'Password123@',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(RegexService.password, { message: 'Password is must be strong' })
  password: string;
}
