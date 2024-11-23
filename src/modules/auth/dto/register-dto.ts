import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { RegexService } from '../../../core/services/regex.service';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(RegexService.password, { message: 'Password is must be strong' })
  password: string;
}
