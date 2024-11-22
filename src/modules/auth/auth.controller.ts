import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';
import { AuthService } from './auth.service';

@ApiTags('Auth') // Group these endpoints under 'Auth'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in a user' }) // Description of the endpoint
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
  }) // Successful response
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid credentials',
  }) // Error response
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' }) // Description of the endpoint
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  }) // Successful response
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Validation failed or user already exists',
  }) // Error response
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
