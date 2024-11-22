import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { RegexService } from '../../../core/services/regex.service';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(RegexService.password, { message: 'Password is must be strong' })
  password: string;
}
